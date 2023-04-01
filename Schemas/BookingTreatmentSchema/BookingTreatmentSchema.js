const mongoose = require("mongoose");

const BookingTreatmentSchema = mongoose.Schema({
  treatmentName: {
    required: true,
    type: String,
  },
  appoinmentDate: {
    required: true,
    type: String,
  },
  slot: {
    required: true,
    type: String,
  },
  patientName: {
    required: true,
    type: String,
  },
  patientEmail: {
    required: true,
    type: String,
  },
  patientPhoneNumber: {
    required: true,
    type: String,
  },
  Price: {
    type: Number,
  },
  paid: {
    type: Boolean,
  },
});

module.exports = BookingTreatmentSchema;
