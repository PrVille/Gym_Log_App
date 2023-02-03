const mongoose = require("mongoose")

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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
      },
    ],
    sets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PlannedSet",
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model("PlannedWorkout", schema)