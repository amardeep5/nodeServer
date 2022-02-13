const mongoose = require("mongoose");
const validator = require("validator");
const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter First name!"],
  },
  link: { type: String },
  lat: { type: String },
  lon: { type: String },
  createdAt: { type: Date, default: Date.now },
});
mongoose.model("Hospital", hospitalSchema);
