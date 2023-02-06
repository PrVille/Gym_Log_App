const router = require("express").Router()
const PlannedWorkout = require("../models/plannedWorkout")

PlannedWorkout.watch().on("change", (data) => console.log(data))

router.get("/", async (req, res) => {
  const workouts = await PlannedWorkout.find({})
    .populate("plannedExercises.exercise", ["id", "name"])
    .populate("plannedExercises.sets")
    
  res.json(workouts)
})

module.exports = router