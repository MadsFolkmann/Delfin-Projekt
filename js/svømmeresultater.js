"use strict"


import { getCompSwimmer, getResults, prepareResult } from "./script.js";


window.addEventListener("load", start);

let swimmer;
let results;

function start() {

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

getResults();

prepareResult();

// async function updateGrid() {
//   swimmer = await getSwimmer();
//   displayMembers(swimmer);
// }
async function updateGrid() {
  results = await getResults();
  for (const result of results) {
      const member = await getCompSwimmer(result.member);
    console.log(member);
    result.memberObject = member
  }
  console.log(results.memberObject)
  displayResults(results);
}


//----------------- Showing Swimmers ------------------//

// function displayMembers(listOfMembers) {
//     document.querySelector("#u-18").innerHTML = "";
//     for (const member of listOfMembers) {
//       if (member.activity === "konkurrencesvømmer" && member.age < 18) {
//           showU18Members(member);
//       } else if (member.activity === "konkurrencesvømmer" && member.age > 18) {
//       showSeniorMembers(member)
//       }
//   }
// }
function displayResults(listOfResults) {
    document.querySelector("#u-18").innerHTML = "";
    for (const result of listOfResults) {
      if (result.memberObject.activity === "konkurrencesvømmer" && result.memberObject.age < 18) {
        showU18Members(result);
      } else if (result.memberObject.activity === "konkurrencesvømmer" && result.memberObject.age > 18) {
        showSeniorMembers(result);
      }
    }
}



async function showU18Members(result) {

  const html = /*html*/ `
    <tr>
      <td>${result.memberObject.name}</td>
      <td>${result.memberObject.age}</td>
      <td>${result.memberObject.trainer}</td>
      <td>${result.memberObject.disciplin}</td>
      <td>${result.time}</td>
      <td>${result.placement}</td>
      <td><button class="update-btn">Update</button></td>
    </tr>
  `;
  document.querySelector("#u-18").insertAdjacentHTML("beforeend", html);
  //   document.querySelector("#members tr:last-child").addEventListener("click", () => membersClicked(member));
}

async function showSeniorMembers(result) {

  const html = /*html*/ `
    <tr>
      <td>${result.memberObject.name}</td>
      <td>${result.memberObject.age}</td>
      <td>${result.memberObject.trainer}</td>
      <td>${result.memberObject.disciplin}</td>
      <td>${result.time}</td>
      <td>${result.placement}</td>
      <td><button class="update-btn">Update</button></td>
    </tr>
  `;
  document.querySelector("#senior").insertAdjacentHTML("beforeend", html);
  //   document.querySelector("#members tr:last-child").addEventListener("click", () => membersClicked(member));
}


// async function getResults(uid) {
//   const response = await fetch(`${endpoint}/results/${uid}.json`);
//   const result = await response.json();
//   console.log(result)
//   return result;
// }


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
}
function sortByAgeSenior() {
  swimmer.sort((swimmer1, swimmer2) => swimmer2.age - swimmer1.age);
  displayMembers(swimmer);
}