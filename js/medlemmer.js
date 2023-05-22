"use strict";

import { getSwimmer, prepareSwimmer } from "./script.js";
// const endpoint = "https://svoemmeklubben-delfinen-default-rtdb.europe-west1.firebasedatabase.app/";

window.addEventListener("load", start);

let swimmer;


function start() {
  console.log("Velkommen Medlem");
  updateGrid();
}


// ---------------Swimmers---------------//
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
      <td>${member.age}</td>
      <td>${member.membership}</td>
      <td>${member.activity}</td>
    </tr>
  `;

  document.querySelector("#members").insertAdjacentHTML("beforeend", html);
  document.querySelector("#members tr:last-child").addEventListener("click", () => membersClicked(member));
}

// document.querySelector("#members article:last-child").addEventListener("click", createMemberClickHandler(member));

// function createMemberClickHandler(member) {
//   return function () {
//     membersClicked(member);
//   };
// }

function membersClicked(member) {
  console.log("Member dialog opened");
  showDialogMembers(member);
  document.querySelector("#members-dialog").showModal();
}
function showDialogMembers(member) {
  document.querySelector("#image").src = member.image;
  document.querySelector("#name").textContent = member.name;
  document.querySelector("#gender").textContent = member.gender;
  document.querySelector("#age").textContent = member.age;
  document.querySelector("#membership").textContent = member.membership;
  document.querySelector("#activity").textContent = member.activity;
  document.querySelector("#disciplin").textContent = member.disciplin;
  document.querySelector("#about").textContent = member.about;
}
