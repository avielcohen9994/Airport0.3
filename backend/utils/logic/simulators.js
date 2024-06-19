const Plain = require("../models/plain");
const Station = require("../models/station");
const { GetPlainsList } = require("../data/data.js");
let { plainsList } = require("../data/data.js");
const { ControlTower } = require("./controlTower.js");

controlTower = new ControlTower();

const runSimulator = async () => {
  console.log("run simulators");
  plainsList = await GetPlainsList();
  await registerPlainsToLandingList();
};

const stopSimulator = async () => {
  controlTower.denyAccess();
};

const registerPlainsToLandingList = async () => {
  plainsList.forEach((plain) => {
    controlTower.requestLandins(plain);
  });
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

module.exports = { runSimulator, reset };
