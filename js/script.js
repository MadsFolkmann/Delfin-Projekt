"use strict";

export { getSwimmer, prepareSwimmer, endpoint, getResults, prepareResult, getCompSwimmer };

// window.addEventListener("load", start);

const endpoint = "https://svoemmeklubben-delfinen-default-rtdb.europe-west1.firebasedatabase.app/";

// function start() {
//   console.log("hello normal");
// }


async function getSwimmer() {
  const response = await fetch(`${endpoint}/member.json`); // fetch request, (GET)
  const data = await response.json(); // parse JSON to JavaScript
  const swimmer = prepareSwimmer(data);
  return swimmer;
}

async function prepareSwimmer(member) {
  const swimmerArray = [];
  for (const key in member) {
    const swimmer = member[key];
    swimmer.id = key;
    swimmerArray.push(swimmer);
  }
  return swimmerArray;
}

async function getResults() {
  const response = await fetch(`${endpoint}/results.json`); // fetch request, (GET)
  const data = await response.json(); // parse JSON to JavaScript
  const result = prepareResult(data);
  
  return result;
}

async function prepareResult(results) {
  const resultsArray = [];
  for (const key in results) {
    const result = results[key];
    result.id = key;
    resultsArray.push(result);
  }
  return resultsArray;
}


async function getCompSwimmer(uid) {
  console.log(uid)

  const response = await fetch(`${endpoint}/member/${uid}.json`);
  const result = await response.json();
  return result;
}



// async function getResults(uid) {
//   const response = await fetch(`${endpoint}/results/${uid}.json`);
//   const result = await response.json();
//   console.log(result);
//   return result;
// }
// async function getTraining(uid) {
//   const response = await fetch(`${endpoint}/results/${uid}.json`);
//   const result = await response.json();
//   console.log(result);
//   return result;
// }

