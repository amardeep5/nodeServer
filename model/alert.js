const mongoose = require("mongoose");
const validator = require("validator");
const alertSchema = new mongoose.Schema({
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },
  bedType: { type: String, enum: ["NORMAL", "OXYGEN", "ICU", "VENTILATOR"] },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  createdAt: { type: Date, default: Date.now },
});
mongoose.model("Alert", alertSchema);
