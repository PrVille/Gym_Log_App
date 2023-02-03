const router = require("express").Router()
const Workout = require("../models/workout")

Workout.watch().on("change", (data) => console.log(data))

router.get("/", async (req, res) => {
  const workouts = await Workout.find({})
    .populate("exercises", ["id", "name"])
    .populate("sets", ["id", "type", "weight", "reps"])
  res.json(workouts)
})

router.get("/:id", async (req, res) => {
  const workout = await Workout.findById(req.params.id)
  res.json(workout)
})

router.post("/", async (req, res) => {
  const newWorkout = await Workout.create(req.body)
  res.json(newWorkout)
})

router.delete("/:id", async (req, res) => {
  const deleted = await Workout.deleteOne({ _id: req.params.id })
  res.json(deleted)
})

module.exports = router
