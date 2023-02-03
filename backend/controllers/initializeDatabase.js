const router = require("express").Router()
const Exercise = require("../models/exercise")
const Set = require("../models/set")

const exercises = require("../data/exercises.json")
const sets = require("../data/sets.json")

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

module.exports = router
