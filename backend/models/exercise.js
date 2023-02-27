const mongoose = require("mongoose")
const Set = require("./set")
const PlannedSet = require("./plannedSet")
const Workout = require("./workout")
const PlannedWorkout = require("./plannedWorkout")

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  instructions: {
    type: String,
  },
  oneRepMax: {
    type: Number,
    default: 0,
  },
  oneRepMaxGoal: {
    type: Number,
    default: 0,
  },
  favourite: {
    type: Boolean,
    default: false,
  },
  primaryMuscles: [
    {
      type: String,
    },
  ],
  secondaryMuscles: [
    {
      type: String,
    },
  ],
  sets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Set",
    },
  ],
})

schema.pre("remove", async function (next) {
  const doc = JSON.parse(JSON.stringify(this))
  console.log("Removing exercise", doc.name)

  await Set.deleteMany({ exercise: doc._id })
  await Workout.updateMany(
    { "exercises.exercise": doc._id },
    {
      $pull: {
        exercises: { exercise: doc._id },
      },
    }
  )

  await PlannedSet.deleteMany({ exercise: doc._id })
  await PlannedWorkout.updateMany(
    { "plannedExercises.exercise": doc._id },
    {
      $pull: {
        plannedExercises: { exercise: doc._id },
      },
    }
  )

  next()
})

module.exports = mongoose.model("Exercise", schema)
