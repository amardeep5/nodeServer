const axios = require("axios");
const mongoose = require("mongoose");
require("./../model/hospital");
require("./../model/stat");
const Stat = mongoose.model("Stat");

const hospiSort = async (origin, type) => {
  const hosps = await Stat.find({
    bedType: type,
    vacant: { $gt: 0 },
    lat: { $nin: [null, ""] },
    lon: { $nin: [null, ""] },
  }).populate("hospital");

  let destArr = [];
  let jj = 0;
  let prev = 0;
  const resultArr = [];
  for (const hosp of hosps) {
    destArr.push(`${hosp.hospital.lat},${hosp.hospital.lon}`);

    if (jj - prev === 87 || jj >= hosps.length - 1) {
      const dest = destArr.join(";");
      destArr = [];
      const url = `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${origin}&destinations=${dest}&travelMode=driving&key=ArEo1_US2is3CsBH4BevzcBy3OiBWanWanNIh1Hqza9dvhSt2xXbCU7A5VcRfJZO`;

      const resp = await axios.get(url);

      const results = resp.data.resourceSets[0].resources[0].results;
      for (let i in results) {
        const obj = {
          name: "",
          _id: "",
          dist: 0,
          time: 0,
          link: "",
        };
        obj.name = hosps[prev * 1 + i * 1].hospital.name;
        obj._id = hosps[prev * 1 + i * 1].hospital._id;
        obj.link = hosps[prev * 1 + i * 1].hospital.link;
        obj.dist = results[i].travelDistance * 1;
        obj.time = results[i].travelDuration * 1;
        resultArr.push(obj);
      }
      prev = jj * 1 + 1;
    }

    jj = jj + 1;
  }
  resultArr.sort(function (a, b) {
    return a.time - b.time;
  });
  return resultArr;
};

module.exports = {
  hospiSort,
};
