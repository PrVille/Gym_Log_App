const router = require("express").Router()
const Exercise = require("../models/exercise")

//Exercise.watch().on("change", (data) => console.log(data))

router.get("/", async (req, res) => {
  if (req.query.fields) {
    const exercisesWithFields = await Exercise.find({}, req.query.fields.split(","))
    //console.log(exercisesWithFields);
    
    res.json(exercisesWithFields)
    return
  }

  const exercises = await Exercise.find({}).populate("sets", ["id", "type", "weight", "reps"])
  //console.log(exercises);
  
  res.json(exercises)
})

router.get("/:id", async (req, res) => {
    const exercise = await Exercise.findById(req.params.id)    
    res.json(exercise)
  
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
