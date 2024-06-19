const express = require("express");
const { runSimulator } = require("./utils/simulator.js");


const { app, server } = require("./utils/socketio/socketioUtil.js");
const cors = require("cors");
const connectDB = require("./utils/db/connect.js");
require("dotenv").config();

app.use(express.json());
app.use(cors());




const plains = require("./routes/plainsRouter.js");
const stations = require("./routes/stationsRouter.js");
const auth = require("./routes/authRoutes.js");
const landings = require("./routes/landingRouter.js");
const takeoffs = require("./routes/takeoffRouter.js");
const logics = require("./routes/logicRoutes.js");
app.use("/api/v1/plains", plains);
app.use("/api/v1/stations", stations);
app.use("/api/v1/auth", auth);
app.use("/api/v1/landings", landings);
app.use("/api/v1/takeoffs", takeoffs);
app.use("/api/v1/logics", logics);



const port = 5000;

const start = async () => {
  try {
    console.log("server start.");
    await connectDB(process.env.MONGO_URI);
    server.listen(port, console.log("listen on port 5000..."));
  } catch (err) {
    console.log(err);
  }
};
start();

