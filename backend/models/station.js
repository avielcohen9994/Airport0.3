const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
    stationNumber: Number,
    takeoffStations: [Number],
    landingStations: [Number],
    plainsInStation: [mongoose.SchemaTypes.ObjectId],
    stationImg: String
});



module.exports = mongoose.model("Station", stationSchema);