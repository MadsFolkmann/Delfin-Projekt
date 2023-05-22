"use strict"

console.log("Svømmeresultater")

import { prepareSwimmer, getSwimmer } from "./script.js";

console.log("Regnskab");

window.addEventListener("load", start);

let swimmer;

function start() {
  console.log("Velkommen Medlem");

  // Sort U18 //
    document.querySelector("#sort-by-name-u18").addEventListener("click", sortByNameU18);
    document.querySelector("#sort-by-age-u18").addEventListener("click", sortByAgeU18);
    document.querySelector("#sort-by-trainer-u18").addEventListener("click", sortByTrainerU18);
    document.querySelector("#sort-by-disciplin-u18").addEventListener("click", sortByDisciplinU18);
    document.querySelector("#sort-by-training-u18").addEventListener("click", sortByTrainingU18);
    document.querySelector("#sort-by-competetion-u18").addEventListener("click", sortByCompetetionU18);
  // Sort Senior //
   document.querySelector("#sort-by-name-senior").addEventListener("click", sortByNameSenior);
   document.querySelector("#sort-by-age-senior").addEventListener("click", sortByAgeSenior);

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
      <td><button class="update-btn">Update</button></td>
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
      <td><button class="update-btn">Update</button></td>
    </tr>
  `;
  document.querySelector("#senior").insertAdjacentHTML("beforeend", html);
  //   document.querySelector("#members tr:last-child").addEventListener("click", () => membersClicked(member));
}

// ----------------Sort By--------------- //


//U18
function sortByNameU18() {
  swimmer.sort((swimmer1, swimmer2) => swimmer1.name.localeCompare(swimmer2.name));
  displayMembers(swimmer);
}
function sortByAgeU18() {
  swimmer.sort((swimmer1, swimmer2) => swimmer2.age - swimmer1.age);
  displayMembers(swimmer);
}
function sortByTrainerU18() {
  console.log(swimmer)
  swimmer.sort((swimmer1, swimmer2) => swimmer1.trainer.localeCompare(swimmer2.trainer));
  displayMembers(swimmer);
}
function sortByDisciplinU18() {
  swimmer.sort((swimmer1, swimmer2) => swimmer1.disciplin.localeCompare(swimmer2.disciplin));
  displayMembers(swimmer);
}
function sortByTrainingU18() {
  swimmer.sort((swimmer1, swimmer2) => swimmer1.training.localeCompare(swimmer2.training));
  displayMembers(swimmer);
}
function sortByCompetetionU18() {
  swimmer.sort((swimmer1, swimmer2) => swimmer1.competition.localeCompare(swimmer2.competition));
  displayMembers(swimmer);
}

//Senior

function sortByNameSenior() {
  swimmer.sort((swimmer1, swimmer2) => swimmer1.name.localeCompare(swimmer2.name));
  displayMembers(swimmer);
  console.log("senior")
}
function sortByAgeSenior() {
  swimmer.sort((swimmer1, swimmer2) => swimmer2.age - swimmer1.age);
  displayMembers(swimmer);
}