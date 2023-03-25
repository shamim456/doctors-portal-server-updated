// external import
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// internal import
const usersSchema = require("../../Schemas/usersSchema/usersSchema");
const Users = mongoose.model("user", usersSchema);

router.post("/", async (req, res) => {
  try {
    const newUser = new Users(req.body);
    res.status(200).json({
      result: "Account Created Successfully",
    });
    await newUser.save();
  } catch (err) {
    res.status(500).json({
      error: "There Was An Server Side Error",
    });
  }
});

module.exports = router;
