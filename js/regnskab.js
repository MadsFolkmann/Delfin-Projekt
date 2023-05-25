"use strict";

import { prepareSwimmer, getSwimmer, updateKontigent } from "./script.js";

console.log("Regnskab");

window.addEventListener("load", start);

let swimmer;

function start() {
  console.log("Velkommen Medlem");

  // Update //
  document.querySelector("#form-update-kontigent").addEventListener("submit", updateKontigentClicked);

  // SortBy //
  document.querySelector("#sort-by-name").addEventListener("click", sortByName);
  document.querySelector("#sort-by-membership").addEventListener("click", sortByMembership);
  // Search //
  document.querySelector("#search-input").addEventListener("keyup", inputSearchChanged);
  document.querySelector("#search-input").addEventListener("search", inputSearchChanged);

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
  if (member.membership === "18+") {
    const html = /*html*/ `
      <tr>
        <td>${member.name}</td>
        <td>${member.membership}</td>
        <td>1600,-</td>
        <td ${member.paid}</td>
        <td class="debt">1600,-</td>
        <td> <button class="btn-update">Opdater</button></td>

      </tr>
    `;
    document.querySelector("#members").insertAdjacentHTML("beforeend", html);
  } else if (member.membership === "u18") {
    const html = /*html*/ `
      <tr>
        <td>${member.name}</td>
        <td>${member.membership}</td>
        <td>1000,-</td>
        <td ${member.paid}</td>
        <td class="debt">1000,-</td>
        <td> <button class="btn-update">Opdater</button></td>
      </tr>
    `;
    document.querySelector("#members").insertAdjacentHTML("beforeend", html);
  } else if (member.membership === "pensionist") {
    const html = /*html*/ `
      <tr>
        <td>${member.name}</td>
        <td>${member.membership}</td>
        <td>1200,-</td>
        <td ${member.paid}</td>
        <td class="debt">1200,-</td>
        <td> <button class="btn-update">Opdater</button></td>

      </tr>
    `;
    document.querySelector("#members").insertAdjacentHTML("beforeend", html);
  } else {
    const html = /*html*/ `
      <tr>
        <td>${member.name}</td>
        <td>${member.membership}</td>
        <td>500,-</td>
        <td ${member.paid}</td>
        <td class="debt">500,-</td>
        <td> <button class="btn-update">Opdater</button></td>
      </tr>
      
    `;
    document.querySelector("#members").insertAdjacentHTML("beforeend", html);
  }

  document.querySelector("#members tr:last-child .btn-update").addEventListener("click", (event) => {
    event.stopPropagation();
    updateClicked(member);
  });

  document.querySelector("#members tr:last-child").addEventListener("click", () => kontigentShow(member));
}

// ----------------Search--------------------//

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

function sortByMembership() {
  swimmer.sort((swimmer1, swimmer2) => swimmer1.membership.localeCompare(swimmer2.membership));
  displayMembers(swimmer);
}

// function sortByPayment() {
//   swimmer.sort((swimmer1, swimmer2) => swimmer2.age - swimmer1.age);
//   displayMembers(swimmer)
// }

// function sortByPaid() {
//   swimmer.sort((swimmer1, swimmer2) => swimmer1.activity.localeCompare(swimmer2.activity));
//   displayMembers(swimmer);
// }

// function sortByMissingPayment() {
//   swimmer.sort((swimmer1, swimmer2) => swimmer1.activity.localeCompare(swimmer2.activity));
//   displayMembers(swimmer);
// }
// ------------------ Kontigent show dialog ------------------- \\

function kontigentShow(member) {
  console.log("Kontigent dialog show");
  showKontigentDialog(member);
  document.querySelector("#kontigent-dialog-show").showModal();
}

function showKontigentDialog(member) {
  document.querySelector("#image").src = member.image;
  document.querySelector("#name").textContent = member.name;
  document.querySelector("#gender").textContent = member.gender;
  document.querySelector("#paid").textContent = member.paid;
  document.querySelector("#age").textContent = member.age;
  document.querySelector("#membership").textContent = member.membership;
  document.querySelector("#activity").textContent = member.activity;
  document.querySelector("#disciplin").textContent = member.disciplin;
  document.querySelector("#about").textContent = member.about;
}

// ------------------ Update ------------------- \\
updateKontigent();

function updateClicked(member) {
  console.log("Update Kontigent Button Clicked");
  const updateForm = document.querySelector("#form-update-kontigent");
  const dialog = document.querySelector("#dialog-update-kontigent");

  updateForm.name.value = member.name;
  updateForm.age.value = member.age;
  updateForm.paid.value = member.paid;
  updateForm.about.value = member.about;
  updateForm.gender.value = member.gender;
  updateForm.membership.value = member.membership;
  updateForm.activity.value = member.activity;
  updateForm.disciplin.value = member.disciplin;
  updateForm.trainer.value = member.trainer;
  updateForm.image.value = member.image;

  document.querySelector("#form-update-kontigent").setAttribute("data-id", member.id);
  dialog.showModal();

  dialog.querySelector(".closeButtonKontigent").addEventListener("click", () => {
    dialog.close();
    console.log("Update dialog closed");
  });
}

async function updateKontigentClicked(event) {
  event.preventDefault();
  const form = event.target;
  const id = event.target.getAttribute("data-id");

  const name = form.name.value;
  const age = form.age.value;
  const paid = form.paid.value;
  const about = form.about.value;
  const gender = form.gender.value;
  const membership = form.membership.value;
  const activity = form.activity.value;
  const disciplin = form.disciplin.value;
  const trainer = form.trainer.value;
  const image = form.image.value;

  const response = await updateKontigent(id, name, age, paid, about, gender, membership, activity, disciplin, trainer, image);
  if (response.ok) {
    showUpdateFeedBack("Medlemmets kontigent er blevet opdateret!");
    updateGrid();
    updateKontigent(id, name, membership, paid);
  }
  document.querySelector("#dialog-update-kontigent").close();
}

function showUpdateFeedBack(message) {
  const feedbackElement = document.createElement("div");
  feedbackElement.classList.add("kontigent-feedback");
  feedbackElement.textContent = message;
  document.body.appendChild(feedbackElement);

  setTimeout(() => {
    feedbackElement.classList.add("fade-out");
    setTimeout(() => {
      feedbackElement.remove();
    }, 500);
  }, 2000);
}
