const router = require("express").Router()
const Set = require("../models/set")
const Exercise = require("../models/exercise")
const Workout = require("../models/workout")
const mongoose = require("mongoose")


//Set.watch().on("change", (data) => console.log(data))

router.get("/", async (req, res) => {
  const sets = await Set.find({}).populate("exercise")  
  res.json(sets)
})

router.get("/:id", async (req, res) => {
  const set = await Set.findById(req.params.id)
  res.json(set)
})

// useless ?
router.get("/exercise/:id", async (req, res) => {
  const sets = await Set.find({ exercise: req.params.id })
  res.json(sets)
})

router.put("/:id", async (req, res) => {
  const set = req.body
  const updatedSet = await Set.findByIdAndUpdate(req.params.id, set, { new: true, runValidators: true, context: 'query'})
  res.json(updatedSet)
})

router.post("/", async (req, res) => {

  if (Array.isArray(req.body)) {
    const sets = req.body    
    const inserts = await Set.insertMany(sets)
    res.json(inserts)
    return  
  }

  const newSet = await Set.create(req.body)
  res.json(newSet)
})

router.delete("/:id", async (req, res) => {
  const setToDelete = await Set.findById(req.params.id)
  await setToDelete.remove()
  res.json(setToDelete)
})

module.exports = router