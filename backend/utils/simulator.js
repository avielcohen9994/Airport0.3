const { makeTakeoffOrLandind, stationClearEvant } = require("./logic");
const express = require("express");
const router = express.Router();
const Plain = require("../models/plain");
const Station = require("../models/station");
const { io } = require("./socketio/socketioUtil.js");
const { GetPlainsList } = require("../data/data.js");

let { landingsList } = require("../data/data.js");
let { takeoffsList } = require("../data/data.js");
let { plainsList } = require("../data/data.js");

const runSimulator = async () => {
  console.log("run simulator");
  plainsList = await GetPlainsList();
  await registerPlainsToLandingList();
  await invokeLandinsList();
};

const registerPlainsToLandingList = async () => {
  if (plainsList.isEmpty()) {
    console, log(" registerPlainsToLandingList - plains is empty");
  } else {
    let st99 = await Station.findOne({ stationNumber: 99 });

    for (let plain of plainsList.array) {
      plain.direction = "Landing";
      plain.currentLocation = 99;
      landingsList.addItem(plain);
      st99.plainsInStation.push(plain._id);
      plain.save();
    }

    await st99.save();
  }
};

const invokeLandinsList = async () => {
  if (landingsList.isEmpty()) {
    console.log(" invokeLandinsList - landing list is empty");
    return;
  }

  await landFirstPlainAtLandingList();
  
};

const invokeTakeoffList = async () => {

  if (takeoffsList.isEmpty()) {
    console.log("takeoff list is empty");
  }

  await takeoffFirstPlainAtTakeoffList();
  
};

const landFirstPlainAtLandingList = async () => {
  try {

    if (landingsList.isEmpty()) {
      console.log(" landFirstPlainAtLandingList - no airplains on landingsList");
      return;
    }

    const min = 2;
    const max = 3;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    await new Promise((resolve) => setTimeout(resolve, randomInt * 1000));  
    let plain = landingsList.shiftItem();

    if (!plain) {
      console.log(
        " landFirstPlainAtLandingList - in landFirstPlainAtLandingList plain is not resived from landingsList"
      );
      return;
    }

    plain = await makeTakeoffOrLandind(plain);
    
    if (plain) {
      await switchToLandingOrTakeoffList(plain);
    } else {
      console.log(
        "landFirstPlainAtLandingList - plain returned from makeLOrT is null "
      );
      return;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const takeoffFirstPlainAtTakeoffList = async () => {
  try {

    if (takeoffsList.isEmpty()) {
      console.log("no airplains on takeoff list");
      return;
    }
console.log('takeoffFirstPlainAtTakeoffList')
    const min = 15;
    const max = 16;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    await new Promise((resolve) => setTimeout(resolve, randomInt * 1000));  
    let plain = takeoffsList.shiftItem();

    plain = await makeTakeoffOrLandind(plain);

    if (plain) {
      await switchToLandingOrTakeoffList(plain);
    } else {
      console.log(
        "plain returned from makeLOrT is null, in takeoffFirstPlainAtTakeoffList mthode"
      );
      return;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const switchToLandingOrTakeoffList = async (plain) => {
  if (plain.direction === "Landing") {
    plain.direction = "Takeoff";
    await plain.save();

    if (takeoffsList.isEmpty()) {
      takeoffsList.addItem(plain);
      await takeoffFirstPlainAtTakeoffList(plain); 
    } else {
      takeoffsList.addItem(plain);
    }

  } else if (plain.direction === "Takeoff") {
    plain.direction = "Landing";
    await plain.save();

    if (landingsList.isEmpty()) {
      landingsList.addItem(plain);
     await landFirstPlainAtLandingList(plain)
    } else {
      landingsList.addItem(plain);
    }
  }
};

const reset = async () => {
  console.log("reset");

  let stations = await Station.find();

  for (let st of stations) {
    st.plainsInStation = [];
    await st.save();
  }

  let plains = await Plain.find();

  let st99 = await Station.findOne({ stationNumber: 99 });

  for (let plain of plains) {
    plain.currentLocation = 99;
    st99.plainsInStation.push(plain._id);
    await plain.save();
  }
  await st99.save();

  // console.log(`resetPlains ${plains}`);

  // let stations = await Station.find();
  // console.log(stations);

  // let i = 1;
  // for (let st of stations) {
  //   // st.stationNumber = i;
  //   // i = i + 1;
  //   st.plainsInStation = [];
  //   await st.save();
  // }

  // let st88 = await Station.findOne({ stationNumber: 9 });
  // st88.stationNumber = 88;
  // await st88.save();

  // let st99 = await Station.findOne({ stationNumber: 10 });
  // st99.stationNumber = 99;
  // await st99.save();

  console.log("reset complete");
};

const handeleClearStationEvent = async (num) => {
  if (num === 1) {
    await landFirstPlainAtLandingList();
  }

  if (num === 6 || 7) {
    await takeoffFirstPlainAtTakeoffList();
  }
};

stationClearEvant.on(`station1Clear`, (num) => handeleClearStationEvent(num));
stationClearEvant.on(`station6Clear`, (num) => handeleClearStationEvent(num));
stationClearEvant.on(`station7Clear`, (num) => handeleClearStationEvent(num));

module.exports = { runSimulator, reset };
