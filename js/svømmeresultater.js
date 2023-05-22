"use strict"

console.log("Svømmeresultater")

import { prepareSwimmer, getSwimmer } from "./script.js";

console.log("Regnskab");

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
    document.querySelector("#u-18").innerHTML = "";
    for (const member of listOfMembers) {
      if (member.activity === "konkurrencesvømmer" && member.age < 18) {
          showU18Members(member);
      } else if (member.activity === "konkurrencesvømmer" && member.age > 18) {
      showSeniorMembers(member)
      }
  }
}

function showU18Members(member) {
  console.log("hej");
  const html = /*html*/`
    <tr>
      <td>${member.name}</td>
      <td>${member.age}</td>
      <td>${member.trainer}</td>
      <td>${member.disciplin}</td>
      <td>${member.training}</td>
      <td>${member.competition}</td>
      <td><button class="update-button">Update</button></td>
    </tr>
  `;
  document.querySelector("#u-18").insertAdjacentHTML("beforeend", html);
  //   document.querySelector("#members tr:last-child").addEventListener("click", () => membersClicked(member));
}
function showSeniorMembers(member) {
  console.log("hej");
  const html = /*html*/`
    <tr>
      <td>${member.name}</td>
      <td>${member.age}</td>
      <td>${member.trainer}</td>
      <td>${member.disciplin}</td>
      <td>${member.training}</td>
      <td>${member.competition}</td>
      <td><button class="update-button">Update</button></td>
    </tr>
  `;
  document.querySelector("#senior").insertAdjacentHTML("beforeend", html);
  //   document.querySelector("#members tr:last-child").addEventListener("click", () => membersClicked(member));
}