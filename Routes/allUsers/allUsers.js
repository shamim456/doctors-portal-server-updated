// external imports
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// internal imports
const usersSchema = require("../../Schemas/usersSchema/usersSchema");
const Users = mongoose.model("user", usersSchema);
const verifyJwt = require("../../Handler/verifyJWT/verifyJwt");
const { ObjectId } = require("mongodb");

router.post("/", async (req, res) => {
  try {
    const newUser = new Users(req.body);
    await newUser.save();
    res.status(200).json({
      result: "Account Created Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There Was An Server Side Error",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const allUser = await Users.find({});
    res.status(200).json({
      result: allUser,
    });
  } catch (err) {
    res.status(500).json({
      error: "There Was An Server Side Error",
    });
  }
});

// make admin route
router.put("/users/admin/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const options = { upsert: true };
  const updatedDoc = {
    $set: {
      role: "admin",
    },
  };
  const result = await Users.updateOne(filter, updatedDoc, options);
  res.send(result);
});

// delete user
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Users.deleteOne({ _id: id });
    res.status(200).json({
      result: "Remove User Successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

module.exports = router;
