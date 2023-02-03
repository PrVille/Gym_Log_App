const router = require("express").Router()
const Exercise = require("../models/exercise")

Exercise.watch().on("change", (data) => console.log(data))

router.get("/", async (req, res) => {
  const exercises = await Exercise.find({}).populate("sets", ["id", "type", "weight", "reps"])
  res.json(exercises)
})

router.post("/", async (req, res) => {
  const newExercise = await Exercise.create(req.body)
  res.json(newExercise)
})

router.delete("/:id", async (req, res) => {
  const deleted = await Exercise.deleteOne({ _id: req.params.id })
  res.json(deleted)
})



module.exports = router
