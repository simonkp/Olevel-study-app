(function () {
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
  window.SUBJECT_PREVIEW_MODE = params.get("preview") === "1";

  window.__LEVELUP_SUBJECT_SETUP = Promise.resolve()
    .then(function () {
      if (!window.LevelupAuth || typeof window.LevelupAuth.getValidatedUser !== "function") {
        throw new Error("auth_client_missing");
      }
      // Server-validate the session so stale/ghost tokens redirect to landing
      return window.LevelupAuth.getValidatedUser();
    })
    .then(function (user) {
      if (!user) {
        window.location.replace("landing.html");
        throw new Error("redirected_needs_auth");
      }

      window.LEVELUP_STUDENT_ID = user.id;
      window.LEVELUP_STUDENT_NAME = String((user.user_metadata && user.user_metadata.full_name) || user.email || "").trim();

      return window.LevelupAuth.isSubjectEntitled(subjectId).then(function (ok) {
        if (!ok && !window.SUBJECT_PREVIEW_MODE) {
          // Force preview mode if they load the page without preview flag but have no entitlement
          window.location.replace("subject.html?subject=" + encodeURIComponent(subjectId) + "&preview=1");
          throw new Error("redirected_entitlement_required");
        }
        
        // If they have entitlement but the URL had preview=1, just remove it? Or just let it run but they have full access anyway.
        // Actually! the manifest loader will limit topics if SUBJECT_PREVIEW_MODE is true. 
        // If they are entitled, we should disable preview mode to ensure full access.
        if (ok) {
          window.SUBJECT_PREVIEW_MODE = false; 
        }
      });
    });
})();
