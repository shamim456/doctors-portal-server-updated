const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const paymentsSchema = mongoose.Schema({
  Price: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  patientEmail: {
    type: String,
    required: true,
  },
  bookingId: {
    type: ObjectId,
    required: true,
  },
  appoinmentDate: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  treatmentName: {
    type: String,
    required: true,
  },
});

module.exports = paymentsSchema;
