"use strict";

import { prepareSwimmer, getSwimmer } from "./script.js";

console.log("Regnskab");

window.addEventListener("load", start);

let swimmer;

function start() {
  console.log("Velkommen Medlem");

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
  if (member.membership === "18+") {
    const html = /*html*/ `
      <tr>
        <td>${member.name}</td>
        <td>${member.membership}</td>
        <td class="pay">1600,-</td>
        <td class="paid">1600,-</td>
        <td class="debt">0,-</td>
      </tr>
    `;
    document.querySelector("#members").insertAdjacentHTML("beforeend", html);
  } else if (member.membership === "u18") {
    const html = /*html*/ `
      <tr>
        <td>${member.name}</td>
        <td>${member.membership}</td>
        <td class="pay">1000,-</td>
        <td class="paid">1000,-</td>
        <td class="debt">0,-</td>
      </tr>
    `;
    document.querySelector("#members").insertAdjacentHTML("beforeend", html);
  } else if (member.membership === "pensionist") {
    const html = /*html*/ `
      <tr>
        <td>${member.name}</td>
        <td>${member.membership}</td>
        <td class="pay">1200,-</td>
        <td class="paid">1200,-</td>
        <td class="debt">0,-</td>

      </tr>
    `;
    document.querySelector("#members").insertAdjacentHTML("beforeend", html);
  } else {
    const html = /*html*/ `
      <tr>
        <td>${member.name}</td>
        <td>${member.membership}</td>
        <td class="pay">500,-</td>
        <td class="paid">500,-</td>
        <td class="debt">0,-</td>
      </tr>
      
    `;
    document.querySelector("#members").insertAdjacentHTML("beforeend", html);
  }


  document.querySelector("#members tr:last-child").addEventListener("click", () => kontigentShow(member));
  updateTotalPay();
}

// ----------------Calculate pay--------------------//

function calculateTotalPay() {
  let totalPay = 0;
  const payElements = document.querySelectorAll("#members tr .pay");
  payElements.forEach((element) => {
    const pay = parseFloat(element.textContent.replace(/[^0-9.-]+/g, ""));
    totalPay += pay;
  });

  return totalPay.toFixed(2);
}

function updateTotalPay() {
  const totalPayCell = document.getElementById("total-pay");
  const totalPay = calculateTotalPay();
  const formattedTotalPay = "Kontingent betaling i alt" + " " + totalPay.toLocaleString("en") + ",-";
  totalPayCell.textContent = formattedTotalPay;
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
  document.querySelector("#age").textContent = member.age;
  document.querySelector("#membership").textContent = member.membership;
  document.querySelector("#activity").textContent = member.activity;
  document.querySelector("#disciplin").textContent = member.disciplin;
  document.querySelector("#about").textContent = member.about;
}

