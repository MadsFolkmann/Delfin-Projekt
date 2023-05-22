"use strict"

import { prepareSwimmer, getSwimmer } from "./script.js";

console.log("Regnskab")

window.addEventListener("load", start);

let swimmer;

function start() {
  console.log("Velkommen Medlem");
  updateGrid();
}

getSwimmer();

prepareSwimmer();


async function updateGrid() {
  swimmer = await getSwimmer();
  displayMembers(swimmer);
}

function displayMembers(listOfMembers) {
  document.querySelector("#members").innerHTML = "";
  for (const member of listOfMembers) {
    showMembers(member);
  }
}

function showMembers(member) {
  console.log("hej");
  const html = /*html*/ `
    <tr>
      <td>${member.name}</td>
      <td>${member.membership}</td>
      <td>1000</td>
      <td>1000</td>
      <td>0</td>
    </tr>
  `;

  document.querySelector("#members").insertAdjacentHTML("beforeend", html);
//   document.querySelector("#members tr:last-child").addEventListener("click", () => membersClicked(member));
}