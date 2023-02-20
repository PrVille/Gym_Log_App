const router = require("express").Router()
const Routine = require("../models/routine")

//Workout.watch().on("change", (data) => console.log(data))

router.get("/", async (req, res) => {
  const routines = await Routine.find({})
    .populate("weeks.plannedWorkouts")
    .populate({
      path: "weeks.plannedWorkouts",
      populate: {
        path: "plannedExercises.exercise",
      },
    })
    .populate({
      path: "weeks.plannedWorkouts",
      populate: {
        path: "plannedExercises.sets",
      },
    })
  res.json(routines)
})

router.get("/:id", async (req, res) => {
  const routine = await Routine.findById(req.params.id)
    .populate("weeks.plannedWorkouts")
    .populate({
      path: "weeks.plannedWorkouts",
      populate: {
        path: "plannedExercises.exercise",
      },
    })
    .populate({
      path: "weeks.plannedWorkouts",
      populate: {
        path: "plannedExercises.sets",
      },
    })
  res.json(routine)
})

router.post("/", async (req, res) => {
  const newRoutine = await Routine.create(req.body)
  const newPopulatedRoutine = await Routine.findById(newRoutine._id)
    .populate("weeks.plannedWorkouts")
    .populate({
      path: "weeks.plannedWorkouts",
      populate: {
        path: "plannedExercises.exercise",
      },
    })
    .populate({
      path: "weeks.plannedWorkouts",
      populate: {
        path: "plannedExercises.sets",
      },
    })
  res.json(newPopulatedRoutine)
})

router.put("/:id", async (req, res) => {
  const routine = req.body
  const updatedRoutine = await Routine.findByIdAndUpdate(
    req.params.id,
    routine,
    { new: true, runValidators: true, context: "query" }
  )
    .populate("weeks.plannedWorkouts")
    .populate({
      path: "weeks.plannedWorkouts",
      populate: {
        path: "plannedExercises.exercise",
      },
    })
    .populate({
      path: "weeks.plannedWorkouts",
      populate: {
        path: "plannedExercises.sets",
      },
    })
  res.json(updatedRoutine)
})

router.delete("/:id", async (req, res) => {
  const routineToDelete = await Routine.findById(req.params.id)
  await routineToDelete.remove()
  res.json(routineToDelete)
})

module.exports = router
