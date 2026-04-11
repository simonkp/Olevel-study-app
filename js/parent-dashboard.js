(function () {
  var status       = document.getElementById("status");
  var studentCards = document.getElementById("student-cards");
  var btnSetup     = document.getElementById("btn-setup-keys");
  var btnRefresh   = document.getElementById("btn-refresh");
  var projectCode  = document.getElementById("project-code");
  var parentCode   = document.getElementById("parent-code");
  var rememberCode = document.getElementById("remember-code");

  var TOKEN_KEY     = "PARENT_DASH_TOKEN_V1";
  var TOKEN_EXP_KEY = "PARENT_DASH_TOKEN_EXP_V1";

  function saveToken(token) {
    var exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_EXP_KEY, String(exp));
  }

  function loadToken() {
    var token = (localStorage.getItem(TOKEN_KEY) || "").trim();
    var exp   = Number(localStorage.getItem(TOKEN_EXP_KEY) || 0);
    if (!token || !exp || Date.now() > exp) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXP_KEY);
      return "";
    }
    return token;
  }

  function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXP_KEY);
  }

  async function sha256Hex(input) {
    var enc    = new TextEncoder().encode(input);
    var digest = await crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(digest)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
  }

  function getKeys() {
    return {
      url: (localStorage.getItem("SUPABASE_URL")      || "").trim(),
      key: (localStorage.getItem("SUPABASE_ANON_KEY") || "").trim(),
    };
  }

  function setupKeys() {
    var k = getKeys();
    var u = prompt("Supabase Project URL:", k.url || "https://xxxx.supabase.co");
    if (!u) return;
    var a = prompt("Supabase anon/public key:", k.key || "");
    if (!a) return;
    localStorage.setItem("SUPABASE_URL", u.trim());
    localStorage.setItem("SUPABASE_ANON_KEY", a.trim());
    status.textContent = "Keys saved.";
  }

  function fmt(ts) {
    if (!ts) return "-";
    var d = new Date(ts);
    return isNaN(d.getTime()) ? "-" : d.toLocaleString();
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function topicList(topics, key) {
    var arr = Array.isArray(topics) ? topics : [];
    if (!arr.length) return "<span class='chip'>none</span>";
    return arr.slice(0, 8).map(function (t) {
      return "<span class='chip'>T" + esc(t.topic_id) + " · " + Number(t[key] || 0) + "%</span>";
    }).join("");
  }

  function subjectList(subjects) {
    var arr = Array.isArray(subjects) ? subjects : [];
    if (!arr.length) return "<span class='chip'>none</span>";
    return arr.slice(0, 8).map(function (s) {
      var id     = esc((s && s.subject_id) || "general");
      var xp     = Number((s && s.xp)     || 0);
      var events = Number((s && s.events) || 0);
      return "<span class='chip'>" + id + " · XP " + xp + " · events " + events + "</span>";
    }).join("");
  }

  function recentCouponList(rows) {
    var arr = Array.isArray(rows) ? rows : [];
    if (!arr.length) return "<span class='chip'>none</span>";
    return arr.slice(0, 8).map(function (r) {
      var label   = esc(r.reward_label || r.reward_id || "reward");
      var code    = esc(r.coupon_code  || "-");
      var date    = fmt(r.purchased_at);
      var claimed = r.claimed_at ? ("Claimed " + fmt(r.claimed_at)) : "Active";
      return "<span class='chip'>" + label + " · " + Number(r.xp_cost || 0) + " XP · " + date + " · " + esc(claimed) + " · code " + code + "</span>";
    }).join("");
  }

  function studentDetailBlocks(s) {
    return "<div class='actions-row'>" +
      "<div class='menu-wrap'>" +
        "<button type='button' class='menu-btn student-menu-toggle' aria-haspopup='true' aria-expanded='false' title='More actions'>\u22EE</button>" +
        "<div class='menu-panel' hidden>" +
          "<button type='button' class='rename-student' data-student-id='" + esc(s.student_id || "") + "' data-student-name='" + esc(s.student_name || s.student_id || "") + "'>Rename</button>" +
          "<button type='button' class='delete-student btn-danger' data-student-id='" + esc(s.student_id || "") + "' data-student-name='" + esc(s.student_name || s.student_id || "") + "'>Delete student data</button>" +
        "</div>" +
      "</div>" +
    "</div>" +
    "<div class='details'>" +
      "<div class='mini'><h4>Last 7 days</h4><div class='chips'><span class='chip'>XP " + Number(s.xp_last_7d || 0) + "</span><span class='chip'>Events " + Number(s.xp_events_last_7d || 0) + "</span></div></div>" +
      "<div class='mini'><h4>Areas studied (overall)</h4><div class='chips'>" + (Array.isArray(s.areas_overall) && s.areas_overall.length ? s.areas_overall.map(function (a) { return "<span class='chip'>" + esc(a) + "</span>"; }).join("") : "<span class='chip'>none</span>") + "</div></div>" +
      "<div class='mini'><h4>Areas studied (last week)</h4><div class='chips'>" + (Array.isArray(s.areas_week) && s.areas_week.length ? s.areas_week.map(function (a) { return "<span class='chip'>" + esc(a) + "</span>"; }).join("") : "<span class='chip'>none</span>") + "</div></div>" +
      "<div class='mini'><h4>Strong topics</h4><div class='chips'>" + topicList(s.strong_topics, "mastery") + "</div></div>" +
      "<div class='mini'><h4>Weak topics</h4><div class='chips'>"   + topicList(s.weak_topics,   "mastery") + "</div></div>" +
      "<div class='mini'><h4>Subjects</h4><div class='chips'>"      + subjectList(s.subject_stats)         + "</div></div>" +
      "<div class='mini'><h4>Recent coupons (verification)</h4><div class='chips'>" + recentCouponList(s.recent_coupons) + "</div></div>" +
    "</div>";
  }

  async function loadData() {
    var keys = getKeys();
    if (!keys.url || !keys.key) {
      status.textContent = "Missing Supabase keys. Click Supabase keys first.";
      return;
    }
    var token = loadToken();
    var pin   = (parentCode.value || "").trim();
    if (!token && !pin) { status.textContent = "Enter parent access code."; return; }
    if (!token && pin) token = await sha256Hex(pin);
    status.textContent = "Loading...";
    try {
      var sb = window.supabase.createClient(keys.url, keys.key);
      var res = await sb.rpc("study_parent_student_overview_token", {
        p_project_code: (projectCode.value || "study-app").trim(),
        p_parent_token: token,
      });
      if (res.error) throw res.error;
      var data = res.data;
      if (!data || !data.ok) {
        status.textContent = "Failed: " + ((data && data.error) || "unknown");
        if (data && data.error && String(data.error).includes("token")) clearToken();
        return;
      }
      if (rememberCode.checked && token) saveToken(token);
      if (!rememberCode.checked) clearToken();
      var students = Array.isArray(data.students) ? data.students : [];
      if (!students.length) {
        if (studentCards) studentCards.innerHTML = "<p class='hint'>No student rows yet.</p>";
        status.textContent = "Loaded. No students found yet.";
        return;
      }
      if (studentCards) {
        studentCards.innerHTML = students.map(function (s) {
          return "<section class='student-card'>" +
            "<button type='button' class='student-toggle' aria-expanded='false'>" +
            "<div class='student-head'>" +
              "<div><div class='name-row'><span class='student-avatar'>\uD83D\uDC64</span><h3>" + esc(s.student_name || "Student") + "</h3></div>" +
              "<p class='hint student-meta'>ID: " + esc(s.student_id || "-") + "</p></div>" +
              "<div class='hint'><span class='divider-dot'>\u2022</span> Last activity: " + fmt(s.last_activity) + "</div>" +
            "</div>" +
            "<div class='student-summary'>" +
              "<span class='chip'>XP " + Number(s.xp_balance || 0) + "</span>" +
              "<span class='chip'>Events " + Number(s.xp_events || 0) + "</span>" +
              "<span class='chip'>Topics " + Number(s.chapters_covered || s.studied_topics || 0) + "</span>" +
              "<span class='chip'>Purchases " + Number(s.purchases || 0) + "</span>" +
              "<span class='student-expand'>Tap to expand</span>" +
            "</div></button>" +
            "<div class='student-details' hidden><div class='stat-grid'>" +
              "<span class='chip'>XP " + Number(s.xp_balance || 0) + "</span>" +
              "<span class='chip'>Events " + Number(s.xp_events || 0) + "</span>" +
              "<span class='chip'>Topics " + Number(s.chapters_covered || s.studied_topics || 0) + "</span>" +
              "<span class='chip'>Purchases " + Number(s.purchases || 0) + "</span>" +
            "</div>" + studentDetailBlocks(s) + "</div></section>";
        }).join("");

        studentCards.querySelectorAll(".student-toggle").forEach(function (btn) {
          btn.addEventListener("click", function () {
            var details    = btn.nextElementSibling;
            if (!details) return;
            var nextHidden = !details.hidden;
            details.hidden = nextHidden;
            btn.setAttribute("aria-expanded", nextHidden ? "false" : "true");
            var expand = btn.querySelector(".student-expand");
            if (expand) expand.textContent = nextHidden ? "Tap to expand" : "Tap to collapse";
          });
        });

        studentCards.querySelectorAll(".student-menu-toggle").forEach(function (btn) {
          btn.addEventListener("click", function (evt) {
            evt.stopPropagation();
            var wrap  = btn.closest(".menu-wrap");
            var panel = wrap ? wrap.querySelector(".menu-panel") : null;
            if (!panel) return;
            var willOpen = panel.hidden;
            studentCards.querySelectorAll(".menu-panel").forEach(function (p) { p.hidden = true; });
            studentCards.querySelectorAll(".student-menu-toggle").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
            panel.hidden = !willOpen;
            btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
          });
        });

        studentCards.querySelectorAll(".menu-panel").forEach(function (panel) {
          panel.addEventListener("click", function (evt) { evt.stopPropagation(); });
        });

        studentCards.querySelectorAll(".rename-student").forEach(function (btn) {
          btn.addEventListener("click", async function (evt) {
            evt.stopPropagation();
            var studentId   = (btn.dataset.studentId   || "").trim();
            var currentName = (btn.dataset.studentName || "").trim();
            if (!studentId) return;
            var pp = btn.closest(".menu-panel");
            if (pp) pp.hidden = true;
            var nextName = prompt("New display name:", currentName);
            if (!nextName || !nextName.trim()) return;
            var tok = loadToken();
            var p   = (parentCode.value || "").trim();
            if (!tok && p) tok = await sha256Hex(p);
            if (!tok) { status.textContent = "Enter parent access code first."; return; }
            try {
              status.textContent = "Renaming " + studentId + "...";
              var sb2  = window.supabase.createClient(getKeys().url, getKeys().key);
              var res2 = await sb2.rpc("study_parent_update_student_name_token", {
                p_project_code:    (projectCode.value || "study-app").trim(),
                p_parent_token:    tok,
                p_student_id:      studentId,
                p_new_display_name: nextName.trim(),
              });
              if (res2.error) throw res2.error;
              if (!res2.data || !res2.data.ok) { status.textContent = "Rename failed: " + ((res2.data && res2.data.error) || "unknown"); return; }
              status.textContent = "Renamed " + studentId + " to \"" + ((res2.data && res2.data.student_name) || nextName.trim()) + "\".";
              await loadData();
            } catch (e) { status.textContent = "Rename error: " + (e && e.message ? e.message : String(e)); }
          });
        });

        studentCards.querySelectorAll(".delete-student").forEach(function (btn) {
          btn.addEventListener("click", async function (evt) {
            evt.stopPropagation();
            var pp        = btn.closest(".menu-panel");
            if (pp) pp.hidden = true;
            var studentId   = (btn.dataset.studentId   || "").trim();
            var studentName = (btn.dataset.studentName || studentId).trim();
            if (!studentId) return;
            var confirmName = prompt("DELETE IS PERMANENT.\nType this exact current student name to confirm:\n\n" + studentName);
            if (confirmName == null) return;
            var tok = loadToken();
            var p   = (parentCode.value || "").trim();
            if (!tok && p) tok = await sha256Hex(p);
            if (!tok) { status.textContent = "Enter parent access code first."; return; }
            try {
              status.textContent = "Deleting " + studentId + "...";
              var sb3  = window.supabase.createClient(getKeys().url, getKeys().key);
              var res3 = await sb3.rpc("study_parent_delete_student_token", {
                p_project_code: (projectCode.value || "study-app").trim(),
                p_parent_token: tok,
                p_student_id:   studentId,
                p_confirm_name: String(confirmName),
                p_delete_profile: true,
              });
              if (res3.error) throw res3.error;
              if (!res3.data || !res3.data.ok) { status.textContent = "Delete failed: " + ((res3.data && res3.data.error) || "unknown"); return; }
              status.textContent = "Deleted " + studentId + ".";
              await loadData();
            } catch (e) { status.textContent = "Delete error: " + (e && e.message ? e.message : String(e)); }
          });
        });

        if (!window.__parentMenuDocBound) {
          window.__parentMenuDocBound = true;
          document.addEventListener("click", function () {
            studentCards.querySelectorAll(".menu-panel").forEach(function (p) { p.hidden = true; });
            studentCards.querySelectorAll(".student-menu-toggle").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
          });
        }
      }
      status.textContent = "Loaded " + students.length + " student(s). Generated at " + fmt(data.generated_at) + ".";
    } catch (e) {
      status.textContent = "Error: " + (e && e.message ? e.message : String(e));
    }
  }

  btnSetup.onclick   = setupKeys;
  btnRefresh.onclick = loadData;

  var initialToken = loadToken();
  if (initialToken) {
    rememberCode.checked = true;
    loadData();
  } else {
    setTimeout(function () {
      if ((parentCode.value || "").trim()) loadData();
    }, 150);
  }
})();
