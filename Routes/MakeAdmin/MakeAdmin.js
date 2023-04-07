// external import
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// internal import
const usersSchema = require("../../Schemas/usersSchema/usersSchema");
const Users = mongoose.model("user", usersSchema);
const verifyJwt = require("../../Handler/verifyJWT/verifyJwt");
const { ObjectId } = require("mongodb");

// is admin checking route
router.get("/admin/:email", async (req, res) => {
  const email = req.params.email;
  const query = { email };
  const user = await Users.findOne(query);
  res.send({ isAdmin: user?.role === "admin" });
});

// protect with jwt
router.put("/admin/:id", verifyJwt, async (req, res) => {
  const decodedEmail = req?.decoded.email;
  const query = { email: decodedEmail };
  const user = await Users.findOne(query);
  if (user?.role !== "admin") {
    return res.status(403).json({
      error: "forbidden access",
    });
  }

  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedDoc = {
    $set: {
      role: "admin",
    },
  };
  const result = await Users.updateOne(filter, updatedDoc, options);
  res.send(result);
});

module.exports = router;
