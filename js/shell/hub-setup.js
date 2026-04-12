(function () {
  var SUPABASE_SKIP_KEY = "SUPABASE_SETUP_SKIPPED_V1";
  var STUDENT_ID_KEY = "LEVELUP_STUDENT_ID";
  var STUDENT_NAME_KEY = "LEVELUP_STUDENT_NAME";
  var LAST_SUBJECT_KEY = "LEVELUP_LAST_SUBJECT";

  function hasSupabaseKeys() {
    return !!(
      (localStorage.getItem("SUPABASE_URL") || "").trim() &&
      (localStorage.getItem("SUPABASE_ANON_KEY") || "").trim()
    );
  }

  function hubSetupComplete() {
    return !!(
      window.LevelupSetupForms &&
      typeof window.LevelupSetupForms.isClientSetupComplete === "function" &&
      window.LevelupSetupForms.isClientSetupComplete()
    );
  }

  /** No Supabase keys yet: mark cloud skipped. Fill missing student fields so the hub can proceed. */
  function applyOfflineDefaults() {
    if (!hasSupabaseKeys()) {
      localStorage.setItem(SUPABASE_SKIP_KEY, "1");
    }
    if (!(localStorage.getItem(STUDENT_ID_KEY) || "").trim()) {
      localStorage.setItem(STUDENT_ID_KEY, "local-device");
    }
    if (!(localStorage.getItem(STUDENT_NAME_KEY) || "").trim()) {
      localStorage.setItem(STUDENT_NAME_KEY, "Student");
    }
    refreshBanner();
  }

  function updateSubjectCardsAccess() {
    var ok = hubSetupComplete();
    document.querySelectorAll("a.card[data-subject]").forEach(function (card) {
      if (ok) {
        card.classList.remove("subject-access-locked");
        card.removeAttribute("aria-disabled");
      } else {
        card.classList.add("subject-access-locked");
        card.setAttribute("aria-disabled", "true");
      }
    });
  }

  function refreshBanner() {
    var idEl = document.getElementById("hub-identity");
    if (idEl) {
      var nm = (localStorage.getItem(STUDENT_NAME_KEY) || "").trim();
      var sid = (localStorage.getItem(STUDENT_ID_KEY) || "").trim();
      if (nm || sid) {
        idEl.textContent = "Signed in as " + (nm || "Student") + (sid ? " · " + sid : "");
        idEl.hidden = false;
      } else {
        idEl.textContent = "";
        idEl.hidden = true;
      }
    }
    var banner = document.getElementById("setup-banner");
    var msg = document.getElementById("setup-msg");
    if (banner && msg) {
      if (hubSetupComplete()) {
        banner.classList.remove("show");
      } else {
        var gaps =
          window.LevelupSetupForms && typeof window.LevelupSetupForms.describeClientSetupGaps === "function"
            ? window.LevelupSetupForms.describeClientSetupGaps()
            : [];
        msg.textContent =
          gaps.length > 0
            ? "Finish setup to unlock subjects: " +
              gaps.join(" · ") +
              ". Use Setup package (fill blanks) or Offline defaults."
            : "Before picking a subject: open Setup package (paste from a parent), or Offline defaults for local-only on this device.";
        banner.classList.add("show");
      }
    }
    updateSubjectCardsAccess();
  }

  window.configureConfigPackage = function () {
    if (!window.LevelupSetupForms || typeof window.LevelupSetupForms.openConfigPackageSetup !== "function") {
      return;
    }
    window.LevelupSetupForms.openConfigPackageSetup().then(function (r) {
      if (r && r.action === "save") {
        refreshBanner();
        if (!hubSetupComplete() && window.LevelupSetupForms.describeClientSetupGaps) {
          var g = window.LevelupSetupForms.describeClientSetupGaps();
          if (g.length) {
            window.alert(
              "Package applied, but subjects stay locked until this is done:\n\n• " +
                g.join("\n• ") +
                "\n\nTip: use Offline defaults on the hub, or edit the JSON and add Supabase + student fields, then Apply again."
            );
          }
        }
      }
    });
  };

  window.configureSupabaseKeys = window.configureConfigPackage;
  window.configureStudentProfile = window.configureConfigPackage;

  var _pkgBtn = document.getElementById("btn-setup-package");
  if (_pkgBtn) _pkgBtn.onclick = window.configureConfigPackage;
  var _offBtn = document.getElementById("btn-offline-defaults");
  if (_offBtn) _offBtn.onclick = applyOfflineDefaults;

  document.querySelectorAll("a.card[data-subject]").forEach(function (card) {
    card.addEventListener(
      "click",
      function (e) {
        if (!hubSetupComplete()) {
          e.preventDefault();
          return;
        }
        var subject = card.getAttribute("data-subject");
        if (subject) localStorage.setItem(LAST_SUBJECT_KEY, subject);
      },
      true
    );
  });

  refreshBanner();
})();
