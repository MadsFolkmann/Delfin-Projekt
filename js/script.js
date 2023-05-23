"use strict";

export { getSwimmer, prepareSwimmer, deleteSwimmer, updateMember, endpoint };

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

async function deleteSwimmer(id) {
  const response = await fetch(`${endpoint}/member/${id}.json`, {
    method: "DELETE",
  });
  return response;
}

async function updateMember(id, name, age, about, gender, membership, activity, disciplin, trainer, image) {
  const updatedMember = {
    name: name,
    age: age,
    about: about,
    gender: gender,
    membership: membership,
    activity: activity,
    disciplin: disciplin,
    trainer: trainer,
    image: image,
  };

  const json = JSON.stringify(updatedMember);
  const response = await fetch(`${endpoint}/member/${id}.json`, { method: "PUT", body: json });

  return response;
}
