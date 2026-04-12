(function () {
  if (
    window.LevelupSetupForms &&
    typeof window.LevelupSetupForms.isClientSetupComplete === "function" &&
    !window.LevelupSetupForms.isClientSetupComplete()
  ) {
    window.location.replace("index.html?needsSetup=1");
    return;
  }

  var params = new URLSearchParams(window.location.search);
  var KNOWN_SUBJECTS = ["chemistry", "physics", "geography"];
  var LAST_SUBJECT_KEY = "LEVELUP_LAST_SUBJECT";
  var STUDENT_ID_KEY = "LEVELUP_STUDENT_ID";
  var STUDENT_NAME_KEY = "LEVELUP_STUDENT_NAME";

  function normalizeSubject(value) {
    var n = (value || "").trim().toLowerCase();
    return KNOWN_SUBJECTS.indexOf(n) !== -1 ? n : "";
  }

  function detectSubjectFromPathname() {
    var parts = window.location.pathname
      .split("/")
      .filter(Boolean)
      .map(function (p) {
        return p.toLowerCase();
      });
    for (var i = parts.length - 1; i >= 0; i -= 1) {
      var found = normalizeSubject(parts[i]);
      if (found) return found;
    }
    return "";
  }

  var fromQuery = normalizeSubject(params.get("subject"));
  var fromHash = normalizeSubject(window.location.hash.replace(/^#/, ""));
  var fromPath = detectSubjectFromPathname();
  var fromStorage = normalizeSubject(localStorage.getItem(LAST_SUBJECT_KEY));
  var subjectId = fromQuery || fromHash || fromPath || fromStorage || "chemistry";
  localStorage.setItem(LAST_SUBJECT_KEY, subjectId);

  var titles = {
    chemistry: "O-Level Chemistry",
    physics: "O-Level Physics",
    geography: "O-Level Geography",
  };
  window.SUBJECT_ID = subjectId;
  window.SUBJECT_TITLE = titles[subjectId] || subjectId;
  window.APP_VERSION = window.APP_VERSION || "dev";
  window.SUPABASE_PROJECT_CODE = window.SUPABASE_PROJECT_CODE || "study-app";

  function applyWindowFromStorage() {
    window.LEVELUP_STUDENT_ID =
      window.LEVELUP_STUDENT_ID || localStorage.getItem(STUDENT_ID_KEY) || "";
    window.LEVELUP_STUDENT_NAME =
      window.LEVELUP_STUDENT_NAME || localStorage.getItem(STUDENT_NAME_KEY) || "";
    window.SUPABASE_URL = window.SUPABASE_URL || localStorage.getItem("SUPABASE_URL") || "";
    window.SUPABASE_ANON_KEY =
      window.SUPABASE_ANON_KEY || localStorage.getItem("SUPABASE_ANON_KEY") || "";
  }

  function openSetupPackageThenMaybeReload() {
    if (!window.LevelupSetupForms || typeof window.LevelupSetupForms.openConfigPackageSetup !== "function") {
      console.warn("LevelupSetupForms not loaded (add setup-forms.js before subject-config.js)");
      return;
    }
    window.LevelupSetupForms.openConfigPackageSetup().then(function (r) {
      if (r && r.action === "save") {
        window.alert("Setup package applied. Reloading…");
        window.location.reload();
        return;
      }
      applyWindowFromStorage();
    });
  }

  window.configureSupabaseKeys = openSetupPackageThenMaybeReload;
  window.configureStudentProfile = openSetupPackageThenMaybeReload;

  window.__LEVELUP_SUBJECT_SETUP = Promise.resolve()
    .then(function () {
      applyWindowFromStorage();
    })
    .catch(function () {
      applyWindowFromStorage();
    });
})();
