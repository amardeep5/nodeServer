const express = require("express");
const app = express();
const cron = require("node-cron");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const { updateHospi } = require("./services/updateHospi");
const { sendAlert } = require("./services/sendAlert");
require("./model/hospital");
require("./model/stat");

app.use(cors());
app.use(express.json());
app.use(require("./routes/stat"));

app.use(require("./routes/alert"));

// cron.schedule("*/30 * * * *", function () {
//   updateHospi();
// });

cron.schedule("*/30 * * * * *", function () {
  sendAlert();
});

mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});
mongoose.connection.on("err", () => {
  console.log("error while connecting", err);
});
app.listen("5000", () => {
  console.log("server running at port 5000");
});
