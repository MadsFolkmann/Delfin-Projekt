"use strict";

import { getSwimmer, prepareSwimmer, deleteSwimmer, endpoint, updateMember } from "./script.js";
// const endpoint = "https://svoemmeklubben-delfinen-default-rtdb.europe-west1.firebasedatabase.app/";

window.addEventListener("load", start);

let swimmer;

function start() {
  console.log("Velkommen Medlem");
  updateGrid();

  //Create//
  document.querySelector("#add-swimmer").addEventListener("click", showCreateMember);

  //Delete//
  document.querySelector("#form-delete-member").addEventListener("submit", deleteMemberClicked);
  document.querySelector("#form-delete-member").addEventListener("click", deleteMemberClickedNo);

  //Update//
  document.querySelector("#form-update-member").addEventListener("submit", updateMemberClicked);

  // Sort //
  document.querySelector("#sort-by-name").addEventListener("click", sortByName);
  document.querySelector("#sort-by-age").addEventListener("click", sortByAge);
  document.querySelector("#sort-by-membership").addEventListener("click", sortByMembership);
  document.querySelector("#sort-by-activity").addEventListener("click", sortByActivity);

  // search //
  document.querySelector("#search-input").addEventListener("keyup", inputSearchChanged);
  document.querySelector("#search-input").addEventListener("search", inputSearchChanged);
}

// ---------------Swimmers---------------//
getSwimmer();

prepareSwimmer();

async function updateGrid() {
  swimmer = await getSwimmer();
  displayMembers(swimmer);
}

// ------------Display Members------------ //

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
        <td> <button class="btn-update">Opdatere</button></td>
        <td> <button class="btn-delete">Slet</button></td>
    </tr>
  `;

  document.querySelector("#members").insertAdjacentHTML("beforeend", html);

  document.querySelector("#members tr:last-child .btn-update").addEventListener("click", (event) => {
    event.stopPropagation();
    updateClicked(member);
  });

  document.querySelector("#members tr:last-child .btn-delete").addEventListener("click", (event) => {
    event.stopPropagation();
    deleteClicked(member);
  });

  document.querySelector("#members tr:last-child").addEventListener("click", () => membersClicked(member));
}

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

// ------------Create member------------ //

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
    showCreateFeedback("Medlemmet er blevet oprettet!");
    form.reset();
    updateGrid();
    console.log("Succesfully added new member!");
  }
  document.querySelector("#add-member").close();
}

function showCreateFeedback(message) {
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

// ------------Search------------ //

function inputSearchChanged(event) {
  const value = event.target.value;
  const membersToShow = searchMembers(value);
  console.log(membersToShow);
  displayMembers(membersToShow);
}

function searchMembers(searchValue) {
  searchValue = searchValue.toLowerCase();
  const results = swimmer.filter((member) => member.name.toLowerCase().includes(searchValue));
  return results;
}

// ------------------ Sorting ------------------- \\

function sortByName() {
  swimmer.sort((swimmer1, swimmer2) => swimmer1.name.localeCompare(swimmer2.name));
  displayMembers(swimmer);
}

function sortByAge() {
  swimmer.sort((swimmer1, swimmer2) => swimmer2.age - swimmer1.age);
  displayMembers(swimmer);
}

function sortByMembership() {
  swimmer.sort((swimmer1, swimmer2) => swimmer1.membership.localeCompare(swimmer2.membership));
  displayMembers(swimmer);
}

function sortByActivity() {
  swimmer.sort((swimmer1, swimmer2) => swimmer1.activity.localeCompare(swimmer2.activity));
  displayMembers(swimmer);
}

// ------------------ Delete member ------------------- \\

deleteSwimmer();

function deleteClicked(member) {
  console.log("Delete button clicked");
  document.querySelector("#memberName").textContent = `Vil du gerne slette: ${member.name}?`;
  document.querySelector("#form-delete-member").setAttribute("data-id", member.id);
  document.querySelector("#dialog-delete-member").showModal();
}

async function deleteMemberClicked(event) {
  console.log(event);
  const id = event.target.getAttribute("data-id");
  const response = await deleteSwimmer(id);
  if (response.ok) {
    console.log("Member has succesfully been deleted!");
    showDeleteFeedback("Medlemmet er blevet slettet!");
    updateGrid();
  }
  document.querySelector("#dialog-delete-member").close();
}

function deleteMemberClickedNo() {
  console.log("Close delete dialog");
  document.querySelector("#dialog-delete-member").close();
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
    }, 500); // Vent 500ms (varigheden af transitionen) og fjern derefter elementet
  }, 2000); // Vis feedback i 2 sekunder og start derefter fade-out
}
// ------------------ Update member ------------------- \\
updateMember();

function updateClicked(member) {
  console.log("Update Button Clicked");
  const updateForm = document.querySelector("#form-update-member");
  const dialog = document.querySelector("#dialog-update-member");

  updateForm.name.value = member.name;
  updateForm.age.value = member.age;
  updateForm.about.value = member.about;
  updateForm.paid.value = member.paid;
  updateForm.gender.value = member.gender;
  updateForm.membership.value = member.membership;
  updateForm.activity.value = member.activity;
  updateForm.disciplin.value = member.disciplin;
  updateForm.trainer.value = member.trainer;
  updateForm.image.value = member.image;

  document.querySelector("#form-update-member").setAttribute("data-id", member.id);
  dialog.showModal();

  dialog.querySelector(".closeButtonUpdate").addEventListener("click", () => {
    dialog.close();
    console.log("Update dialog closed");
  });
}

async function updateMemberClicked(event) {
  event.preventDefault();
  const form = event.target;
  const id = event.target.getAttribute("data-id");

  const name = form.name.value;
  const age = form.age.value;
  const about = form.about.value;
  const paid = form.paid.value;
  const gender = form.gender.value;
  const membership = form.membership.value;
  const activity = form.activity.value;
  const disciplin = form.disciplin.value;
  const trainer = form.trainer.value;
  const image = form.image.value;

  const response = await updateMember(id, name, age, about, gender, membership, activity, disciplin, trainer, image, paid);
  if (response.ok) {
    showUpdateFeedBack("Medlemmet er blevet opdateret!");
    updateGrid();
    updateMember(id, name, age, about, gender, membership, activity, disciplin, trainer, image, paid);
  }
  document.querySelector("#dialog-update-member").close();
}

function showUpdateFeedBack(message) {
  const feedbackElement = document.createElement("div");
  feedbackElement.classList.add("update-feedback");
  feedbackElement.textContent = message;
  document.body.appendChild(feedbackElement);

  setTimeout(() => {
    feedbackElement.classList.add("fade-out");
    setTimeout(() => {
      feedbackElement.remove();
    }, 500);
  }, 2000);
}
