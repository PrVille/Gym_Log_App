const mongoose = require("mongoose")

const weekSchema = new mongoose.Schema({
  week: {
    type: Number,
    required: true,
  },
  plannedWorkouts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlannedWorkout",
    },
  ],
})

const routineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    notes: {
      type: String,
    },
    weeks: [
      {
        type: weekSchema,
      },
    ],
    active: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Routine", routineSchema)
