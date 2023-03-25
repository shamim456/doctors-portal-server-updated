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
      const bookingSlot = await BookingTreatment.find({
        slot: newBooking.slot,
      });
      if (bookingSlot.length) {
        return res
          .status(401)
          .json({ error: "You Already booked Appointment this time slot" });
      }
      await newBooking.save();
      res.status(200).json({
        result: "Booking Confirmed",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "There Was An Server Side Error",
    });
  }
});

module.exports = router;
