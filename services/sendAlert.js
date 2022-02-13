const axios = require("axios");
const mongoose = require("mongoose");
require("./../model/alert");
const Alert = mongoose.model("Alert");
require("./../model/stat");
const Stat = mongoose.model("Stat");
const nodemailer = require("nodemailer");

const nodemailerSendgrid = require("nodemailer-sendgrid");

require("dotenv").config();

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
  })
);
const sendEmail = async (to, subject, text) => {
  const msg = { from: process.env.from, to, subject, text };
  await transport.sendMail(msg);
};
const sendAlert = async () => {
  const alerts = await Alert.find({});
  for (const alert of alerts) {
    await Alert.findOneAndDelete(alert);
    const stat = await Stat.findOne({
      hospital: alert.hospital,
      bedType: alert.bedType,
      vacant: { $gt: 0 },
    }).populate("hospital");
    console.log(stat);
    if (stat) {
      sendEmail(
        alert.email,
        `Seat available in ${stat.hospital.name}`,
        `Hi, from CorHelp, your alert details hospital - ${stat.hospital.name}, vacant - ${stat.vacant}, type - ${stat.bedType}`
      );
    }
  }
};

module.exports = {
  sendAlert,
};
