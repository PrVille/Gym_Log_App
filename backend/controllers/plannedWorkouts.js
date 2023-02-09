const router = require("express").Router()
const PlannedWorkout = require("../models/plannedWorkout")

//PlannedWorkout.watch().on("change", (data) => console.log(data))

router.get("/", async (req, res) => {
  const plannedWorkouts = await PlannedWorkout.find({})
    .populate("plannedExercises.exercise", ["id", "name"])
    .populate("plannedExercises.sets")

    const tests = JSON.parse(JSON.stringify(plannedWorkouts))
    const test = tests[0]
    //console.log(test);
    const sets = test.plannedExercises.map(e => e.sets)
    //console.log(sets);
    const newSets = sets.map(set => ({
      ...set,
      weight: 50,
    }))
    //console.log(newSets);
    
    
    //console.log(plannedWorkouts)
  res.json(plannedWorkouts)
})

router.get("/:id", async (req, res) => {
  const plannedWorkout = await PlannedWorkout.findById(req.params.id)
  .populate("plannedExercises.exercise", ["id", "name"])
  .populate("plannedExercises.sets")
  res.json(plannedWorkout)
})

router.post("/", async (req, res) => {
  const newPlannedWorkout = await PlannedWorkout.create(req.body)
  res.json(newPlannedWorkout)
})

module.exports = router