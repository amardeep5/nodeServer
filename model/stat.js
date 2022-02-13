const mongoose = require("mongoose");
const validator = require("validator");
const statSchema = new mongoose.Schema({
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },
  bedType: { type: String, enum: ["NORMAL", "OXYGEN", "ICU", "VENTILATOR"] },
  vacant: { type: Number },
  occupied: { type: Number },
  lat: { type: String },
  lon: { type: String },
  updatedAt: { type: String },
  createdAt: { type: Date, default: Date.now },
});
mongoose.model("Stat", statSchema);
