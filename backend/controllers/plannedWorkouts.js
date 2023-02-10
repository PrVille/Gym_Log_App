const router = require("express").Router()
const PlannedWorkout = require("../models/plannedWorkout")

//PlannedWorkout.watch().on("change", (data) => console.log(data))

router.get("/", async (req, res) => {
  const plannedWorkouts = await PlannedWorkout.find({})
    .populate("plannedExercises.exercise")
    .populate({
      path: 'plannedExercises.exercise',
      populate: { path: 'sets' }
  }) 
    .populate("plannedExercises.sets")
  res.json(plannedWorkouts)
})

router.get("/:id", async (req, res) => {
  const plannedWorkout = await PlannedWorkout.findById(req.params.id)
  .populate("plannedExercises.exercise")
    .populate({
      path: 'plannedExercises.exercise',
      populate: { path: 'sets' }
  }) 
    .populate("plannedExercises.sets")
  res.json(plannedWorkout)
})

router.post("/", async (req, res) => {
  const newPlannedWorkout = await PlannedWorkout.create(req.body)
  const newPopulatedPlannedWorkout = await PlannedWorkout.findById(newPlannedWorkout._id)
  .populate("plannedExercises.exercise")
    .populate({
      path: 'plannedExercises.exercise',
      populate: { path: 'sets' }
  }) 
    .populate("plannedExercises.sets")
  res.json(newPopulatedPlannedWorkout) 
})

module.exports = router