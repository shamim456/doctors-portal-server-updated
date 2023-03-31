// external import
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// internal import
const availableAppointmentSchema = require("../../Schemas/availableAppointmentSchema/availableAppointmentSchema");
const jwt = require("../../Handler/verifyJWT/verifyJwt");
const availableAppointment = new mongoose.model(
  "Available_Appointment",
  availableAppointmentSchema
);

router.get("/", async (req, res) => {
  try {
    const date = req.query.date;

    const availableOptions = await availableAppointment.aggregate([
      {
        $lookup: {
          from: "booking_treatments",
          localField: "name",
          foreignField: "treatmentName",
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$appoinmentDate", date],
                },
              },
            },
          ],
          as: "booked",
        },
      },
      {
        $project: {
          name: 1,
          slots: 1,
          Price: 1,
          booked: {
            $map: {
              input: "$booked",
              as: "book",
              in: "$$book.slot",
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          Price:1,
          slots: {
            $setDifference: ["$slots", "$booked"],
          },
        },
      },
    ]);

    res.status(200).json({
      result: availableOptions,
    });
  } catch (err) {
    console.log(err + "appoint Option Route");
    // res.status(500).json({
    //   error: "There Was An Server Side Error",
    // });
  }
});

router.get("/Specialty", async (req, res) => {
  try {
    const Specialty = await availableAppointment.aggregate([
      {
        $project: {
          name: 1,
        },
      },
    ]);
    res.status(200).json({
      result: Specialty,
    });
  } catch (err) {
    console.log(err);
  }
});

// temporary use

// router.put("/addPrices", async (req, res) => {
//   try {
//     const filter = {};
//     const options = { upsert: true };
//     const updatedDoc = {
//       $set: {
//         Price: 99,
//       },
//     };
//     const result = await availableAppointment.updateMany(
//       filter,
//       updatedDoc,
//       options
//     );
//     res.send(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error updating prices");
//   }
// });

module.exports = router;
