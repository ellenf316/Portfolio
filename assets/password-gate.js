(function () {
  var PASSWORD = "writingisengineering";
  var SESSION_KEY = "case-studies-unlocked";

  if (sessionStorage.getItem(SESSION_KEY) === "true") {
    return; // already unlocked this session
  }

  document.documentElement.style.visibility = "hidden";

  window.addEventListener("DOMContentLoaded", function () {
    var overlay = document.createElement("div");
    overlay.style.cssText =
      "position:fixed;inset:0;background:#fff;z-index:99999;display:flex;" +
      "align-items:center;justify-content:center;font-family:sans-serif;";

    overlay.innerHTML =
      '<div style="max-width:320px;width:90%;text-align:center;">' +
      '<p style="margin-bottom:16px;font-size:16px;color:#222;">This case study is password-protected.</p>' +
      '<input id="cs-password-input" type="password" placeholder="Enter password" ' +
      'style="width:100%;padding:10px;font-size:14px;box-sizing:border-box;' +
      'border:1px solid #ccc;border-radius:4px;margin-bottom:10px;" />' +
      '<button id="cs-password-submit" style="width:100%;padding:10px;font-size:14px;' +
      'background:#111;color:#fff;border:none;border-radius:4px;cursor:pointer;">Enter</button>' +
      '<p id="cs-password-error" style="color:#c00;font-size:13px;margin-top:10px;display:none;">Incorrect password, try again.</p>' +
      "</div>";

    document.body.appendChild(overlay);
    document.documentElement.style.visibility = "visible";

    var input = document.getElementById("cs-password-input");
    var button = document.getElementById("cs-password-submit");
    var error = document.getElementById("cs-password-error");

    function tryUnlock() {
      if (input.value === PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, "true");
        overlay.remove();
      } else {
        error.style.display = "block";
        input.value = "";
        input.focus();
      }
    }

    button.addEventListener("click", tryUnlock);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") tryUnlock();
    });

    input.focus();
  });
})();
