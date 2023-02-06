const mongoose = require("mongoose")

const exerciseSchema = new mongoose.Schema({
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
  },
  sets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Set",
    },
  ],
})

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Improvised Workout",
    },
    notes: {
      type: String,
    },
    duration: {
      type: Number,
    },
    exercises: [
      {
        type: exerciseSchema,
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model("Workout", schema)
