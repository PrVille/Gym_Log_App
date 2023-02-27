const router = require("express").Router()
const Workout = require("../models/workout")

//Workout.watch().on("change", (data) => console.log(data))

router.get("/", async (req, res) => {
  const user = req.user

  const workouts = await Workout.find({ user: user._id })
    .populate("exercises.exercise")
    .populate("exercises.sets")
  res.json(workouts)
})

router.post("/", async (req, res) => {
  const user = req.user

  const newWorkout = await Workout.create({
    ...req.body,
    user: user._id,
  })
  const newPopulatedWorkout = await Workout.findById(newWorkout._id)
    .populate("exercises.exercise")
    .populate("exercises.sets")
  res.json(newPopulatedWorkout)
})

router.delete("/:id", async (req, res) => {
  const workoutToDelete = await Workout.findById(req.params.id)
  await workoutToDelete.remove()
  res.json(workoutToDelete)
})

module.exports = router
