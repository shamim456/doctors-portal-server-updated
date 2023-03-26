const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
});

module.exports = usersSchema;
