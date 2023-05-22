"use strict";

window.addEventListener("load", start);
const admin = [
  {
    username: "admin1",
    password: "fjalle",
  },
  {
    username: "admin2",
    password: "origi",
  },
];

function start() {
  console.log("Velkommen til AEMO");
  document.querySelector("#login1").addEventListener("submit", getInfo);
}

/* ------------------login oplysninger---------------------- */

function getInfo() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log(username);
  console.log(password);

  for (let i = 0; i < admin.length; i++) {
    if (username == admin[i].username && password == admin[i].password) {
      console.log(username + " is logged in!");
      window.location.href = "http://127.0.0.1:5500/forside.html";
      return;
    }
  }

  console.log("Forkert brugernavn eller kodeord");
}

/* ------------------error messages---------------------- */

document.getElementById("login").addEventListener("click", function (event) {
  event.preventDefault(); // For at forhindre standardadfærd for klik på knappen

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  if (username === "admin" && password === "password") {
    errorMessage.textContent = "Velkommen admin";
    window.location.href = "forside.html"; // Redirect til forsiden
  } else {
    errorMessage.textContent = "Forkert brugernavn eller kodeord";
  }
});
