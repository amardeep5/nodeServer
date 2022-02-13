const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("./../model/alert");
const Alert = mongoose.model("Alert");
// const hospiSort = require("./../services/hospiSort");
router.post("/setAlert", async (req, res) => {
  try {
    const { email, type, hospital } = req.body;
    if (!email || !type || !hospital)
      res.send({ error: "no email or type provided" });
    let x = await Alert.findOne({ email, bedType: type, hospital });
    if (!x) {
      x = await Alert.create({ email, bedType: type, hospital });
    }
    res.send({ data: x });
  } catch (error) {
    res.send({ error: error.message });
  }
});
module.exports = router;
