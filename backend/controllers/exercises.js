const router = require("express").Router()
const Exercise = require("../models/exercise")

Exercise.watch().on("change", (data) => console.log(data))

router.get("/", async (req, res) => {
  const exercises = await Exercise.find({}).populate("sets")  
  res.json(exercises)
})

// useless ??
router.get("/:id", async (req, res) => {
    const exercise = await Exercise.findById(req.params.id).populate("sets")   
    res.json(exercise)
})

router.post("/", async (req, res) => {
  const newExercise = await Exercise.create(req.body)  
  const newPopulatedExercise = await Exercise.findById(newExercise._id).populate("sets")   
  res.json(newPopulatedExercise)
})

router.put("/:id", async (req, res) => {
  const exercise = req.body
  const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, exercise, { new: true, runValidators: true, context: 'query'}).populate("sets") 
  console.log(updatedExercise);
  
  res.json(updatedExercise)
})

router.delete("/:id", async (req, res) => {
  const exerciseToDelete = await Exercise.findById(req.params.id)  
  await exerciseToDelete.remove()
  res.json(exerciseToDelete)
})



module.exports = router
