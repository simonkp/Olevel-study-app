(function () {
  var LAST_SUBJECT_KEY = "LEVELUP_LAST_SUBJECT";
  var state = {
    isSignedIn: false,
    entitlements: {},
    displayName: "",
  };

  // ── Topbar ──────────────────────────────────────────────────────────────────

  function refreshTopbar() {
    var profileSection = document.getElementById("hub-profile-section");
    var avatarEl       = document.getElementById("hub-avatar");
    var nameEl         = document.getElementById("hub-profile-name");
    var signoutBtn     = document.getElementById("btn-signout");
    if (!profileSection) return;

    if (!state.isSignedIn) {
      profileSection.hidden = true;
      return;
    }

    profileSection.hidden = false;
    if (nameEl) nameEl.textContent = state.displayName || "Student";

    if (avatarEl) {
      avatarEl.textContent = (state.displayName || "S").charAt(0).toUpperCase();
    }

    if (signoutBtn && !signoutBtn.__bound) {
      signoutBtn.__bound = true;
      signoutBtn.addEventListener("click", function () {
        if (window.LevelupAuth) {
          window.LevelupAuth.signOut().then(function () {
            window.location.href = "landing.html";
          });
        }
      });
    }
  }

  // ── Subject card access ──────────────────────────────────────────────────────

  function updateSubjectCardsAccess() {
    document.querySelectorAll("a.card[data-subject]").forEach(function (card) {
      var sid     = String(card.getAttribute("data-subject") || "").toLowerCase();
      var allowed = !!state.entitlements[sid];

      // Remove any previously injected badge
      var existing = card.querySelector(".upgrade-badge");
      if (existing) existing.remove();

      if (allowed) {
        card.classList.remove("subject-access-locked");
        card.removeAttribute("aria-disabled");
      } else {
        card.classList.add("subject-access-locked");
        card.setAttribute("aria-disabled", "true");
        var badge = document.createElement("div");
        badge.className = "upgrade-badge";
        badge.textContent = "Upgrade →";
        card.appendChild(badge);
      }
    });
  }

  // ── Card click guard ─────────────────────────────────────────────────────────

  document.querySelectorAll("a.card[data-subject]").forEach(function (card) {
    card.addEventListener("click", function (e) {
      var sid     = String(card.getAttribute("data-subject") || "").toLowerCase();
      var allowed = !!state.entitlements[sid];

      if (!allowed) {
        e.preventDefault();
        // Redirect to preview mode — subject-config.js will handle the locked state
        window.location.href = "subject.html?subject=" + encodeURIComponent(sid) + "&preview=1";
        return;
      }

      if (sid) localStorage.setItem(LAST_SUBJECT_KEY, sid);
    }, true);
  });

  // ── Main auth + entitlement flow ─────────────────────────────────────────────

  async function syncStateFromSession() {
    // 1. Verify LevelupAuth is available
    if (!window.LevelupAuth || typeof window.LevelupAuth.getValidatedUser !== "function") {
      window.location.replace("landing.html");
      return;
    }

    // 2. Server-validate the session (catches ghost/stale tokens from previous sessions)
    var user;
    try {
      user = await window.LevelupAuth.getValidatedUser();
    } catch (e) {
      window.location.replace("landing.html");
      return;
    }

    if (!user) {
      window.location.replace("landing.html");
      return;
    }

    // 3. Populate state and show topbar
    state.isSignedIn = true;
    state.displayName =
      String((user.user_metadata && user.user_metadata.full_name) || "").trim() ||
      String(user.email || "").split("@")[0] ||
      "Student";
    refreshTopbar();

    // 4. Check entitlements for all subjects in parallel; default to false on error
    try {
      var results = await Promise.all([
        window.LevelupAuth.isSubjectEntitled("chemistry").catch(function () { return false; }),
        window.LevelupAuth.isSubjectEntitled("physics").catch(function () { return false; }),
        window.LevelupAuth.isSubjectEntitled("geography").catch(function () { return false; }),
      ]);
      state.entitlements = {
        chemistry: !!results[0],
        physics:   !!results[1],
        geography: !!results[2],
      };
    } catch (e) {
      state.entitlements = { chemistry: false, physics: false, geography: false };
    }

    // 5. Apply lock/unlock to cards (subjects start locked in HTML — we only unlock here)
    updateSubjectCardsAccess();
  }

  // ── Auth state listener (handles OAuth callback and sign-out) ───────────────

  if (window.LevelupAuth && typeof window.LevelupAuth.onAuthStateChange === "function") {
    window.LevelupAuth.onAuthStateChange(function (session) {
      if (!session || !session.user) {
        window.location.replace("landing.html");
      } else {
        // Re-run the full check on auth change
        syncStateFromSession();
      }
    });
  }

  // ── Kick off on load ─────────────────────────────────────────────────────────

  syncStateFromSession();
})();
