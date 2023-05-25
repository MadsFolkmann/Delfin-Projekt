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
      document.querySelector("#sort-by-trainer-senior").addEventListener("click", sortByTrainerSenior);
      document.querySelector("#sort-by-disciplin-senior").addEventListener("click", sortByDisciplinSenior);
      document.querySelector("#sort-by-training-senior").addEventListener("click", sortByTrainingSenior);
      document.querySelector("#sort-by-competetion-senior").addEventListener("click", sortByCompetetionSenior);

  //Add Time
  document.querySelector("#add-training-competetion").addEventListener("click", showAddTime)

  // Update time //
  document.querySelector("#updateTime").addEventListener("submit", updateTimeClicked)

  // Delete //
  document.querySelector("#form-delete-time").addEventListener("submit", deleteTimeClicked)

  //Search//
   document.querySelector("#search-input").addEventListener("keyup", inputSearchChanged);
   document.querySelector("#search-input").addEventListener("search", inputSearchChanged);

  updateGrid();
  swimmerAddedToSelect();
}

getResults();

prepareResult();


async function updateGrid() {
  results = await getResults();
  for (const result of results) {
      const member = await getCompSwimmer(result.member);
    result.memberObject = member
  }
  displayResults(results);
}


//----------------- Showing Swimmers ------------------//



function displayResults(listOfResults) {
    document.querySelector("#u-18").innerHTML = "";
    document.querySelector("#senior").innerHTML = "";
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
      <td><button class="update-btn">Opdater</button>
        <button class="delete-btn">Slet</button></td>
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
      <td><button class="update-btn">Opdater</button>
        <button class="delete-btn">Slet</button></td>
    </tr>
  `;
        document.querySelector("#u-18").insertAdjacentHTML("beforeend", html);
  }

  document.querySelector("#u-18 tr:last-child .update-btn").addEventListener("click", () => updateClicked(result));
  document.querySelector("#u-18 tr:last-child .delete-btn").addEventListener("click", () => deleteClicked(result));

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
      <td><button class="update-btn">Opdater</button>
        <button class="delete-btn">Slet</button></td>
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
      <td><button class="update-btn">Opdater</button>
      <button class="delete-btn">Slet</button></td>
    </tr>
  `;
    document.querySelector("#senior").insertAdjacentHTML("beforeend", html);
  }
  document.querySelector("#senior tr:last-child .update-btn").addEventListener("click", () => updateClicked(result));
  document.querySelector("#senior tr:last-child .delete-btn").addEventListener("click", () => deleteClicked(result));

}

// ----------------Add training/competetion--------------- //

async function swimmerAddedToSelect() {
  const swimmers = await getSwimmer();
  console.log(swimmers)
  for (const swimmer of swimmers) {
    console.log(swimmer.activity)
    if (swimmer.activity === "konkurrencesvømmer") {
      showSwimmerAddedToSelect(swimmer);
      showSwimmerAddedToSelectUpdate(swimmer);
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
     showAddFeedback("Tid er blevet oprettet!");
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

//---Feedback---//

function showAddFeedback(message) {
  const feedbackElement = document.createElement("div");
  feedbackElement.classList.add("create-feedback");
  feedbackElement.textContent = message;
  document.body.appendChild(feedbackElement);

  setTimeout(() => {
    feedbackElement.classList.add("fade-out");
    setTimeout(() => {
      feedbackElement.remove();
    }, 500);
  }, 2000);
}

function showDeleteFeedback(message) {
  const feedbackElement = document.createElement("div");
  feedbackElement.classList.add("delete-feedback");
  feedbackElement.textContent = message;
  document.body.appendChild(feedbackElement);

  setTimeout(() => {
    feedbackElement.classList.add("fade-out");
    setTimeout(() => {
      feedbackElement.remove();
    }, 500);
  }, 2000);
}

// ----------------Update Time--------------- //

function showSwimmerAddedToSelectUpdate(swimmer) {
  const html = /*html*/ `
  <option value="${swimmer.id}">${swimmer.name}</option>
  `;
  document.querySelector("#updateSwimmer").insertAdjacentHTML("beforeend", html);
}


function updateClicked(result) {

  const updateForm = document.querySelector("#updateTime");
  const dialog = document.querySelector("#dialog-update-time");

  updateForm.date.value = result.date
  updateForm.placement.value = result.placement
  updateForm.time.value = result.time
  updateForm.updateSwimmer.value = result.member

  console.log(result.swimmer);
  updateForm.setAttribute("data-id", result.id);
  document.querySelector("#dialog-update-time").showModal();

    dialog.querySelector("#close-update-btn").addEventListener("click", () => {
      dialog.close();
      console.log("Update dialog closed");
    });
  
}

function updateTimeClicked(event) {
  const form = event.target;

  const date = form.date.value;
  const placement = form.placement.value;
  const time = form.time.value;
  const member = form.updateSwimmer.value;

  const id = form.getAttribute("data-id");
  updateTime (id, date, placement, time, member)
}

async function updateTime(id, date, placement, time, member) {
  const timeToUpdate = { date, placement, time, member };
  const json = JSON.stringify(timeToUpdate);

  const response = await fetch(`${endpoint}/results/${id}.json`, { method: "PUT", body: json });

  if (response.ok) {
    console.log("Update succesfuld")    
    updateGrid()
    showAddFeedback("Tid er blevet opdateret!");
  }
}

// ----------------Delete--------------- //

function deleteClicked(result) {
    const dialog = document.querySelector("#dialog-delete-time");

  document.querySelector("#time-swimmer").textContent = `${result.time}, ${result.memberObject.name}`;
  document.querySelector("#form-delete-time").setAttribute("data-id", result.id);
  dialog.showModal();

  dialog.querySelector(".btn-cancel-no").addEventListener("click", () => {
   dialog.close();
  console.log("Update dialog closed");
  });
}

function deleteTimeClicked(event) {
  const id = event.target.getAttribute("data-id");
  deleteTime(id)
}

async function deleteTime(id) {
  const response = await fetch(`${endpoint}/results/${id}.json`, { method: "DELETE" });
  
  if (response.ok) {
    console.log("Time Deleted")
    updateGrid()
    showDeleteFeedback("Tiden er blevet slettet")
  }
}

// ---------- ------Sort By--------------- //


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

//Senior

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

// ----------------------------Search-------------------------------//

function inputSearchChanged(event) {
  const value = event.target.value;
  const membersToShow = searchMembers(value);
  console.log(membersToShow);
  displayResults(membersToShow);
}

function searchMembers(searchValue) {
  searchValue = searchValue.toLowerCase();
  const swimResults = results.filter((result) => result.memberObject.name.toLowerCase().includes(searchValue));
  return swimResults;
}