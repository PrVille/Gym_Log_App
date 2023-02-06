const mongoose = require("mongoose")

const plannedExerciseSchema = new mongoose.Schema({
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
  },
  sets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlannedSet",
    },
  ],
})

const plannedWorkoutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Improvised Workout",
    },
    notes: {
      type: String,
    },
    estimatedDuration: {
      type: Number,
    },
    plannedExercises: [
      {
        type: plannedExerciseSchema,
      },
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model("PlannedWorkout", plannedWorkoutSchema)
