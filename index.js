// external import
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// internal import
const errorHandler = require("./Handler/Error_Handler/errorHandler"); // custome error handler
const notFoundErrorHandler = require("./Handler/Error_Handler/notFoundErrorHandler"); // not found error handler
const appointmentOptionsRouter = require("./Routes/AppointmentOptions/appointmentOptions");
const bookingTreatmentRouter = require("./Routes/BookingTreatment/BookingTreatment");
const myAppointmentRouter = require("./Routes/MyAppointment/MyAppointment");
const allUsersRouter = require("./Routes/allUsers/allUsers");
const jwtRouter = require("./Routes/JWT/jwt");

const port = process.env.PORT || 5000;
const app = express();

// default middleware
app.use(express.json());
app.use(cors());

// database connection with mongoose
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k2z5djk.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

// test route
app.get("/", (req, res) => {
  res.send("hello");
});
// jwt router
app.use("/jwt", jwtRouter);

// appointment Options Router
app.use("/appointmentOptions", appointmentOptionsRouter);

// booking Treatment router
app.use("/bookingTreatment", bookingTreatmentRouter);

// my Appointment router
app.use("/myAppointment", myAppointmentRouter);

// all user route
app.use("/allUsers", allUsersRouter);

// 404 error handler
app.use(notFoundErrorHandler);

// custome error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log("server runnitng");
});

// MGGBf6UQZLW8LAUG

// shamim3691215

// const { MongoClient, ServerApiVersion } = require('mongodb');

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
