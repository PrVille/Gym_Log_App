const mongoose = require("mongoose")
const PlannedSet = require("./plannedSet")

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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
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
    ],
  },
  { timestamps: true }
)

plannedWorkoutSchema.pre("remove", async function (next) {
  const doc = JSON.parse(JSON.stringify(this))
  console.log("Removing planned workout", doc)

  for (let i = 0; i < doc.plannedExercises.length; i++) {
    const exercise = doc.plannedExercises[i]
    for (let j = 0; j < exercise.sets.length; j++) {
      console.log(exercise.sets[j])

      const plannedSetToDelete = await PlannedSet.findById(exercise.sets[j])
      await plannedSetToDelete.remove()
    }
  }
  next()
})

module.exports = mongoose.model("PlannedWorkout", plannedWorkoutSchema)
