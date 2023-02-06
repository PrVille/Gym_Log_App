const router = require("express").Router()
const Exercise = require("../models/exercise")
const Set = require("../models/set")
const PlannedSet = require("../models/plannedSet")
const PlannedWorkout = require("../models/plannedWorkout")

const exercises = require("../data/exercises.json")
const sets = require("../data/sets.json")
const plannedSets = require("../data/plannedSets.json")

/**
 * FOR DEV PURPOSES
 */

router.post("/exercises", async (req, res) => {
  const inserts = await Exercise.insertMany(exercises)
  res.json(inserts)
})

// need to init exercises first
router.post("/sets", async (req, res) => {
  const exercises = await Exercise.find({})

  if (exercises.length > 0) {
    for (let i = 0; i < sets.length; i++) {
      const randomExercise =
        exercises[Math.floor(Math.random() * exercises.length)]
      const newSet = await Set.create({
        ...sets[i],
        exercise: randomExercise.id,
      })
      randomExercise.sets.push(newSet)
      await randomExercise.save()
    }
  }
  res.json({ message: "done" })
})

router.post("/plannedsets", async (req, res) => {
  const exercises = await Exercise.find({})

  if (exercises.length > 0) {
    for (let i = 0; i < plannedSets.length; i++) {
      const randomExercise =
        exercises[Math.floor(Math.random() * exercises.length)]
      const newSet = await PlannedSet.create({
        ...plannedSets[i],
        exercise: randomExercise.id,
      })
    }
  }
  res.json({ message: "done" })
})

router.post("/plannedworkouts", async (req, res) => {
  const exercises = await Exercise.find({})
  const newPlannedWorkout = await PlannedWorkout.create({
    name: "planned workout",
    notes: "great test workout",
    estimatedDuration: 60,
    plannedExercises: [],
  })
  
  if (exercises.length > 0) {
    for (let i = 0; i < 5; i++) {
      const exercise = exercises[i].id
      const sets = []
      for (let j = 0; j < 5; j++) {
        const newPlannedSet = await PlannedSet.create({
          ...plannedSets[Math.floor(Math.random() * plannedSets.length)],
          exercise: exercise
        })
        sets.push(newPlannedSet.id)
      }
      newPlannedWorkout.plannedExercises.push({exercise, sets})
    }
    await newPlannedWorkout.save()
  }
  res.json({ message: "done" })
})



module.exports = router
