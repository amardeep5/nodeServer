const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Hospital = mongoose.model("Hospital");
const Patient = mongoose.model("Patient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const { password, email, type } = req.body;
  if (!password || !email) {
    res
      .status(422)
      .json({ error: "Password or Email is missing", done: false });
  } else {
    try {
      let savedUser = undefined;
      if (type === "HOSPITAL") {
        savedUser = await Hospital.findOne({ email });
      } else {
        savedUser = await Patient.findOne({ email });
      }
      if (!savedUser) {
        res
          .status(422)
          .json({ error: "Password or Email is incorrect", done: false });
      } else {
        const passwordMatched = await bcrypt.compare(
          password,
          savedUser.password
        );
        console.log(passwordMatched);
        if (passwordMatched) {
          const token = jwt.sign({ _id: savedUser._id }, jwt_secret);
          const { name, email, _id, phone } = savedUser;
          res.json({
            message: "Signed IN",
            token,
            user: savedUser,
            done: true,
          });
        } else {
          res
            .status(422)
            .json({ error: "Password or Email is incorrect", done: false });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
});

router.post("/signup", async (req, res) => {
  const { name, email, password, phone, type } = req.body;
  if (!email || !password || !name || !phone || !type) {
    res.status(422).json({ error: "Please add all the details", done: false });
  } else {
    try {
      let savedUser = undefined;
      if (type === "HOSPITAL") {
        savedUser = await User.findOne({ email });
      } else {
        savedUser = await User.findOne({ email });
      }
      if (savedUser) {
        res.status(422).json({ error: "User already exists", done: false });
      } else {
        try {
          const hashedPassword = await bcrypt.hash(password, 12);
          if (type === "HOSPITAL") {
            const newUser = await Hospital.create({
              name,
              email,
              password: hashedPassword,
              phone,
            });
            res.json({ message: "User created", user: newUser, done: true });
          } else {
            const newUser = await Patient.create({
              name,
              email,
              password: hashedPassword,
              phone,
              age: req.body.age,
              gender: req.body.gender,
            });
            res.json({ message: "User created", user: newUser, done: true });
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
