"use strict";

window.addEventListener("load", start);

function start() {
  console.log("DFS Svømmeklubben");
  togglePassword();
}

function togglePassword() {
  const passwordInput = document.getElementById("password-input");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}
