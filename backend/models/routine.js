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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    },
    completedCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Routine", routineSchema)
