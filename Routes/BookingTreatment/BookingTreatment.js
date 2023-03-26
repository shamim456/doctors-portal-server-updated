// external import
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// internal import
const BookingTreatmentSchema = require("../../Schemas/BookingTreatmentSchema/BookingTreatmentSchema.js");
const BookingTreatment = mongoose.model(
  "booking_treatment",
  BookingTreatmentSchema
);

router.post("/", async (req, res) => {
  try {
    const newBooking = new BookingTreatment(req.body);
    const alreadyBooked = await BookingTreatment.find({
      appoinmentDate: newBooking.appoinmentDate,
      treatmentName: newBooking.treatmentName,
    });

    if (alreadyBooked.length) {
      return res.status(401).json({ error: "fuck You bitch" });
    } else {
      await newBooking.save();
      res.status(200).json({
        result: "Booking Confirmed",
      });
    }
  } catch (err) {
    console.log(err + 'booking treatment route')
    // res.status(500).json({
    //   error: "There Was An Server Side Error",
    // });
  }
});

module.exports = router;
