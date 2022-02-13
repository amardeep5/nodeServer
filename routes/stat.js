const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const hospiSort = require("./../services/hospiSort");
router.post("/hospiSorted", async (req, res) => {
  try {
    const { origin, type } = req.body;
    if (!origin || !type) res.send({ error: "no origin or type provided" });
    const x = await hospiSort.hospiSort(origin, type);
    res.send({ data: x });
  } catch (error) {
    res.send({ error: error.message });
  }
});
module.exports = router;
