"use strict"

import { prepareSwimmer, getSwimmer } from "./script.js";

console.log("Regnskab")

window.addEventListener("load", start);

let swimmer;

function start() {
  console.log("Velkommen Medlem");

  // SortBy //
  document.querySelector("#sort-by-name").addEventListener("click", sortByName)
  document.querySelector("#sort-by-membership").addEventListener("click", sortByMembership)

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
        <td>0,-</td>
        <td class="debt">1600,-</td>
      </tr>
    `;
    document.querySelector("#members").insertAdjacentHTML("beforeend", html);
  } else if (member.membership === "u18") {
        const html = /*html*/ `
      <tr>
        <td>${member.name}</td>
        <td>${member.membership}</td>
        <td>1000,-</td>
        <td>0,-</td>
        <td class="debt">1000,-</td>
      </tr>
    `;
        document.querySelector("#members").insertAdjacentHTML("beforeend", html);
  } else if (member.membership === "pensionist") {
        const html = /*html*/ `
      <tr>
        <td>${member.name}</td>
        <td>${member.membership}</td>
        <td>1200,-</td>
        <td>0,-</td>
        <td class="debt">1200,-</td>
      </tr>
    `;
        document.querySelector("#members").insertAdjacentHTML("beforeend", html);
  } else {
        const html = /*html*/ `
      <tr>
        <td>${member.name}</td>
        <td>${member.membership}</td>
        <td>500,-</td>
        <td>0,-</td>
        <td class="debt">500,-</td>
      </tr>
    `;
        document.querySelector("#members").insertAdjacentHTML("beforeend", html);
  }

//   document.querySelector("#members tr:last-child").addEventListener("click", () => membersClicked(member));
}

// ------------------ Sorting ------------------- \\

function sortByName() {
  swimmer.sort((swimmer1, swimmer2) => swimmer1.name.localeCompare(swimmer2.name))
  displayMembers(swimmer)
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