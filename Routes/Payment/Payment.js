const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { ObjectId } = require("mongodb");
// internal import
const paymentsSchema = require("../../Schemas/PaymentsSchema/PaymentsScheme");
const PaymentsCollection = mongoose.model("payment", paymentsSchema);
const BookingTreatmentSchema = require("../../Schemas/BookingTreatmentSchema/BookingTreatmentSchema.js");
const BookingTreatment = mongoose.model(
  "booking_treatment",
  BookingTreatmentSchema
);

router.post("/create-payment-intent", async (req, res) => {
  const booking = req.body;
  const price = booking.Price;
  const amount = price * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    currency: "usd",
    amount: amount,
    payment_method_types: ["card"],
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

router.post("/payments", async (req, res) => {
  const payment = new PaymentsCollection(req.body);
  const result = await payment.save();
  const id = payment.bookingId;
  const filter = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: {
      paid: true,
      transactionId: payment.transactionId,
    },
  };
  const updatedResult = await BookingTreatment.updateOne(filter, updatedDoc);
  console.log(updatedResult);
  console.log(result);
  res.send(result);
});

//get all payment list
router.get("/", async (req, res) => {
  try {
    const date = req.query.date;
    const result = await PaymentsCollection.find({ appoinmentDate: date });
    res.status(200).json({
      result: result,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
