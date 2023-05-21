"use strict";

const endpoint = "https://svoemmeklubben-delfinen-default-rtdb.europe-west1.firebasedatabase.app/";

window.addEventListener("load", start);

let swimmer;

function start() {
  console.log("Velkommen Medlem");
  updateGrid();
}

async function getSwimmer() {
  const response = await fetch(`${endpoint}/member.json`); // fetch request, (GET)
  const data = await response.json(); // parse JSON to JavaScript
  const swimmer = PrepareSwimmer(data);
  return swimmer;
}

async function PrepareSwimmer(member) {
  const swimmerArray = [];
  for (const key in member) {
    const swimmer = member[key];
    swimmer.id = key;
    swimmerArray.push(swimmer);
  }
  return swimmerArray;
}

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
    <article class="member-table">
                  <tr>
                <td> ${member.name}</td>
                <td>${member.age}</td>
                <td>${member.membership}</td>
                <td>${member.activity}</td>
              </tr>
    </article>
  `;

  document.querySelector("#members").insertAdjacentHTML("beforeend", html);
  // document.querySelector("#members article:last-child").addEventListener("click", () => membersClicked(member));
  document.querySelector("#members article:last-child").addEventListener("click", createMemberClickHandler(member));

  function createMemberClickHandler(member) {
    return function () {
      membersClicked(member);
    };
  }
}

function membersClicked(member) {
  console.log("Member dialog opened");
  showDialogMembers(member);
  document.querySelector("#members-dialog").showModal();
}
function showDialogMembers(member) {
  document.querySelector("#image").src = member.image;
  document.querySelector("#name").textContent = member.name;
  document.querySelector("#age").textContent = member.age;
  document.querySelector("#membership").textContent = member.membership;
  document.querySelector("#activity").textContent = member.activity;
}
