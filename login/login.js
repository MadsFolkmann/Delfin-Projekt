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

function getInfo() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log(username);
  console.log(password);

  for (let i = 0; i < admin.length; i++) {
    if (username == admin[i].username && password == admin[i].password) {
      console.log(username + " is logged in!");
      window.location.href = "http://127.0.0.1:5500/forside/forside.html";
      return;
    }
  }

  console.log("Incorrect username or password");
}
