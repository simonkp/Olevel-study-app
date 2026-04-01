(function () {
  const SUBJECT_ID = window.SUBJECT_ID || "chemistry";
  const SUBJECT_TITLE = window.SUBJECT_TITLE || "O-Level Chemistry";
  const STORAGE_KEY = "levelup_" + SUBJECT_ID + "_v1";
  const APP_VERSION = window.APP_VERSION || "dev";
  const QUESTION_MS = 26000;
  const PASS_PCT = 70;
  const EARLY_WRONG_SEC = 3;
  const HEALTH_START = 3;
  const COMBO_AT = 3;
  const COMBO_MULT = 1.5;

  const manifest = window.TOPICS_MANIFEST;
  if (!manifest || !manifest.length) {
    document.getElementById("main").innerHTML =
      "<p class='empty-state'>Missing topics-manifest.js</p>";
    return;
  }

  const QUIZ_PER_ROUND = 20;
  const BOSS_QUESTION_MS_MULT = 0.8;
  const BOSS_XP = 800;
  const loadScriptPromises = {};

  // Boss themes are derived from each topic's `theme` field in the manifest.
  // This makes boss battles generic across subjects (Chemistry, Physics, etc.).
  const themeOrder = [];
  const themesByKey = {};
  (function buildThemes() {
    const seen = new Set();
    manifest.forEach((t) => {
      const key = t && t.theme ? String(t.theme) : "";
      if (!key) return;
      if (!seen.has(key)) {
        seen.add(key);
        themeOrder.push(key);
      }
      if (!themesByKey[key]) themesByKey[key] = [];
      themesByKey[key].push(t.id);
    });
  })();

  function loadTopicScript(id) {
    if (window.__topicRegistry[id]) {
      return Promise.resolve(window.__topicRegistry[id]);
    }
    const meta = manifest.find((m) => m.id === id);
    if (!meta) return Promise.reject(new Error("unknown topic"));
    const key = meta.file;
    if (loadScriptPromises[key]) {
      return loadScriptPromises[key];
    }
    loadScriptPromises[key] = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      const sep = meta.file.includes("?") ? "&" : "?";
      s.src = meta.file + sep + "v=" + encodeURIComponent(APP_VERSION);
      s.async = true;
      s.onload = () => {
        const t = window.__topicRegistry[id];
        if (t) resolve(t);
        else reject(new Error("register failed"));
      };
      s.onerror = () => reject(new Error("load " + key));
      document.head.appendChild(s);
    });
    return loadScriptPromises[key];
  }
  const main = document.getElementById("main");
  const dock = document.getElementById("dock");
  let state = loadState();
  let route = { view: "home", topicId: null, tab: "cheat" };
  let quizSession = null;
  let flashSession = null;
  let timeTracker = { topicId: null, tab: null, startedAt: 0 };

  // Small time-based XP to make Flashcards + Visuals contribute too.
  // Quiz + games keep their existing scoring (only correctness-based XP).
  const TIME_XP = {
    cheat: { msPerXp: 0, capXp: 0 },
    visual: { msPerXp: 60000, capXp: 10 }, // 1 XP per minute (capped per topic+tab)
    flash: { msPerXp: 45000, capXp: 15 }, // ~1 XP per 45s (capped per topic+tab)
    quiz: { msPerXp: 0, capXp: 0 },
    game: { msPerXp: 0, capXp: 0 },
  };
  const DAILY_CHALLENGE = {
    answered: 10,
    reviewRounds: 1,
    weakTopics: 1,
    bonusXp: 60,
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...defaultState(), ...JSON.parse(raw) };
    } catch (_) {}
    return defaultState();
  }

  function defaultState() {
    return {
      xp: 0,
      lastStudyDate: null,
      streak: 0,
      unlockAll: true,
      challengeMode: false,
      topicScores: {},
      topicBest: {},
      flashKnown: {},
      coupons: [],
      themeBossBeaten: {},
      studyTimeMsByTopicTab: {},
      timeXpEarnedByTopicTab: {},
      questionStats: {},
      dailyChallenge: {
        date: "",
        answered: 0,
        reviewRounds: 0,
        weakTopics: {},
        completed: false,
        bonusAwarded: false,
      },
    };
  }

  function portableState() {
    return {
      version: 1,
      xp: state.xp,
      lastStudyDate: state.lastStudyDate,
      streak: state.streak,
      unlockAll: state.unlockAll,
      challengeMode: state.challengeMode,
      topicScores: state.topicScores,
      topicBest: state.topicBest,
      flashKnown: state.flashKnown,
      coupons: state.coupons,
      themeBossBeaten: state.themeBossBeaten,
      studyTimeMsByTopicTab: state.studyTimeMsByTopicTab,
      timeXpEarnedByTopicTab: state.timeXpEarnedByTopicTab,
      questionStats: state.questionStats,
      dailyChallenge: state.dailyChallenge,
    };
  }

  function applyPortableState(payload) {
    if (!payload || typeof payload !== "object") return;
    state.xp = payload.xp ?? state.xp;
    state.lastStudyDate = payload.lastStudyDate ?? state.lastStudyDate;
    state.streak = payload.streak ?? state.streak;
    state.unlockAll = payload.unlockAll ?? state.unlockAll;
    state.challengeMode = payload.challengeMode ?? state.challengeMode;
    state.topicScores = payload.topicScores || state.topicScores;
    state.topicBest = payload.topicBest || state.topicBest;
    state.flashKnown = payload.flashKnown || state.flashKnown;
    state.coupons = payload.coupons || state.coupons;
    state.themeBossBeaten = payload.themeBossBeaten || state.themeBossBeaten;
    state.studyTimeMsByTopicTab =
      payload.studyTimeMsByTopicTab || state.studyTimeMsByTopicTab;
    state.timeXpEarnedByTopicTab =
      payload.timeXpEarnedByTopicTab || state.timeXpEarnedByTopicTab;
    state.questionStats = payload.questionStats || state.questionStats;
    state.dailyChallenge = payload.dailyChallenge || state.dailyChallenge;
    saveState();
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateTopbar();
  }

  function stopAndAwardTime() {
    if (!timeTracker.topicId || !timeTracker.tab || !timeTracker.startedAt) return;
    const topicId = timeTracker.topicId;
    const tab = timeTracker.tab;
    const elapsedMs = Date.now() - timeTracker.startedAt;
    timeTracker = { topicId: null, tab: null, startedAt: 0 };

    if (!elapsedMs || elapsedMs < 1000) return;

    state.studyTimeMsByTopicTab[topicId] =
      state.studyTimeMsByTopicTab[topicId] || {};
    state.studyTimeMsByTopicTab[topicId][tab] =
      (state.studyTimeMsByTopicTab[topicId][tab] || 0) + elapsedMs;

    const rule = TIME_XP[tab];
    if (!rule || rule.msPerXp <= 0 || rule.capXp <= 0) {
      saveState();
      return;
    }

    const rawXp = Math.floor(elapsedMs / rule.msPerXp);
    if (rawXp <= 0) return;

    state.timeXpEarnedByTopicTab[topicId] =
      state.timeXpEarnedByTopicTab[topicId] || {};
    const earned = state.timeXpEarnedByTopicTab[topicId][tab] || 0;
    const remaining = Math.max(0, rule.capXp - earned);
    const addXp = Math.min(rawXp, remaining);

    if (addXp > 0) {
      state.xp += addXp;
      state.timeXpEarnedByTopicTab[topicId][tab] = earned + addXp;
      saveState();
    }
  }

  function startTime(topicId, tab) {
    if (!topicId || !tab) return;
    timeTracker.topicId = topicId;
    timeTracker.tab = tab;
    timeTracker.startedAt = Date.now();
  }

  function todayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function ensureDailyChallenge() {
    const today = todayKey();
    if (!state.dailyChallenge || state.dailyChallenge.date !== today) {
      state.dailyChallenge = {
        date: today,
        answered: 0,
        reviewRounds: 0,
        weakTopics: {},
        completed: false,
        bonusAwarded: false,
      };
    }
    return state.dailyChallenge;
  }

  function maybeCompleteDailyChallenge() {
    const daily = ensureDailyChallenge();
    const weakTopicCount = Object.keys(daily.weakTopics || {}).length;
    const ready =
      daily.answered >= DAILY_CHALLENGE.answered &&
      daily.reviewRounds >= DAILY_CHALLENGE.reviewRounds &&
      weakTopicCount >= DAILY_CHALLENGE.weakTopics;
    if (!ready) return false;
    daily.completed = true;
    if (!daily.bonusAwarded) {
      daily.bonusAwarded = true;
      state.xp += DAILY_CHALLENGE.bonusXp;
      saveState();
      return true;
    }
    return false;
  }

  function markDailyAnswered(count) {
    const daily = ensureDailyChallenge();
    daily.answered += count || 1;
    if (!maybeCompleteDailyChallenge()) saveState();
  }

  function markDailyReviewRound() {
    const daily = ensureDailyChallenge();
    daily.reviewRounds += 1;
    if (!maybeCompleteDailyChallenge()) saveState();
  }

  function markDailyWeakTopic(topicId) {
    if (!topicId) return;
    const daily = ensureDailyChallenge();
    daily.weakTopics[String(topicId)] = true;
    if (!maybeCompleteDailyChallenge()) saveState();
  }

  function getDailyChallengeSummary() {
    const daily = ensureDailyChallenge();
    return {
      answered: daily.answered || 0,
      reviewRounds: daily.reviewRounds || 0,
      weakTopics: Object.keys(daily.weakTopics || {}).length,
      completed: !!daily.completed,
      bonusAwarded: !!daily.bonusAwarded,
    };
  }

  function normalizeQuestionText(s) {
    return String(s || "")
      .trim()
      .replace(/\s+/g, " ")
      .slice(0, 180);
  }

  function getQuestionTopicId(q, fallbackTopicId) {
    return String((q && (q.__topicId || q.topicId)) || fallbackTopicId || "unknown");
  }

  function getQuestionKey(q, fallbackTopicId) {
    if (q && q.id != null) return String(q.id);
    return `${getQuestionTopicId(q, fallbackTopicId)}::${normalizeQuestionText(
      q && q.question
    )}`;
  }

  function touchQuestionStats(topicId, questionKey) {
    state.questionStats = state.questionStats || {};
    state.questionStats[topicId] = state.questionStats[topicId] || {};
    if (!state.questionStats[topicId][questionKey]) {
      state.questionStats[topicId][questionKey] = {
        seen: 0,
        correct: 0,
        wrongs: 0,
        streak: 0,
        mastery: 0,
        lastSeenAt: 0,
        lastCorrectAt: 0,
        lastWrongAt: 0,
        lastResult: null,
      };
    }
    return state.questionStats[topicId][questionKey];
  }

  function readQuestionStats(q, fallbackTopicId) {
    const topicId = getQuestionTopicId(q, fallbackTopicId);
    const questionKey = getQuestionKey(q, fallbackTopicId);
    const stats =
      (state.questionStats &&
        state.questionStats[topicId] &&
        state.questionStats[topicId][questionKey]) || {
        seen: 0,
        correct: 0,
        wrongs: 0,
        streak: 0,
        mastery: 0,
        lastSeenAt: 0,
        lastCorrectAt: 0,
        lastWrongAt: 0,
        lastResult: null,
      };
    return { topicId, questionKey, stats };
  }

  function getQuestionBucket(stats) {
    if (!stats || stats.seen === 0) return "new";
    if (
      stats.lastResult === "wrong" ||
      stats.lastResult === "timeout" ||
      stats.mastery < 40
    ) {
      return "weak";
    }
    if (stats.mastery >= 85 && stats.streak >= 3) return "mastered";
    if (stats.mastery >= 60) return "strong";
    return "improving";
  }

  function getQuestionPriority(stats) {
    let score = 50;
    if (!stats || stats.seen === 0) score += 60;
    score += Math.max(0, 60 - (stats ? stats.mastery : 0));
    if (stats && stats.lastResult === "wrong") score += 30;
    if (stats && stats.lastResult === "timeout") score += 35;
    if (stats && stats.lastSeenAt) {
      const staleMs = Date.now() - stats.lastSeenAt;
      if (staleMs > 1000 * 60 * 60 * 24 * 3) score += 10;
    }
    if (stats && stats.mastery >= 85 && stats.streak >= 3) score -= 35;
    return score;
  }

  function annotateQuizBank(bank, fallbackTopicId) {
    return bank.map((q, i) => {
      const enriched = { ...q, __topicId: q.__topicId || fallbackTopicId, _i: i };
      const info = readQuestionStats(enriched, fallbackTopicId);
      return {
        q: enriched,
        topicId: info.topicId,
        questionKey: info.questionKey,
        stats: info.stats,
        bucket: getQuestionBucket(info.stats),
        priority: getQuestionPriority(info.stats),
      };
    });
  }

  function getStoredTopicMastery(topicId) {
    const items = Object.values(
      (state.questionStats && state.questionStats[String(topicId)]) || {}
    );
    if (!items.length) return { label: "New", weakCount: 0, avgMastery: 0 };
    const avgMastery =
      items.reduce((sum, item) => sum + (item.mastery || 0), 0) / items.length;
    const weakCount = items.filter(
      (item) =>
        item.lastResult === "wrong" ||
        item.lastResult === "timeout" ||
        (item.mastery || 0) < 40
    ).length;
    let label = "Improving";
    if (avgMastery >= 85) label = "Mastered";
    else if (avgMastery >= 60) label = "Strong";
    return { label, weakCount, avgMastery };
  }

  function bumpStreak() {
    const today = new Date().toDateString();
    if (state.lastStudyDate === today) return;
    const y = new Date();
    y.setDate(y.getDate() - 1);
    if (state.lastStudyDate === y.toDateString()) state.streak += 1;
    else state.streak = 1;
    state.lastStudyDate = today;
    saveState();
  }

  function updateTopbar() {
    document.getElementById("stat-xp").textContent = `${state.xp} XP`;
    const s = state.streak || 0;
    document.getElementById("stat-streak").textContent =
      `🔥 ${s} day${s === 1 ? "" : "s"}`;
    const bossEl = document.getElementById("stat-boss");
    const bossCount = Object.keys(state.themeBossBeaten || {}).filter(Boolean).length;
    if (bossEl) {
      bossEl.hidden = bossCount === 0;
      bossEl.textContent = bossCount ? `🏆 ${bossCount}` : "";
      bossEl.title = bossCount ? "Theme boss" + (bossCount > 1 ? "es" : "") + " beaten" : "";
    }
  }

  function topicIndex(id) {
    return manifest.findIndex((t) => t.id === id);
  }

  function isUnlocked(topicId) {
    const i = topicIndex(topicId);
    if (i < 0) return false;
    if (state.unlockAll) return true;
    if (i === 0) return true;
    const need = state.challengeMode ? 80 : PASS_PCT;
    const prev = manifest[i - 1].id;
    return (state.topicBest[prev] || 0) >= need;
  }

  function isBossUnlocked(themeKey) {
    const ids = themesByKey[themeKey];
    if (!ids || !ids.length) return false;
    return ids.every((id) => isUnlocked(id));
  }

  function renderHome() {
    bumpStreak();
    stopAndAwardTime();
    dock.hidden = true;
    const parts = [];
    let currentTheme = "";
    const daily = getDailyChallengeSummary();
    const dailyBanner = `
      <div class="daily-card">
        <div class="daily-title">Daily challenge${daily.bonusAwarded ? ` · +${DAILY_CHALLENGE.bonusXp} XP claimed` : ""}</div>
        <div class="daily-progress">
          <span class="quiz-chip">Quiz ${Math.min(daily.answered, DAILY_CHALLENGE.answered)}/${DAILY_CHALLENGE.answered}</span>
          <span class="quiz-chip">Review ${Math.min(daily.reviewRounds, DAILY_CHALLENGE.reviewRounds)}/${DAILY_CHALLENGE.reviewRounds}</span>
          <span class="quiz-chip">Weak topic ${Math.min(daily.weakTopics, DAILY_CHALLENGE.weakTopics)}/${DAILY_CHALLENGE.weakTopics}</span>
          <span class="quiz-chip ${daily.completed ? "mastered" : ""}">${daily.completed ? "Completed" : "In progress"}</span>
        </div>
      </div>`;
    manifest.forEach((t) => {
      if (t.theme !== currentTheme) {
        currentTheme = t.theme;
        parts.push(
          `<div class="theme-block"><div class="theme-label">${escapeHtml(
            currentTheme
          )}</div><div class="topic-grid">`
        );
      }
      const unlocked = isUnlocked(t.id);
      const best = state.topicBest[t.id];
      const badge =
        best != null
          ? `<span class="badge done">${best}% best</span>`
          : `<span class="badge">Study</span>`;
      const mastery = getStoredTopicMastery(t.id);
      const masteryBadge = `<span class="badge mastery">${escapeHtml(
        mastery.label
      )}</span>`;
      const reviewBadge = mastery.weakCount
        ? `<span class="badge review">${mastery.weakCount} weak</span>`
        : "";
      parts.push(
        `<button type="button" class="topic-card ${
          unlocked ? "unlocked" : ""
        }" data-topic="${escapeHtml(t.id)}" ${
          unlocked ? "" : "disabled"
        } title="${unlocked ? "" : "Locked — raise previous topic to 70% or enable Unlock all in settings"}">
          <span class="num">T${t.id}</span>
          <span class="title">${escapeHtml(t.title)}</span>
          <span class="badge-row">${badge}${masteryBadge}${reviewBadge}</span>
        </button>`
      );
      const next = manifest[topicIndex(t.id) + 1];
      if (!next || next.theme !== currentTheme) parts.push("</div></div>");
    });
    const bossParts = [];
    themeOrder.forEach((themeKey) => {
      const beaten = state.themeBossBeaten && state.themeBossBeaten[themeKey];
      const unlocked = isBossUnlocked(themeKey);
      if (!unlocked && !beaten) return;
      const name = themeKey;
      bossParts.push(
        `<button type="button" class="topic-card boss-card ${
          beaten ? "boss-beaten" : ""
        }" data-boss="${escapeHtml(themeKey)}" ${
          beaten ? "disabled" : ""
        }>
          <span class="num">BOSS</span>
          <span class="title">${escapeHtml(name)}</span>
          <span class="badge">${
            beaten ? "🏆 Beaten" : "1 HP · fast timer · big XP"
          }</span>
        </button>`
      );
    });
    if (bossParts.length) {
      parts.push(
        '<div class="theme-block"><div class="theme-label">Boss battles</div><div class="topic-grid">' +
        bossParts.join("") +
        "</div></div>"
      );
    }
    main.innerHTML = `
      <h1 class="dash-title">${escapeHtml(SUBJECT_TITLE)}</h1>
      <p class="dash-sub">Topics · Shop (spend XP on rewards) · Boss battles when a full theme is unlocked.</p>
      ${dailyBanner}
      ${parts.join("")}
    `;
    main.querySelectorAll(".topic-card[data-topic]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.disabled) return;
        goTopic(btn.dataset.topic, "cheat");
      });
    });
    main.querySelectorAll(".topic-card[data-boss]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.disabled) return;
        startBossBattle(btn.dataset.boss);
      });
    });
  }

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function renderMiniMarkdown(md) {
    if (md == null) return "";
    const raw = String(md);
    const safe = escapeHtml(raw);

    const inline = (s) =>
      s
        // Avoid breaking math like `$v=gt` by our `*italic*` / `**bold**` transforms.
        // We only apply inline markdown to non-math segments.
        .split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g)
        .map((seg) => {
          if (!seg) return seg;
          if (seg[0] === "$") return seg; // preserve math delimiters for KaTeX
          return seg
            // inline code
            .replace(/`([^`]+)`/g, "<code>$1</code>")
            // bold
            .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
            // italic (best-effort; avoids affecting strong because ** already handled)
            .replace(/\*([^*]+)\*/g, "<em>$1</em>");
        })
        .join("");

    const lines = safe.split(/\r?\n/);
    const parts = [];
    let inUl = false;

    for (const ln of lines) {
      const t = ln.trim();
      if (!t) {
        if (inUl) {
          parts.push("</ul>");
          inUl = false;
        }
        parts.push("<br/>");
        continue;
      }

      if (t === "***") {
        if (inUl) {
          parts.push("</ul>");
          inUl = false;
        }
        parts.push(`<hr class="mini-divider" />`);
        continue;
      }

      const m = ln.match(/^\s*[-*]\s+(.*)$/);
      if (m) {
        if (!inUl) {
          parts.push("<ul class='mini-md'>");
          inUl = true;
        }
        parts.push(`<li>${inline(m[1])}</li>`);
      } else {
        if (inUl) {
          parts.push("</ul>");
          inUl = false;
        }
        parts.push(`<div>${inline(ln)}</div>`);
      }
    }

    if (inUl) parts.push("</ul>");
    return parts.join("");
  }

  function goTopic(id, tab) {
    stopAndAwardTime();
    route = { view: "topic", topicId: id, tab: tab || "cheat" };
    main.innerHTML =
      '<p class="empty-state">Loading topic…</p>';
    dock.hidden = true;
    loadTopicScript(id)
      .then((t) => {
        route.topicData = t;
        dock.hidden = false;
        renderTopic();
      })
      .catch(() => {
        main.innerHTML =
          '<p class="empty-state">Failed to load topic script. Use a local server (e.g. <code>npx serve .</code>) if the browser blocks <code>file://</code> scripts.</p><button type="button" class="btn primary" id="reload-home">Home</button>';
        document.getElementById("reload-home").onclick = () => {
          route = { view: "home" };
          renderHome();
        };
      });
  }

  function renderTopic() {
    const t =
      route.topicData || window.__topicRegistry[route.topicId];
    if (!t || t.id !== route.topicId) {
      if (route.view === "topic" && route.topicId) {
        loadTopicScript(route.topicId).then((loaded) => {
          route.topicData = loaded;
          renderTopic();
        });
        main.innerHTML = '<p class="empty-state">Loading…</p>';
      } else renderHome();
      return;
    }
    // Topic is ready; finalize previous timing segment (if any).
    stopAndAwardTime();
    dock.hidden = false;
    dock.querySelectorAll("button").forEach((b) => {
      b.classList.toggle("active", b.dataset.tab === route.tab);
    });

    let body = "";
    if (route.tab === "cheat") body = renderCheat(t);
    else if (route.tab === "visual") body = renderVisuals(t);
    else if (route.tab === "flash") body = renderFlashPanel(t);
    else if (route.tab === "quiz") body = renderQuizPanel(t);
    else if (route.tab === "game") body = renderGamePanel(t);

    const idx = topicIndex(t.id);
    const prev = idx > 0 ? manifest[idx - 1] : null;
    const next = idx >= 0 && idx < manifest.length - 1 ? manifest[idx + 1] : null;
    const prevDisabled = !prev;
    const nextDisabled = !next || !isUnlocked(next.id);

    main.innerHTML = `
      <div class="topic-header">
        <button type="button" class="back" id="topic-back">← All topics</button>
        <div class="topic-title-row">
          <h1>Topic ${t.id}: ${escapeHtml(t.title)}</h1>
          <div class="topic-nav">
            <button type="button" class="btn btn-small" id="topic-prev" ${prevDisabled ? "disabled" : ""}>← Prev</button>
            <span class="btn-small">Topics</span>
            <button type="button" class="btn btn-small primary" id="topic-next" ${nextDisabled ? "disabled" : ""}>Next →</button>
          </div>
        </div>
      </div>
      <div id="topic-panels">${body}</div>
    `;
    document.getElementById("topic-back").onclick = () => {
      route = { view: "home" };
      renderHome();
    };
    const prevBtn = document.getElementById("topic-prev");
    const nextBtn = document.getElementById("topic-next");
    if (prevBtn) {
      prevBtn.onclick = () => {
        if (!prev) return;
        goTopic(prev.id, route.tab);
      };
    }
    if (nextBtn) {
      nextBtn.onclick = () => {
        if (!next || !isUnlocked(next.id)) return;
        goTopic(next.id, route.tab);
      };
    }
    bindPanelHandlers(t);

    startTime(t.id, route.tab);

    // Typeset `$...$` / `$$...$$` using KaTeX (loaded by `subject.html`).
    // Retry briefly in case KaTeX auto-render hasn't finished loading yet.
    (function tryRenderMath(el, attempt) {
      if (
        typeof window.renderMathInElement === "function" &&
        el &&
        el.querySelector
      ) {
        window.renderMathInElement(el, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
          ],
          throwOnError: false,
        });
        return;
      }
      if (attempt >= 20) return;
      setTimeout(() => tryRenderMath(el, attempt + 1), 50);
    })(document.getElementById("topic-panels") || main, 0);
  }

  function formatCheatPoint(p) {
    const esc = escapeHtml(p);
    return esc.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  function renderCheat(t) {
    return t.cheatBlocks
      .map(
        (b) => `
      <div class="cheat-slide">
        <h3>${escapeHtml(b.title)}</h3>
        <ul>${b.points.map((p) => `<li>${formatCheatPoint(p)}</li>`).join("")}</ul>
      </div>`
      )
      .join("");
  }

  function renderVisuals(t) {
    let infs = t.infographics;
    if ((!infs || !infs.length) && window.SUBJECT_INFOS_BY_TOPIC) {
      infs = window.SUBJECT_INFOS_BY_TOPIC[String(t.id)];
    }

    if (!infs || !infs.length) {
      return `<p class="empty-state">No extra diagram for this topic — check Notes for embedded ideas.</p>`;
    }

    const infoByTopicAll = window.INFO_MD_BY_TOPIC_AND_FILE || {};
    const infoByFile = infoByTopicAll[String(t.id)] || {};

    return infs
      .map((inf) => {
        const infoKey =
          inf.infoKey ||
          (inf.image
            ? inf.image.split("/").pop().split("?")[0]
            : null);
        const infoMd =
          inf.infoMarkdown ||
          (infoKey ? infoByFile[String(infoKey)] : "") ||
          "";
        const media = inf.image
          ? `<img src="${escapeHtml(inf.image)}" alt="" class="infographic-img" loading="lazy"/>`
          : (inf.svg || "");
        return `
      <div class="infographic-wrap">
        ${media}
        <div class="infographic-caption">${escapeHtml(inf.caption || t.title || "")}</div>
        ${
          infoMd
            ? `<div class="infographic-info">
                <div class="infographic-file">${escapeHtml(infoKey || "")}</div>
                ${renderMiniMarkdown(infoMd)}
               </div>`
            : ""
        }
      </div>`;
      })
      .join("");
  }

  function renderFlashPanel(t) {
    const cards = t.flashcards.slice();
    return `
      <div class="panel active" data-panel="flash">
        <p class="flash-progress" id="flash-progress">Tap card to flip · <span id="flash-count"></span></p>
        <div class="flash-area"><div class="flash-card" id="flash-card"><div class="flash-face flash-front" id="flash-front"></div><div class="flash-face flash-back" id="flash-back"></div></div></div>
        <div class="flash-actions">
          <button type="button" class="btn danger-outline" id="flash-review">Need review</button>
          <button type="button" class="btn primary" id="flash-got">Got it ✓</button>
        </div>
      </div>`;
  }

  function renderQuizPanel(t) {
    const insight = getTopicQuizInsights(t);
    const daily = getDailyChallengeSummary();
    return `
      <div class="panel active" data-panel="quiz">
        <div id="quiz-start-wrap">
          <p class="game-intro">Bank: ${insight.total} MCQs · each round: ${Math.min(QUIZ_PER_ROUND, insight.total)} adaptive · timer · early wrong = health loss · 3 streak = combo.</p>
          <div class="quiz-insights">
            <span class="quiz-chip">${escapeHtml(insight.label)}</span>
            <span class="quiz-chip">Weak ${insight.weakCount}</span>
            <span class="quiz-chip">New ${insight.unseenCount}</span>
            <span class="quiz-chip">Mastered ${insight.masteredCount}</span>
          </div>
          <div class="quiz-start-actions">
            <button type="button" class="btn primary" id="quiz-start">Start adaptive quiz</button>
            <button type="button" class="btn" id="quiz-review" ${insight.weakCount ? "" : "disabled"}>Review weak questions${insight.weakCount ? ` (${insight.weakCount})` : ""}</button>
          </div>
          <p class="quiz-note">Daily: ${Math.min(daily.answered, DAILY_CHALLENGE.answered)}/${DAILY_CHALLENGE.answered} answered · ${Math.min(daily.reviewRounds, DAILY_CHALLENGE.reviewRounds)}/${DAILY_CHALLENGE.reviewRounds} review rounds · ${Math.min(daily.weakTopics, DAILY_CHALLENGE.weakTopics)}/${DAILY_CHALLENGE.weakTopics} weak topic.</p>
        </div>
        <div id="quiz-play" hidden></div>
      </div>`;
  }

  function renderGamePanel(t) {
    const hasSeq = t.orderGame && t.orderGame.length;
    const hasTF = t.trueFalse && t.trueFalse.length >= 6;
    return `
      <div class="panel active" data-panel="game">
        <p class="game-intro">Match, order steps, or true/false drill.</p>
        <button type="button" class="btn primary" id="game-match">Matching pairs</button>
        ${
          hasSeq
            ? `<button type="button" class="btn" id="game-seq" style="margin-top:10px;width:100%">Order: ${escapeHtml(
                t.orderTitle || "sequence"
              )}</button>`
            : ""
        }
        ${
          hasTF
            ? `<button type="button" class="btn" id="game-tf" style="margin-top:10px;width:100%">True / False (10)</button>`
            : ""
        }
        <div id="game-area" style="margin-top:16px"></div>
      </div>`;
  }

  function bindPanelHandlers(t) {
    if (route.tab === "flash") startFlash(t);
    if (route.tab === "quiz") bindQuiz(t);
    if (route.tab === "game") bindGames(t);
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function startFlash(t) {
    const pool = shuffle(t.flashcards);
    const review = [];
    let idx = 0;
    let flashCompleted = false;
    let hadReviewRound = false;
    let actionLock = false;
    const MIN_FLASH_READ_MS = 2000;
    const deckSize = pool.length;
    let cardShownAt = 0;
    let sawBackForCard = false;
    const validatedCards = typeof WeakSet !== "undefined" ? new WeakSet() : null;
    let validatedCount = 0;
    const front = document.getElementById("flash-front");
    const back = document.getElementById("flash-back");
    const card = document.getElementById("flash-card");
    const prog = document.getElementById("flash-count");

    function show() {
      if (idx >= pool.length) {
        if (review.length) {
          pool.splice(0, pool.length, ...shuffle(review));
          review.length = 0;
          idx = 0;
        } else {
          flashCompleted = true;
          const baseBonus = hadReviewRound ? 18 : 10;
          const ratio = deckSize > 0 ? validatedCount / deckSize : 0;
          const bonus = Math.floor(baseBonus * ratio);
          if (bonus > 0) state.xp += bonus;
          saveState();
          front.textContent = "Deck cleared — open another tab or redo.";
          back.textContent = "Nice.";
          card.classList.remove("flipped");
          prog.textContent = "Done";
          return;
        }
      }
      const c = pool[idx];
      front.textContent = c.front;
      back.textContent = c.back;
      card.classList.remove("flipped");
      prog.textContent = `${idx + 1} / ${pool.length}`;
      cardShownAt = Date.now();
      sawBackForCard = false;
    }

    card.onclick = () => {
      card.classList.toggle("flipped");
      sawBackForCard = card.classList.contains("flipped");
    };
    document.getElementById("flash-got").onclick = () => {
      if (flashCompleted || actionLock) return;
      actionLock = true;
      const currentCard = pool[idx];
      const elapsed = Date.now() - cardShownAt;
      const validRead = elapsed >= MIN_FLASH_READ_MS && sawBackForCard;
      idx++;
      if (validRead) {
        const already = validatedCards ? validatedCards.has(currentCard) : false;
        if (!already) {
          state.xp += 2;
          if (validatedCards) validatedCards.add(currentCard);
          validatedCount++;
          saveState();
        }
      }
      actionLock = false;
      show();
    };
    document.getElementById("flash-review").onclick = () => {
      if (flashCompleted || actionLock) return;
      actionLock = true;
      const currentCard = pool[idx];
      const elapsed = Date.now() - cardShownAt;
      const validRead = elapsed >= MIN_FLASH_READ_MS && sawBackForCard;
      review.push(pool[idx]);
      idx++;
      hadReviewRound = true;
      if (validRead) {
        const already = validatedCards ? validatedCards.has(currentCard) : false;
        if (!already) {
          state.xp += 1;
          if (validatedCards) validatedCards.add(currentCard);
          validatedCount++;
          saveState();
        }
      }
      actionLock = false;
      show();
    };
    show();
  }

  function bindQuiz(t) {
    const start = document.getElementById("quiz-start");
    const review = document.getElementById("quiz-review");
    const wrap = document.getElementById("quiz-start-wrap");
    const play = document.getElementById("quiz-play");
    const insight = getTopicQuizInsights(t);
    start.onclick = () => {
      if (insight.weakCount > 0) markDailyWeakTopic(t.id);
      wrap.hidden = true;
      play.hidden = false;
      runQuiz(t, play);
    };
    if (review) {
      review.onclick = () => {
        if (insight.weakCount > 0) markDailyWeakTopic(t.id);
        wrap.hidden = true;
        play.hidden = false;
        runQuiz(t, play, { review: true });
      };
    }
  }

  function showExplain(title, body, then, note) {
    const root = document.getElementById("modal-root");
    const panelExplain = document.getElementById("panel-explain");
    const panelSettings = document.getElementById("panel-settings");
    const panelShop = document.getElementById("panel-shop");
    panelSettings.hidden = true;
    if (panelShop) panelShop.hidden = true;
    document.getElementById("explain-title").textContent = title;
    const explainBody = document.getElementById("explain-body");
    explainBody.innerHTML = `${escapeHtml(body)}${
      note ? `<span class="explain-note">${escapeHtml(note)}</span>` : ""
    }`;
    panelExplain.hidden = false;
    root.hidden = false;
    root.setAttribute("aria-hidden", "false");
    const ok = document.getElementById("btn-explain-ok");
    const once = () => {
      ok.removeEventListener("click", once);
      panelExplain.hidden = true;
      root.hidden = true;
      root.setAttribute("aria-hidden", "true");
      then();
    };
    ok.addEventListener("click", once);
  }

  function getTopicQuizBank(t) {
    const base = Array.isArray(t.quiz) ? t.quiz : [];
    const byTopic = window.EXTRA_QUIZ_BY_TOPIC || {};
    const extra = Array.isArray(byTopic[String(t.id)]) ? byTopic[String(t.id)] : [];
    return base.concat(extra).map((q) => ({ ...q, __topicId: q.__topicId || t.id }));
  }

  function getThemeExtraQuiz(themeKey) {
    const byTheme = window.EXTRA_THEME_QUIZ || {};
    if (Array.isArray(byTheme[themeKey])) return byTheme[themeKey];
    const norm = String(themeKey || "").trim().toLowerCase();
    const hitKey = Object.keys(byTheme).find(
      (k) => String(k).trim().toLowerCase() === norm
    );
    return hitKey && Array.isArray(byTheme[hitKey]) ? byTheme[hitKey] : [];
  }

  function getTopicQuizInsights(t) {
    const annotated = annotateQuizBank(getTopicQuizBank(t), t.id);
    const weakCount = annotated.filter((item) => item.bucket === "weak").length;
    const unseenCount = annotated.filter((item) => item.bucket === "new").length;
    const masteredCount = annotated.filter(
      (item) => item.bucket === "mastered"
    ).length;
    const avgMastery = annotated.length
      ? annotated.reduce(
          (sum, item) => sum + (item.stats.mastery || 0),
          0
        ) / annotated.length
      : 0;
    let label = "New";
    if (annotated.some((item) => item.stats.seen > 0)) {
      label = "Improving";
      if (avgMastery >= 85) label = "Mastered";
      else if (avgMastery >= 60) label = "Strong";
    }
    return {
      total: annotated.length,
      weakCount,
      unseenCount,
      masteredCount,
      avgMastery,
      label,
    };
  }

  function pickAdaptiveQuestions(t, opts) {
    opts = opts || {};
    const annotated = annotateQuizBank(getTopicQuizBank(t), t.id);
    const n = Math.min(QUIZ_PER_ROUND, annotated.length);
    const rank = (items) =>
      items
        .map((item) => ({ ...item, _rand: Math.random() }))
        .sort((a, b) => b.priority - a.priority || a._rand - b._rand);
    const weak = rank(annotated.filter((item) => item.bucket === "weak"));
    const fresh = rank(annotated.filter((item) => item.bucket === "new"));
    const normal = rank(
      annotated.filter(
        (item) => item.bucket === "improving" || item.bucket === "strong"
      )
    );
    const mastered = rank(
      annotated.filter((item) => item.bucket === "mastered")
    );

    if (opts.review) {
      const reviewPool = weak.length ? weak : normal;
      return reviewPool.slice(0, Math.min(n, reviewPool.length)).map((item) => ({
        ...item.q,
        __questionKey: item.questionKey,
      }));
    }

    const selected = [];
    const used = new Set();
    const takeFrom = (items, count) => {
      for (const item of items) {
        if (selected.length >= n || count <= 0) break;
        if (used.has(item.questionKey)) continue;
        used.add(item.questionKey);
        selected.push({ ...item.q, __questionKey: item.questionKey });
        count--;
      }
    };

    takeFrom(weak, Math.min(6, weak.length));
    takeFrom(fresh, Math.min(5, fresh.length));
    takeFrom(normal, Math.max(0, n - selected.length - Math.min(2, mastered.length)));
    takeFrom(mastered, Math.min(2, mastered.length));
    takeFrom(rank(annotated), n - selected.length);

    return selected;
  }

  function recordQuestionOutcome(q, fallbackTopicId, outcome, elapsedSec) {
    const topicId = getQuestionTopicId(q, fallbackTopicId);
    const questionKey = q.__questionKey || getQuestionKey(q, fallbackTopicId);
    const stats = touchQuestionStats(topicId, questionKey);
    stats.seen += 1;
    stats.lastSeenAt = Date.now();
    stats.lastResult = outcome;
    if (outcome === "correct") {
      stats.correct += 1;
      stats.streak += 1;
      stats.lastCorrectAt = Date.now();
      let gain = 10 + Math.min(10, stats.streak * 2);
      if (elapsedSec <= QUESTION_MS / 1000 / 2) gain += 6;
      stats.mastery = Math.min(100, stats.mastery + gain);
    } else if (outcome === "wrong") {
      stats.wrongs += 1;
      stats.streak = 0;
      stats.lastWrongAt = Date.now();
      stats.mastery = Math.max(0, stats.mastery - 18);
    } else if (outcome === "timeout") {
      stats.wrongs += 1;
      stats.streak = 0;
      stats.lastWrongAt = Date.now();
      stats.mastery = Math.max(0, stats.mastery - 24);
    }
    saveState();
  }

  function getQuestionConfidenceMeta(q, fallbackTopicId) {
    const info = readQuestionStats(q, fallbackTopicId);
    const stats = info.stats || {};
    const mastery = Math.max(0, Math.min(100, Math.round(stats.mastery || 0)));
    const bucket = getQuestionBucket(stats);
    let label = "Building";
    let reason = "Keep seeing this a little more until the pattern is stable.";
    let tone = "building";

    if (bucket === "new") {
      label = "New";
      tone = "new";
      reason = "This is still new, so it will come back a few times to build memory.";
    } else if (bucket === "weak") {
      label = "Needs practice";
      tone = "weak";
      if (stats.lastResult === "timeout") {
        reason = "This one is shown more often because time ran out recently.";
      } else {
        reason = "This one is shown more often because it was missed recently.";
      }
    } else if (bucket === "strong") {
      label = "Strong";
      tone = "strong";
      reason = "You usually get this right, so it should appear less often now.";
    } else if (bucket === "mastered") {
      label = "Mastered";
      tone = "mastered";
      reason = "This should appear only occasionally now for spaced review.";
    }

    return { mastery, label, reason, tone };
  }

  function renderQuestionConfidenceHtml(q, fallbackTopicId) {
    const meta = getQuestionConfidenceMeta(q, fallbackTopicId);
    return `
      <div class="question-confidence ${meta.tone}">
        <div class="question-confidence-head">
          <span class="question-confidence-label">${escapeHtml(meta.label)}</span>
          <span class="question-confidence-pct">${meta.mastery}%</span>
        </div>
        <div class="question-confidence-bar"><div class="question-confidence-fill" style="width:${meta.mastery}%"></div></div>
        <div class="question-confidence-reason">${escapeHtml(meta.reason)}</div>
      </div>`;
  }

  function runQuiz(t, container, opts) {
    opts = opts || {};
    const isBoss = !!opts.boss;
    const isReview = !!opts.review;
    const healthMax = isBoss ? 1 : HEALTH_START;
    const questionMs = isBoss ? Math.round(QUESTION_MS * BOSS_QUESTION_MS_MULT) : QUESTION_MS;
    const qs = pickAdaptiveQuestions(t, opts);
    if (!qs.length) {
      container.innerHTML = `<div class="game-win"><h3>No questions ready</h3><p>${
        isReview
          ? "You do not have enough weak questions yet. Try a normal quiz first."
          : "This topic does not have a quiz bank yet."
      }</p></div>`;
      return;
    }
    let qi = 0;
    let score = 0;
    let combo = 0;
    let health = healthMax;
    let timerId = null;
    let qStart = 0;

    function renderQ() {
      if (qi >= qs.length) {
        const pct = Math.round((score / (qs.length * 100)) * 100);
        const capped = Math.min(100, pct);
        if (!isBoss && !isReview && t.id) {
          state.topicScores[t.id] = (state.topicScores[t.id] || 0) + 1;
          if ((state.topicBest[t.id] || 0) < capped)
            state.topicBest[t.id] = capped;
          state.xp += Math.round(capped * 2 + combo * 5);
        } else if (isReview && t.id) {
          state.xp += Math.max(10, Math.round(capped + combo * 2));
          if (qs.length) markDailyReviewRound();
        } else if (isBoss && opts.themeId) {
          state.themeBossBeaten = state.themeBossBeaten || {};
          state.themeBossBeaten[opts.themeId] = true;
          state.xp += BOSS_XP;
        }
        saveState();
        const bossMsg = isBoss ? `<p class="boss-reward">🏆 +${BOSS_XP} XP · Theme badge unlocked!</p>` : "";
        container.innerHTML = `
          <div class="game-win">
            <h3>${isBoss ? "Boss defeated!" : isReview ? "Review complete" : "Round complete"}</h3>
            <p>Score: ${score} · ~${capped}%${!isBoss && !isReview && t.id ? " · Best saved: " + state.topicBest[t.id] + "%" : ""}</p>
            ${bossMsg}
            <button type="button" class="btn primary" id="quiz-again">${isBoss ? "Back to topics" : "Again"}</button>
          </div>`;
        document.getElementById("quiz-again").onclick = () => {
          container.innerHTML = "";
          if (isBoss) {
            route = { view: "home" };
            renderHome();
          } else if (isReview) {
            runQuiz(t, container, { review: true });
          } else {
            runQuiz(t, container);
          }
        };
        return;
      }

      const q = qs[qi];
      const optionItems = shuffle(q.options.map((o, i) => ({ o, i })));
      container.innerHTML = `
        <div class="quiz-meta">
          <div class="timer-bar-wrap"><div class="timer-bar" id="q-timer"></div></div>
          <span class="combo" id="q-combo">${isReview ? "Review mode" : combo >= COMBO_AT ? "🔥 COMBO x" + COMBO_MULT : ""}</span>
          <div class="health-bar" id="q-health">${Array(healthMax)
            .fill(0)
            .map(
              (_, h) =>
                `<span class="health-dot ${
                  h >= health ? "lost" : ""
                }"></span>`
            )
            .join("")}</div>
        </div>
        <div class="quiz-q">${escapeHtml(q.question)}</div>
        <div class="quiz-options" id="q-opts"></div>
        <div class="quiz-score-line">Points this round: ${score}</div>
        <div id="quiz-confidence"></div>
      `;
      const bar = document.getElementById("q-timer");
      bar.style.transition = "none";
      bar.style.width = "100%";
      void bar.offsetWidth;
      bar.style.transition = `width ${questionMs}ms linear`;
      bar.style.width = "0%";
      qStart = Date.now();
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => finish(false, true), questionMs);

      const optEl = document.getElementById("q-opts");
      optionItems.forEach(({ o, i }) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "quiz-opt";
        b.textContent = o;
        b.dataset.idx = String(i);
        b.onclick = () => {
          if (b.disabled) return;
          finish(i === q.correctIndex, false, b);
        };
        optEl.appendChild(b);
      });
    }

    function finish(correct, timeout, clickedBtn) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      const q = qs[qi];
      const elapsed = (Date.now() - qStart) / 1000;
      const opts = document.querySelectorAll(".quiz-opt");
      opts.forEach((b) => (b.disabled = true));
      if (timeout) {
        recordQuestionOutcome(q, t.id, "timeout", elapsed);
        const confidenceMeta = getQuestionConfidenceMeta(q, t.id);
        if (isBoss) {
          health = Math.max(0, health - 1);
          if (health === 0) {
            container.innerHTML = `
              <div class="game-win" style="border-color: var(--danger);">
                <h3>Boss wins this time</h3>
                <p>Time's up. Review and try again!</p>
                <button type="button" class="btn primary" id="quiz-boss-retry2">Back to topics</button>
              </div>`;
            document.getElementById("quiz-boss-retry2").onclick = () => {
              route = { view: "home" };
              renderHome();
            };
            return;
          }
        }
        showExplain("Time's up", q.explanation, () => {
          combo = 0;
          qi++;
          renderQ();
        }, `${confidenceMeta.label} · ${confidenceMeta.reason}`);
        return;
      }
      markDailyAnswered(1);
      if (correct) {
        recordQuestionOutcome(q, t.id, "correct", elapsed);
        combo++;
        let pts = 100;
        const timeLeft = Math.max(0, 1 - elapsed / (QUESTION_MS / 1000));
        pts = Math.round(60 + 40 * timeLeft);
        if (combo >= COMBO_AT) pts = Math.round(pts * COMBO_MULT);
        score += pts;
        opts.forEach((b) => {
          if (Number(b.dataset.idx) === q.correctIndex)
            b.classList.add("correct");
        });
        const confidence = document.getElementById("quiz-confidence");
        if (confidence) {
          confidence.innerHTML = renderQuestionConfidenceHtml(q, t.id);
        }
        setTimeout(() => {
          qi++;
          renderQ();
        }, 900);
      } else {
        recordQuestionOutcome(q, t.id, "wrong", elapsed);
        const confidenceMeta = getQuestionConfidenceMeta(q, t.id);
        if (elapsed < EARLY_WRONG_SEC || isBoss) {
          health = Math.max(0, health - 1);
        }
        combo = 0;
        if (clickedBtn) clickedBtn.classList.add("wrong");
        opts.forEach((b) => {
          if (Number(b.dataset.idx) === q.correctIndex)
            b.classList.add("correct");
        });
        const next = () => {
          qi++;
          renderQ();
        };
        if (isBoss && health === 0) {
          container.innerHTML = `
            <div class="game-win" style="border-color: var(--danger);">
              <h3>Boss wins this time</h3>
              <p>Out of health. Review the topic and try again!</p>
              <button type="button" class="btn primary" id="quiz-boss-retry">Back to topics</button>
            </div>`;
          document.getElementById("quiz-boss-retry").onclick = () => {
            route = { view: "home" };
            renderHome();
          };
        } else {
          showExplain(
            "Not quite",
            q.explanation,
            next,
            `${confidenceMeta.label} · ${confidenceMeta.reason}`
          );
        }
      }
    }

    renderQ();
  }

  function bindGames(t) {
    document.getElementById("game-match").onclick = () =>
      runMatchGame(t, document.getElementById("game-area"));
    const seqBtn = document.getElementById("game-seq");
    if (seqBtn)
      seqBtn.onclick = () =>
        runSequenceGame(t, document.getElementById("game-area"));
    const tfBtn = document.getElementById("game-tf");
    if (tfBtn)
      tfBtn.onclick = () =>
        runTrueFalseGame(t, document.getElementById("game-area"));
  }

  function runTrueFalseGame(t, area) {
    const pool = shuffle(t.trueFalse.slice()).slice(0, 10);
    let i = 0;
    let correct = 0;
    function show() {
      if (i >= pool.length) {
        const xp = correct * 3 + (correct === pool.length ? 15 : 0);
        state.xp += xp;
        saveState();
        area.innerHTML = `<div class="game-win"><h3>Round done</h3><p>${correct}/${pool.length} correct · +${xp} XP</p></div>`;
        return;
      }
      const item = pool[i];
      area.innerHTML = `
        <p class="tf-progress">${i + 1} / ${pool.length}</p>
        <p class="tf-statement">${escapeHtml(item.statement)}</p>
        <div class="tf-row">
          <button type="button" class="btn primary tf-pick" data-v="true">True</button>
          <button type="button" class="btn tf-pick" data-v="false">False</button>
        </div>
        <p class="tf-feedback" id="tf-feedback" hidden></p>
        <button type="button" class="btn" id="tf-next" hidden>Next</button>`;
      const fb = document.getElementById("tf-feedback");
      const next = document.getElementById("tf-next");
      area.querySelectorAll(".tf-pick").forEach((btn) => {
        btn.onclick = () => {
          const ans = btn.dataset.v === "true";
          const ok = ans === item.correct;
          if (ok) correct++;
          fb.hidden = false;
          fb.className = "tf-feedback " + (ok ? "tf-ok" : "tf-bad");
          fb.textContent = (ok ? "✓ " : "✗ ") + item.explain;
          area.querySelectorAll(".tf-pick").forEach((b) => (b.disabled = true));
          next.hidden = false;
        };
      });
      next.onclick = () => {
        i++;
        show();
      };
    }
    show();
  }

  function runMatchGame(t, area) {
    const cards = shuffle(t.flashcards).slice(0, 8);
    if (cards.length < 4) {
      area.innerHTML = "<p class='empty-state'>Need more flashcards.</p>";
      return;
    }
    const pairs = cards.slice(0, 8);
    const tiles = [];
    pairs.forEach((c, i) => {
      tiles.push({ id: `f${i}`, text: c.front, match: `b${i}` });
      tiles.push({ id: `b${i}`, text: c.back, match: `f${i}` });
    });
    const isAdjacent = (a, b, cols) => {
      const ar = Math.floor(a / cols);
      const ac = a % cols;
      const br = Math.floor(b / cols);
      const bc = b % cols;
      return (ar === br && Math.abs(ac - bc) === 1) || (ac === bc && Math.abs(ar - br) === 1);
    };

    const adjacentPairCount = (arr, cols) => {
      const posById = {};
      arr.forEach((tile, idx) => {
        posById[tile.id] = idx;
      });
      let count = 0;
      const seen = new Set();
      arr.forEach((tile) => {
        const a = tile.id;
        const b = tile.match;
        const key = a < b ? `${a}|${b}` : `${b}|${a}`;
        if (seen.has(key)) return;
        seen.add(key);
        if (isAdjacent(posById[a], posById[b], cols)) count++;
      });
      return count;
    };

    // Optimize the shuffled layout to avoid adjacent answer pairs.
    // We score against both mobile (2 cols) and wider (3 cols) grid modes.
    let arranged = shuffle(tiles);
    let best = arranged;
    let bestScore = adjacentPairCount(best, 2) + adjacentPairCount(best, 3);
    for (let tries = 0; tries < 200 && bestScore > 0; tries++) {
      const cand = shuffle(tiles);
      const score = adjacentPairCount(cand, 2) + adjacentPairCount(cand, 3);
      if (score < bestScore) {
        best = cand;
        bestScore = score;
      }
      if (score === 0) {
        best = cand;
        bestScore = 0;
        break;
      }
    }
    arranged = best;
    let sel = null;
    let matched = 0;
    area.innerHTML =
      '<div class="match-grid" id="match-grid"></div><p class="flash-progress" id="match-status"></p>';
    const grid = document.getElementById("match-grid");
    arranged.forEach((tile) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "match-tile";
      btn.textContent = tile.text.length > 60 ? tile.text.slice(0, 57) + "…" : tile.text;
      btn.dataset.id = tile.id;
      btn.dataset.match = tile.match;
      btn.addEventListener("click", () => {
        if (btn.classList.contains("matched") || btn.disabled) return;
        if (!sel) {
          sel = btn;
          btn.classList.add("selected");
          return;
        }
        if (sel === btn) {
          sel.classList.remove("selected");
          sel = null;
          return;
        }
        if (sel.dataset.match === btn.dataset.id) {
          sel.classList.add("matched");
          btn.classList.add("matched");
          sel.classList.remove("selected");
          sel = null;
          matched += 2;
          if (matched === arranged.length) {
            state.xp += 25;
            saveState();
            document.getElementById("match-status").textContent =
              "Cleared! +25 XP";
          }
        } else {
          btn.classList.add("wrong-flash");
          sel.classList.add("wrong-flash");
          const s = sel;
          setTimeout(() => {
            btn.classList.remove("wrong-flash");
            s.classList.remove("selected", "wrong-flash");
          }, 400);
          sel = null;
        }
      });
      grid.appendChild(btn);
    });
  }

  function runSequenceGame(t, area) {
    let order = shuffle(t.orderGame.slice());
    area.innerHTML = `
      <p class="game-intro">Drag to reorder (tap two items to swap on mobile).</p>
      <div class="sequence-game" id="seq-list"></div>
      <button type="button" class="btn primary" id="seq-check">Check order</button>`;
    const list = document.getElementById("seq-list");

    function renderList() {
      list.innerHTML = "";
      list._tap = null;
      order.forEach((text, idx) => {
        const el = document.createElement("div");
        el.className = "seq-item";
        el.textContent = text;
        el.draggable = true;
        el.dataset.idx = idx;
        el.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", String(idx));
          list.classList.add("dragging");
        });
        el.addEventListener("dragend", () =>
          list.classList.remove("dragging")
        );
        el.addEventListener("dragover", (e) => e.preventDefault());
        el.addEventListener("drop", (e) => {
          e.preventDefault();
          const from = Number(e.dataTransfer.getData("text/plain"));
          const to = idx;
          const o = order.slice();
          const [x] = o.splice(from, 1);
          o.splice(to, 0, x);
          order = o;
          renderList();
        });
        el.addEventListener("click", () => {
          if (list._tap == null) {
            list._tap = idx;
            el.style.outline = "2px solid var(--accent)";
            return;
          }
          const a = list._tap;
          list._tap = null;
          list.querySelectorAll(".seq-item").forEach((x) => (x.style.outline = ""));
          if (a === idx) return;
          const o = order.slice();
          [o[a], o[idx]] = [o[idx], o[a]];
          order = o;
          renderList();
        });
        list.appendChild(el);
      });
    }
    renderList();
    document.getElementById("seq-check").onclick = () => {
      const ok = order.every((text, i) => text === t.orderGame[i]);
      if (ok) {
        state.xp += 40;
        saveState();
        area.innerHTML =
          '<div class="game-win"><h3>Perfect order</h3><p>+40 XP</p></div>';
      } else {
        alert(
          "Not yet — compare with Notes. Correct order matches the syllabus sequence."
        );
      }
    };
  }

  function startBossBattle(themeKey) {
    const name = themeKey;
    const ids = themesByKey[themeKey];
    if (
      !ids ||
      state.themeBossBeaten &&
        state.themeBossBeaten[themeKey]
    )
      return;
    main.innerHTML = `
      <div class="boss-intro">
        <h1>Boss: ${escapeHtml(name)}</h1>
        <p>1 HP · 20% faster timer · questions from all topics in this theme.</p>
        <p>Win to earn <strong>${BOSS_XP} XP</strong> and a permanent badge.</p>
        <button type="button" class="btn primary" id="boss-start">Start battle</button>
        <button type="button" class="btn" id="boss-cancel">Cancel</button>
      </div>
      <div id="boss-quiz-container" hidden></div>`;
    document.getElementById("boss-cancel").onclick = () => {
      route = { view: "home" };
      renderHome();
    };
    document.getElementById("boss-start").onclick = () => {
      document.querySelector(".boss-intro").hidden = true;
      const container = document.getElementById("boss-quiz-container");
      container.hidden = false;
      container.innerHTML = "<p class='empty-state'>Loading theme topics…</p>";
      Promise.all(ids.map((id) => loadTopicScript(id)))
        .then((topics) => {
          const allQuiz = topics.flatMap((topic) =>
            getTopicQuizBank(topic).map((q) => ({ ...q }))
          );
          const themeExtra = getThemeExtraQuiz(themeKey).map((q) => ({ ...q }));
          allQuiz.push(...themeExtra);
          const synthetic = { id: "boss:" + themeKey, quiz: allQuiz };
          runQuiz(synthetic, container, { boss: true, themeId: themeKey });
        })
        .catch(() => {
          container.innerHTML = "<p class='empty-state'>Failed to load topics.</p><button type='button' class='btn primary' id='boss-back'>Back</button>";
          document.getElementById("boss-back").onclick = () => renderHome();
        });
    };
  }

  function openShop() {
    const root = document.getElementById("modal-root");
    const panelExplain = document.getElementById("panel-explain");
    const panelSettings = document.getElementById("panel-settings");
    if (!panelExplain.hidden) return;
    panelSettings.hidden = true;
    panelExplain.hidden = true;
    const panelShop = document.getElementById("panel-shop");
    panelShop.hidden = false;
    root.hidden = false;
    root.setAttribute("aria-hidden", "false");
    const rewards = window.SHOP_REWARDS || [];
    const list = document.getElementById("shop-rewards-list");
    list.innerHTML = rewards
      .map(
        (r) => `
        <div class="shop-item">
          <span class="shop-label">${escapeHtml(r.label)}</span>
          <span class="shop-xp">${r.xp} XP</span>
          <button type="button" class="btn primary shop-buy" data-id="${escapeHtml(r.id)}" data-xp="${r.xp}" data-label="${escapeHtml(r.label)}" ${state.xp < r.xp ? "disabled" : ""}>Buy</button>
        </div>`
      )
      .join("");
    list.querySelectorAll(".shop-buy").forEach((btn) => {
      btn.onclick = () => {
        const xp = Number(btn.dataset.xp);
        const label = btn.dataset.label;
        const id = btn.dataset.id;
        if (state.xp < xp) return;
        state.xp -= xp;
        state.coupons = state.coupons || [];
        state.coupons.push({ id, label, xp, date: new Date().toISOString().slice(0, 10) });
        saveState();
        openShop();
      };
    });
    const coupons = state.coupons || [];
    const couponsList = document.getElementById("shop-coupons-list");
    couponsList.innerHTML =
      coupons.length === 0
        ? "<p class='hint'>No coupons yet. Earn XP and buy a reward!</p>"
        : coupons
            .map(
              (c, i) =>
                `<div class="coupon-card">
                  <strong>${escapeHtml(c.label)}</strong>
                  <span class="coupon-xp">${c.xp} XP</span>
                  <span class="coupon-date">${c.date}</span>
                  <p class="coupon-hint">Show this to your parent to claim.</p>
                </div>`
            )
            .join("");
  }

  document.getElementById("btn-home").onclick = () => {
    // If we're running inside a subject shell (chemistry/physics), clicking the logo should
    // return to the subject picker (root index.html). If not, behave like "home".
    const isSubjectShell = !!window.SUBJECT_ID;
    if (isSubjectShell) {
      const to = window.SUBJECT_ID === "physics" ? "../index.html" : "index.html";
      window.location.href = to;
      return;
    }
    route = { view: "home" };
    renderHome();
  };

  document.getElementById("btn-shop").onclick = () => openShop();

  document.getElementById("btn-close-shop").onclick = () => {
    const root = document.getElementById("modal-root");
    document.getElementById("panel-shop").hidden = true;
    root.hidden = true;
    root.setAttribute("aria-hidden", "true");
    if (route.view === "home") renderHome();
  };

  function bufToB64(buf) {
    let binary = "";
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  function b64ToBuf(b64) {
    const binary = atob(b64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
  }

  async function encryptPayload(password, json) {
    if (!window.crypto || !crypto.subtle) {
      // Fallback: base64 JSON, clearly tagged as plain
      return "v1-plain:" + bufToB64(new TextEncoder().encode(json));
    }
    const enc = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt"]
    );
    const cipher = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      enc.encode(json)
    );
    return `v1:${bufToB64(salt.buffer)}:${bufToB64(iv.buffer)}:${bufToB64(cipher)}`;
  }

  async function decryptPayload(password, code) {
    if (code.startsWith("v1-plain:")) {
      const b64 = code.slice("v1-plain:".length);
      const buf = b64ToBuf(b64);
      return new TextDecoder().decode(buf);
    }
    const parts = code.split(":");
    if (parts.length !== 4 || parts[0] !== "v1") throw new Error("Bad format");
    const salt = new Uint8Array(b64ToBuf(parts[1]));
    const iv = new Uint8Array(b64ToBuf(parts[2]));
    const data = b64ToBuf(parts[3]);
    if (!window.crypto || !crypto.subtle) throw new Error("Crypto not supported");
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );
    const plainBuf = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );
    return new TextDecoder().decode(plainBuf);
  }

  async function handleExportProgress() {
    const pwd = document.getElementById("export-password").value.trim();
    const out = document.getElementById("export-output");
    const status = document.getElementById("sync-status");
    if (!pwd) {
      status.textContent = "Set a password first.";
      return;
    }
    try {
      const json = JSON.stringify(portableState());
      const code = await encryptPayload(pwd, json);
      out.value = code;
      status.textContent = "Exported. Copy the code and keep the password safe.";
    } catch (e) {
      status.textContent = "Export failed: " + e.message;
    }
  }

  async function handleImportProgress() {
    const pwd = document.getElementById("import-password").value.trim();
    const input = document.getElementById("import-input").value.trim();
    const status = document.getElementById("sync-status");
    if (!pwd || !input) {
      status.textContent = "Paste a code and enter the same password used for export.";
      return;
    }
    try {
      const json = await decryptPayload(pwd, input);
      const payload = JSON.parse(json);
      applyPortableState(payload);
      status.textContent = "Import OK. Progress updated.";
      updateTopbar();
      if (route.view === "home") renderHome();
    } catch (e) {
      status.textContent = "Import failed (wrong password or corrupted code).";
    }
  }

  const exportBtn = document.getElementById("btn-export-progress");
  if (exportBtn) exportBtn.onclick = () => { handleExportProgress(); };
  const importBtn = document.getElementById("btn-import-progress");
  if (importBtn) importBtn.onclick = () => { handleImportProgress(); };

  document.getElementById("btn-settings").onclick = () => {
    const panelExplain = document.getElementById("panel-explain");
    const panelShop = document.getElementById("panel-shop");
    if (!panelExplain.hidden) return;
    const root = document.getElementById("modal-root");
    if (panelShop) panelShop.hidden = true;
    document.getElementById("opt-unlock-all").checked = state.unlockAll;
    document.getElementById("opt-challenge").checked = state.challengeMode;
    document.getElementById("panel-settings").hidden = false;
    root.hidden = false;
    root.setAttribute("aria-hidden", "false");
  };

  document.getElementById("btn-close-settings").onclick = () => {
    state.unlockAll = document.getElementById("opt-unlock-all").checked;
    state.challengeMode = document.getElementById("opt-challenge").checked;
    saveState();
    const root = document.getElementById("modal-root");
    document.getElementById("panel-settings").hidden = true;
    root.hidden = true;
    root.setAttribute("aria-hidden", "true");
    if (route.view === "home") renderHome();
  };

  dock.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => {
      route.tab = b.dataset.tab;
      renderTopic();
    });
  });

  updateTopbar();
  renderHome();
})();
