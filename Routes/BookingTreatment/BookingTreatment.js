// external import
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// internal import
const BookingTreatmentSchema = require("../../Schemas/BookingTreatmentSchema/BookingTreatmentSchema.js");
const { ObjectId } = require("mongodb");
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
      return res.status(401).json({ error: "Already Booked This Treatment" });
    } else {
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

router.get("/", async (req, res) => {
  try {
    const date = req.query.date;
    const result = await BookingTreatment.find({ appoinmentDate: date });
    res.status(200).json({
      result: result,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await BookingTreatment.findOne({ _id: new ObjectId(id) });
    res.status(200).json({
      result: result,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

module.exports = router;
