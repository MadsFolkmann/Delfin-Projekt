"use strict";


const endpoint = "https://svoemmeklubben-delfinen-default-rtdb.europe-west1.firebasedatabase.app/";
const moreInfoDialog = document.getElementById("more-info-dialog");
const dialogContent = document.getElementById("dialog-content");

window.addEventListener("load", start);

function start() {
  console.log("Forside");
  updateGrid();
}

document.getElementById("resultat-button").addEventListener("click", openResultatDialog);
document.getElementById("medlem-button").addEventListener("click", openMedlemDialog);
document.getElementById("betaling-button").addEventListener("click", openMoreInfoDialog);
document.getElementById("close-dialog").addEventListener("click", closeMoreInfoDialog);

async function openMoreInfoDialog() {
  const betaling = await getBetaling();
  let htmlContent = "";
  betaling.forEach((item) => {
    htmlContent += `<p>${item.name}: ${item.additionalInfo}</p>`;
  });

  dialogContent.innerHTML = htmlContent;
  moreInfoDialog.showModal();
}

async function openMedlemDialog() {
  const medlem = await getMedlem();
  let htmlContent = "";
  medlem.forEach((item) => {
    htmlContent += `<p>${item.name}: ${item.about}: ${item.gender}: ${item.age}: ${item.membership}: ${item.activity}: ${item.disciplin}: ${item.trainer}</p>`;
    htmlContent += `<img src="${item.image}" alt="${item.name}">`;
  });

  dialogContent.innerHTML = htmlContent;
  moreInfoDialog.showModal();
}

async function openResultatDialog() {
  const resultat = await getResultat();
  let htmlContent = "";
  resultat.forEach((item) => {
    htmlContent += `<p>${item.placement}: ${item.time}: ${item.date}</p>`;
  });

  dialogContent.innerHTML = htmlContent;
  moreInfoDialog.showModal();
}

function closeMoreInfoDialog() {
  moreInfoDialog.close();
}

async function getMedlem() {
  const response = await fetch(`${endpoint}/member.json`);
  const data = await response.json();
  const medlem = await prepareGameData(data);
  return medlem;
}

async function getBetaling() {
  const response = await fetch(`${endpoint}/betaling.json`);
  const data = await response.json();
  const betaling = await prepareGameData(data);
  return betaling;
}

async function getResultat() {
  const response = await fetch(`${endpoint}/results.json`);
  const data = await response.json();
  const resultat = await prepareGameData(data);
  return resultat;
}

async function prepareGameData(dataObject) {
  const gameArray = [];
  for (const key in dataObject) {
    const games = dataObject[key];
    games.id = key;
    gameArray.push(games);
  }
  return gameArray;
}
