"use strict";

import { getSwimmer, prepareSwimmer, endpoint } from "./script.js";
// const endpoint = "https://svoemmeklubben-delfinen-default-rtdb.europe-west1.firebasedatabase.app/";

window.addEventListener("load", start);

let swimmer;

function start() {
  console.log("Velkommen Medlem");
  updateGrid();

  //Create//
  document.querySelector("#add-swimmer").addEventListener("click", showCreateMember);

  // Sort //
  document.querySelector("#sort-by-name").addEventListener("click", sortByName)
  document.querySelector("#sort-by-age").addEventListener("click", sortByAge)
  document.querySelector("#sort-by-membership").addEventListener("click", sortByMembership)
  document.querySelector("#sort-by-activity").addEventListener("click", sortByActivity)
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

async function createMember(name, age, about, gender, disciplin, trainer, image, membership, activity) {
  const newMember = {
    name: name,
    age: age,
    about: about,
    gender: gender,
    disciplin: disciplin,
    trainer: trainer,
    image: image,
    membership: membership,
    activity: activity,
  };
  const postAsJson = JSON.stringify(newMember);
  const respone = await fetch(`${endpoint}/member.json`, { method: "POST", body: postAsJson });

  return respone;
}

function showCreateMember() {
  const dialog = document.querySelector("#add-member");

  console.log("Create Member Dialog Opened");
  dialog.showModal();

  document.querySelector("#createMember").addEventListener("submit", createMemberClicked);

  dialog.querySelector(".closeButton").addEventListener("click", () => {
    console.log("Create Member Dialog Closed");
    dialog.close();
  });
}

async function createMemberClicked(event) {
  event.preventDefault();

  const form = event.target;

  const name = form.name.value;
  const age = form.age.value;
  const about = form.about.value;
  const gender = form.gender.value;
  const membership = form.membership.value;
  const activity = form.activity.value;
  const disciplin = form.disciplin.value;
  const trainer = form.trainer.value;
  const image = form.image.value;

  const response = await createMember(name, age, about, gender, disciplin, trainer, image, membership, activity);

  if (response.ok) {
    form.reset();
    updateGrid();
    console.log("Succesfully added new member!");
  }
  document.querySelector("#add-member").close();
}


// ------------------ Sorting ------------------- \\

function sortByName() {
  swimmer.sort((swimmer1, swimmer2) => swimmer1.name.localeCompare(swimmer2.name))
  displayMembers(swimmer)
}

function sortByAge() {
  swimmer.sort((swimmer1, swimmer2) => swimmer2.age - swimmer1.age);
  displayMembers(swimmer)
}

function sortByMembership() {
  swimmer.sort((swimmer1, swimmer2) => swimmer1.membership.localeCompare(swimmer2.membership));
  displayMembers(swimmer);
}

function sortByActivity() {
  swimmer.sort((swimmer1, swimmer2) => swimmer1.activity.localeCompare(swimmer2.activity));
  displayMembers(swimmer);
}