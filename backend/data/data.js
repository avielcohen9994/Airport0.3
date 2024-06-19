const Station = require("../models/station.js");
const Plain = require("../models/plain.js");
const {
  plainsListSingelton,
  landingsListSingleton,
  takeoffssListSingleton,
} = require("./singeltons.js");

const landingsList = new landingsListSingleton();
const takeoffsList = new takeoffssListSingleton();
const plainsList = new plainsListSingelton();

const createData = () => {
  createStations();

  console.log("plain created");
};

const createStations = async () => {
  let station = new Station({
    stationNumber: 1,
    takeoffStations: [],
    landingStations: [2],
    plainsInStation: [],
    stationImg:
      "https://png.pngtree.com/png-vector/20220801/ourlarge/pngtree-empty-airport-building-modern-plane-png-image_6056555.png",
  });
  await station.save();

  station = new Station({
    stationNumber: 2,
    takeoffStations: [],
    landingStations: [3],
    plainsInStation: [],
    stationImg:
      "https://png.pngtree.com/png-vector/20220801/ourlarge/pngtree-empty-airport-building-modern-plane-png-image_6056555.png",
  });
  await station.save();

  station = new Station({
    stationNumber: 3,
    takeoffStations: [],
    landingStations: [4],
    plainsInStation: [],
    stationImg:
      "https://png.pngtree.com/png-vector/20220801/ourlarge/pngtree-empty-airport-building-modern-plane-png-image_6056555.png",
  });
  await station.save();

  station = new Station({
    stationNumber: 4,
    takeoffStations: [99],
    landingStations: [5],
    plainsInStation: [],
    stationImg:
      "https://png.pngtree.com/png-vector/20220801/ourlarge/pngtree-empty-airport-building-modern-plane-png-image_6056555.png",
  });
  await station.save();

  station = new Station({
    stationNumber: 5,
    takeoffStations: [],
    landingStations: [6, 7],
    plainsInStation: [],
    stationImg:
      "https://png.pngtree.com/png-vector/20220801/ourlarge/pngtree-empty-airport-building-modern-plane-png-image_6056555.png",
  });
  await station.save();

  station = new Station({
    stationNumber: 6,
    takeoffStations: [8],
    landingStations: [88],
    plainsInStation: [],
    stationImg:
      "https://png.pngtree.com/png-vector/20220801/ourlarge/pngtree-empty-airport-building-modern-plane-png-image_6056555.png",
  });
  await station.save();

  station = new Station({
    stationNumber: 7,
    takeoffStations: [8],
    landingStations: [88],
    plainsInStation: [],
    stationImg:
      "https://png.pngtree.com/png-vector/20220801/ourlarge/pngtree-empty-airport-building-modern-plane-png-image_6056555.png",
  });
  await station.save();

  station = new Station({
    stationNumber: 8,
    takeoffStations: [4],
    landingStations: [],
    plainsInStation: [],
    stationImg:
      "https://png.pngtree.com/png-vector/20220801/ourlarge/pngtree-empty-airport-building-modern-plane-png-image_6056555.png",
  });
  await station.save();

  station = new Station({
    stationNumber: 88,
    takeoffStations: [6, 7],
    landingStations: [],
    plainsInStation: [],
    stationImg:
      "https://png.pngtree.com/png-vector/20220801/ourlarge/pngtree-empty-airport-building-modern-plane-png-image_6056555.png",
  });
  await station.save();

  station = new Station({
    stationNumber: 99,
    takeoffStations: [],
    landingStations: [1],
    plainsInStation: [],
    stationImg:
      "https://png.pngtree.com/png-vector/20220801/ourlarge/pngtree-empty-airport-building-modern-plane-png-image_6056555.png",
  });
  await station.save();
  console.log("stations created");
};

const GetPlainsList = async () => {
  console.log("GetPlainsList");

  if (!plainsList.isEmpty()) {
    console.log("plains already fetched");
    return plainsList;
  } else {
    plainsList.getArray(await Plain.find());

    if (!plainsList.isEmpty()) {
      return plainsList;
    } else {
      for (let i = 1; i < 11; i++) {
        const plain = new Plain({
          model: `airbus ${i}`,
          direction: "Landing",
          currentLocation: 99,
        });
        plainsList.addItem(plain);
        await plain.save();
        console.log(`Plain ${i} saved`);
      }

      return plainsList;
    }
  }
};

module.exports = {
  GetPlainsList,
  plainsList,
  landingsList,
  takeoffsList,
};
