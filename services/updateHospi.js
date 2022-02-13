const axios = require("axios");
const mongoose = require("mongoose");
require("./../model/hospital");
require("./../model/stat");
const Hospital = mongoose.model("Hospital");
const Stat = mongoose.model("Stat");

const bedUpdate = async (hosps, type) => {
  for (const hosp of hosps) {
    let hospCreated = await Hospital.findOne({ name: hosp.name });
    if (!hospCreated)
      hospCreated = await Hospital.create({
        name: hosp.name,
        link: hosp.link,
        lat: hosp.lat,
        lon: hosp.lon,
      });
    let hospStat = await Stat.findOne({
      hospital: hospCreated._id,
      bedType: type,
    });
    if (!hospStat)
      hospStat = await Stat.create({
        hospital: hospCreated._id,
        vacant: hosp.vacant,
        occupied: hosp.occupied,
        lat: hosp.lat,
        lon: hosp.lon,
        updatedAt: hosp.updatedAt,
        bedType: type,
      });
    else {
      Object.assign(hospStat, {
        hospital: hospCreated._id,
        vacant: hosp.vacant,
        occupied: hosp.occupied,
        lat: hosp.lat,
        lon: hosp.lon,
        updatedAt: hosp.updatedAt,
        bedType: type,
      });
      await hospStat.save();
    }
  }
};
const updateHospi = async () => {
  let normHosps = await axios({
    method: "get",
    url: "http://127.0.0.1:5000/NORMAL",
  });
  await bedUpdate(normHosps.data, "NORMAL");

  let normHosps1 = await axios({
    method: "get",
    url: "http://127.0.0.1:5000/OXYGEN",
  });
  await bedUpdate(normHosps1.data, "OXYGEN");

  let normHosps2 = await axios({
    method: "get",
    url: "http://127.0.0.1:5000/ICU",
  });
  await bedUpdate(normHosps2.data, "ICU");

  let normHosps3 = await axios({
    method: "get",
    url: "http://127.0.0.1:5000/VENTILATOR",
  });
  await bedUpdate(normHosps3.data, "VENTILATOR");
};

module.exports = {
  updateHospi,
};
