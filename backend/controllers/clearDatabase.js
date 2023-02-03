const router = require("express").Router()
const Exercise = require("../models/exercise")
const Set = require("../models/set")
const Workout = require("../models/workout")

/**
 * FOR DEV PURPOSES
 */

router.delete("/exercises", async (req, res) => {
  const deleted = await Exercise.deleteMany()
  res.json(deleted)
})

router.delete("/sets", async (req, res) => {
  //REMOVE REF FROM EXERCISES
  const deleted = await Set.deleteMany()
  res.json(deleted)
})

router.delete("/workouts", async (req, res) => {
  const deleted = await Workout.deleteMany()
  res.json(deleted)
})

module.exports = router
