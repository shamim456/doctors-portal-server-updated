const mongoose = require("mongoose");

const availableAppointmentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slots: {
    type: Array,
    required: true,
  },
});

module.exports = availableAppointmentSchema;
