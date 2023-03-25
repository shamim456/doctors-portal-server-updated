// external import
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const jwt = require("jsonwebtoken");
// internal import
const usersSchema = require("../../Schemas/usersSchema/usersSchema");
const Users = mongoose.model("user", usersSchema);

router.get("/", async (req, res) => {
  const email = req.query.email;
  const user = await Users.findOne({ email: email });

  if (user) {
    const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({
      result: token,
    });
  }
  res.status(403).json({ error: "unauthorized access" });
});

module.exports = router;
