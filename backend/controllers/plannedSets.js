const router = require("express").Router()
const PlannedSet = require("../models/plannedSet")

//PlannedSet.watch().on("change", (data) => console.log(data))


router.get("/", async (req, res) => {
  PlannedSet.find({})
    .populate("exercise", ["id", "name"])
})

router.get("/:id", async (req, res) => {
  const set = await PlannedSet.findById(req.params.id)
  res.json(set)
})

router.get("/exercise/:id", async (req, res) => {
  const sets = await PlannedSet.find({ exercise: req.params.id })
  res.json(sets)
})

router.post("/", async (req, res) => {
  const newSet = await PlannedSet.create(req.body)
  res.json(newSet)
})

router.delete("/:id", async (req, res) => {
  const deleted = await PlannedSet.deleteOne({ _id: req.params.id })
  res.json(deleted)
})

module.exports = router
