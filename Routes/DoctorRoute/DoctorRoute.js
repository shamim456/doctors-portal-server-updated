const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// internal import
const doctorsSchema = require("../../Schemas/DoctorsSchema/DoctorsSchema");
const jwt = require("../../Handler/verifyJWT/verifyJwt");

const availableDoctors = new mongoose.model("All_Doctors", doctorsSchema);

router.post("/", jwt, async (req, res) => {
  try {
    const doctorInfo = new availableDoctors(req.body);
    await doctorInfo.save();
    res.status(200).json({
      result: "Doctor Added Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There Was An Server Side Error",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const allDoctors = await availableDoctors.find({});
    res.status(200).json({
      result: allDoctors,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await availableDoctors.deleteOne({ _id: id });
    res.status(200).json({
      result: "Remove Doctor Successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

module.exports = router;
