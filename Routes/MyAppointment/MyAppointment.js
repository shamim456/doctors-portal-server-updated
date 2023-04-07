// external import
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// internal import
const BookingTreatmentSchema = require("../../Schemas/BookingTreatmentSchema/BookingTreatmentSchema.js");
const jwt = require("../../Handler/verifyJWT/verifyJwt");
const BookingTreatment = mongoose.model(
  "booking_treatment",
  BookingTreatmentSchema
);

router.get("/", jwt, async (req, res) => {
  const patientEmailQuery = req.query.email;
  try {
    const myAppointment = await BookingTreatment.find({
      patientEmail: patientEmailQuery,
    });
    res.status(200).json({
      result: myAppointment,
    });
  } catch (err) {
    res.status(500).json({
      error: "There Was An Server Side Error",
    });
  }
});

module.exports = router;
