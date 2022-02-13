const mongoose = require("mongoose");
const validator = require("validator");
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter First name!"],
  },
  phone: {
    type: Number,
    required: [true, "Please fill a valid phone number!"],
    minlength: 10,
    maxlength: 10,
  },
  age: { type: Date, required: true },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["MALE", "FEMAMLE"],
  },
  createdAt: { type: Date, default: Date.now },
});
mongoose.model("Patient", patientSchema);
