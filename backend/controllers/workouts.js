const router = require("express").Router()
const Workout = require("../models/workout")

//Workout.watch().on("change", (data) => console.log(data))

router.get("/", async (req, res) => {
  const workouts = await Workout.find({})
    .populate("exercises.exercise")
    .populate("exercises.sets")
  res.json(workouts)
})

router.get("/:id", async (req, res) => {
  const workout = await Workout.findById(req.params.id)
    .populate("exercises.exercise")
    .populate("exercises.sets")
  res.json(workout)
})

router.post("/", async (req, res) => {
  const newWorkout = await Workout.create(req.body)
  const newPopulatedWorkout = await Workout.findById(newWorkout._id)
    .populate("exercises.exercise")
    .populate("exercises.sets")
  res.json(newPopulatedWorkout)
})

router.put("/:id", async (req, res) => {
  const workout = req.body
  const updatedWorkout = await Workout.findByIdAndUpdate(
    req.params.id,
    workout,
    { new: true, runValidators: true, context: "query" }
  )
    .populate("exercises.exercise")
    .populate("exercises.sets")
  res.json(updatedWorkout)
})

router.delete("/:id", async (req, res) => {
  const workoutToDelete = await Workout.findById(req.params.id)
  await workoutToDelete.remove()
  res.json(workoutToDelete)
})

module.exports = router
