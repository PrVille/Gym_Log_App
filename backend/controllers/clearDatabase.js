const router = require("express").Router()
const Exercise = require("../models/exercise")
const Set = require("../models/set")
const Workout = require("../models/workout")
const PlannedSet = require("../models/plannedSet")
const PlannedWorkout = require("../models/plannedWorkout")
const Routine = require("../models/routine")

/**
 * FOR DEV PURPOSES
 */

router.delete("/exercises", async (req, res) => { 
  const deleted = await Exercise.deleteMany() 
  res.json(deleted)
})

router.delete("/sets", async (req, res) => {
  const deleted = await Set.deleteMany()
  res.json(deleted)
})

router.delete("/workouts", async (req, res) => {
  const deleted = await Workout.deleteMany()
  res.json(deleted)
})

router.delete("/plannedsets", async (req, res) => {
  const deleted = await PlannedSet.deleteMany()
  res.json(deleted)
})

router.delete("/plannedworkouts", async (req, res) => {
  const deleted = await PlannedWorkout.deleteMany()
  res.json(deleted)
})

router.delete("/routines", async (req, res) => {
  const deleted = await Routine.deleteMany()
  res.json(deleted)
})


module.exports = router
