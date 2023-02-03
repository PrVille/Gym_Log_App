const router = require("express").Router()
const Set = require("../models/set")
const Exercise = require("../models/exercise")
const Workout = require("../models/workout")


Set.watch().on("change", (data) => console.log(data))

router.get("/", async (req, res) => {
  const sets = await Set.find({}).populate("exercise", ["id", "name"])
  res.json(sets)
})

router.get("/:id", async (req, res) => {
  const set = await Set.findById(req.params.id)
  res.json(set)
})

router.get("/exercise/:id", async (req, res) => {
  const sets = await Set.find({ exercise: req.params.id })
  res.json(sets)
})

router.post("/", async (req, res) => {
  const exercise = await Exercise.findById(req.body.exercise)
  const newSet = await Set.create(req.body)
  exercise.sets.push(newSet.id)
  await exercise.save()

  if (req.body.workout) {
    const workout = await Workout.findById(req.body.workout)
    workout.sets.push(newSet.id)
    await workout.save()
  }
  
  res.json(newSet)
})

router.delete("/:id", async (req, res) => {
  const deleted = await Set.deleteOne({ _id: req.params.id })
  res.json(deleted)
})

module.exports = router
