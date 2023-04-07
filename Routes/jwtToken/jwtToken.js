const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// internal import
const usersSchema = require("../../Schemas/usersSchema/usersSchema");
const Users = mongoose.model("user", usersSchema);

router.get("/", async (req, res) => {
  try {
    const email = req.query.email;
    const user = await Users.find({ email: email });
    if (user) {
      const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
        expiresIn: "444441h",
      });
      res.status(200).json({
        result: token,
      });
    }
  } catch (err) {
    res.status(403).json({ error: "unauthorized access" });
  }
});

module.exports = router;
