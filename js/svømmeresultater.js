"use strict"


import { getCompSwimmer, getResults, getSwimmer, prepareResult, endpoint } from "./script.js";


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

  //Add Time
  document.querySelector("#add-training-competetion").addEventListener("click", showAddTime)

  updateGrid();
  swimmerAddedToSelect();
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
    // console.log(member);
    result.memberObject = member
  }
  // console.log(results.memberObject)
  // console.log(results)
  displayResults(results);
}


//----------------- Showing Swimmers ------------------//



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

  if (result.placement) {
    const html = /*html*/ `
    <tr>
      <td>${result.memberObject.name}</td>
      <td>${result.memberObject.age}</td>
      <td class="trainer">${result.memberObject.trainer}</td>
      <td>${result.memberObject.disciplin}</td>
      <td>${result.time} min</td>
      <td>${result.placement}</td>
      <td><button class="update-btn">Update</button></td>
    </tr>
  `;
    document.querySelector("#u-18").insertAdjacentHTML("beforeend", html);
  } else {
        const html = /*html*/ `
    <tr>
      <td>${result.memberObject.name}</td>
      <td>${result.memberObject.age}</td>
      <td class="trainer">${result.memberObject.trainer}</td>
      <td>${result.memberObject.disciplin}</td>
      <td>${result.time} min</td>
      <td>Trænings Pas</td>
      <td><button class="update-btn">Update</button></td>
    </tr>
  `;
        document.querySelector("#u-18").insertAdjacentHTML("beforeend", html);
  }
}

async function showSeniorMembers(result) {

  if (result.placement) {
    const html = /*html*/ `
    <tr>
      <td>${result.memberObject.name}</td>
      <td>${result.memberObject.age}</td>
      <td class="trainer">${result.memberObject.trainer}</td>
      <td>${result.memberObject.disciplin}</td>
      <td>${result.time} min</td>
      <td>${result.placement}</td>
      <td><button class="update-btn">Update</button></td>
    </tr>
  `;
    document.querySelector("#senior").insertAdjacentHTML("beforeend", html);
  } else {
    const html = /*html*/ `
    <tr>
      <td>${result.memberObject.name}</td>
      <td>${result.memberObject.age}</td>
      <td class="trainer">${result.memberObject.trainer}</td>
      <td>${result.memberObject.disciplin}</td>
      <td>${result.time} min</td>
      <td>Trænings Pas</td>
      <td><button class="update-btn">Update</button></td>
    </tr>
  `;
    document.querySelector("#senior").insertAdjacentHTML("beforeend", html);
  }
}

// ----------------Add training/competetion--------------- //

async function swimmerAddedToSelect() {
  const swimmers = await getSwimmer();
  console.log(swimmers)
  for (const swimmer of swimmers) {
    console.log(swimmer.activity)
    if (swimmer.activity === "konkurrencesvømmer") {
      showSwimmerAddedToSelect(swimmer);
    }
  }
}

function showSwimmerAddedToSelect(swimmer) {
  const html = /*html*/ `
  <option value="${swimmer.id}">${swimmer.name}</option>
  `;

  document.querySelector("#swimmer").insertAdjacentHTML("beforeend", html)
}


function showAddTime() {
  const dialog = document.querySelector("#add-time");

  console.log("Create Member Dialog Opened");
  dialog.showModal();

  document.querySelector("#addTime").addEventListener("submit", addTimeClicked);

  dialog.querySelector("#close-add-btn").addEventListener("click", () => {
    console.log("Create Member Dialog Closed");
    dialog.close();
  });
}

async function addTimeClicked(event) {
  event.preventDefault();

  const form = event.target;

  const date = form.date.value
  const placement = form.placement.value
  const time = form.time.value
  const member = form.swimmer.value

  const response = await addTime(date, placement, time, member)
   if (response.ok) {
     form.reset();
     updateGrid();
     console.log("Tid addet")
  }
  document.querySelector("#add-time").close();
}

async function addTime(date, placement, time, member) {
  const newTime = {
    date: date,
    placement: placement,
    time: time,
    member: member
  };
  const timeAsJson = JSON.stringify(newTime)
  const response = await fetch(`${endpoint}/results.json`, { method: "POST", body: timeAsJson })
  
  return response;
}



// ----------------Sort By--------------- //


//U18
function sortByNameU18() {
  results.sort((swimmer1, swimmer2) => swimmer1.memberObject.name.localeCompare(swimmer2.memberObject.name));
  displayResults(results);
}
function sortByAgeU18() {
  results.sort((swimmer1, swimmer2) => swimmer2.memberObject.age - swimmer1.memberObject.age);
  displayResults(results);
}
function sortByTrainerU18() {
  results.sort((swimmer1, swimmer2) => swimmer1.memberObject.trainer.localeCompare(swimmer2.memberObject.trainer));
  displayResults(results);
}
function sortByDisciplinU18() {
  results.sort((swimmer1, swimmer2) => swimmer1.memberObject.disciplin.localeCompare(swimmer2.memberObject.disciplin));
  displayResults(results);
}
function sortByTrainingU18() {
  results.sort((swimmer1, swimmer2) => swimmer1.time.localeCompare(swimmer2.time));
  displayResults(results);
}
function sortByCompetetionU18() {
  results.sort((swimmer1, swimmer2) => swimmer1.placement.localeCompare(swimmer2.placement));
  displayResults(results);
}

//Senior, virker ikke

function sortByNameSenior() {
  results.sort((swimmer1, swimmer2) => swimmer1.memberObject.name.localeCompare(swimmer2.memberObject.name));
  displayResults(results);
}
function sortByAgeSenior() {
  results.sort((swimmer1, swimmer2) => swimmer2.memberObject.age - swimmer1.memberObject.age);
  displayResults(results);
}
function sortByTrainerSenior() {
  results.sort((swimmer1, swimmer2) => swimmer1.memberObject.trainer.localeCompare(swimmer2.memberObject.trainer));
  displayResults(results);
}
function sortByDisciplinSenior() {
  results.sort((swimmer1, swimmer2) => swimmer1.memberObject.disciplin.localeCompare(swimmer2.memberObject.disciplin));
  displayResults(results);
}
function sortByTrainingSenior() {
  results.sort((swimmer1, swimmer2) => swimmer1.time.localeCompare(swimmer2.time));
  displayResults(results);
}
function sortByCompetetionSenior() {
  results.sort((swimmer1, swimmer2) => swimmer1.placement - swimmer2.placement);
  displayResults(results);
}