const Station = require("../models/station");
const { io } = require("./socketio/socketioUtil.js");
const EventEmitter = require("node:events");
const stationClearEvant = new EventEmitter();

const moveTo = async (plane, currentStation, targetStation) => {
  try {
    plane.currentLocation = targetStation.stationNumber;

    const updatedCurrentStation = await Station.findOneAndUpdate(
      { _id: currentStation._id },
      { $pull: { plainsInStation: plane._id } },
      { new: true } // Return the updated document
    );

    if (updatedCurrentStation) {
      io.emit(`stationUpdate${updatedCurrentStation._id}`, {
        currentStation: updatedCurrentStation,
      });
      stationClearEvant.emit(
        `station${updatedCurrentStation.stationNumber}Clear`,
        updatedCurrentStation.stationNumber
      );
    }

    targetStation.plainsInStation.push(plane._id);

    const updatedTargetStation = await targetStation.save();

    io.emit(`stationUpdate${updatedTargetStation._id}`, {
      targetStation: updatedTargetStation,
    });
  } catch (error) {
    console.error(`Error in moveTo function:`, error);
  }
};

const askMove = async (targetStation) => {
  if (
    (targetStation.stationNumber === 88) ||
    (targetStation.stationNumber === 99)
  ) {
    return true;
  } else if (targetStation.plainsInStation.length > 0) {
    return false;
  } else {
    return true;
  }
};

const findNextStation = async (plain, currentStation) => {
  try {
    let nextStations =
      plain.direction === "Landing"
        ? currentStation.landingStations
        : currentStation.takeoffStations;

    for (let num of nextStations) {
      const targetStation = await Station.findOne({ stationNumber: num });
      if (await askMove(targetStation)) {
        await moveTo(plain, currentStation, targetStation);
        return true;
      } else {
      }
    }

    return false;
  } catch (error) {
    console.error(
      `Error not finding station with number ${targetStation.stationNumber}:`,
      error
    );

    return false;
  }
};

const moveOneStation = async (plain) => {
  try {
    let currentStation = await Station.findOne({
      stationNumber: plain.currentLocation,
    });

    let moveSuccessful = false;
    while (!moveSuccessful) {
      moveSuccessful = await findNextStation(plain, currentStation);
    
      await randomDelay(1,1)
    }
  } catch (error) {
    console.error("Error in moveOneStation:", error);
  }
};

const makeTakeoffOrLandind = async (plain) => {
  if (!plain) {
    console.log(`makeTakeoffOrLandind - plain is null`);
    return plain;
  }

  while (plain.currentLocation !== (plain.direction === "Landing" ? 88 : 99)) {

    await randomDelay(1,2)
    await moveOneStation(plain);
  }

  if (plain.currentLocation === (plain.direction === "Landing" ? 88 : 99)) {
    console.log(` makeTakeoffOrLandind - plain ${plain.model} finish ${plain.direction} successfully`);
    return plain;
  } else {
    console.log(
      `makeTakeoffOrLandind - plain ${plain.model} finish makeTakeoffOrLandind at station ${plain.currentLocation}`
    );
    return null;
  }
};

 const randomDelay = async(min, max) => {
  const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
  await new Promise((resolve) => setTimeout(resolve, randomInt * 1000));
}

const emitStationUpdate = (station) => {
  io.emit(`stationUpdate${station._id}`, {
    currentStation: station,
  });
}

module.exports = { makeTakeoffOrLandind, stationClearEvant };
