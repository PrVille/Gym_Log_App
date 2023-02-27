const router = require("express").Router()
const PlannedSet = require("../models/plannedSet")

router.get("/", async (req, res) => {
  const user = req.user
  const plannedSets = await PlannedSet.find({ user: user._id }).populate("exercise")
  res.json(plannedSets)
})

router.post("/", async (req, res) => {
  const user = req.user

  if (Array.isArray(req.body)) {
    const plannedSets = req.body.map(plannedSet => ({...plannedSet, user: user._id}))
    const inserts = await PlannedSet.insertMany(plannedSets)
    res.json(inserts)
    return
  }

  const newPlannedSet = await PlannedSet.create({ ...req.body, user: user._id })
  res.json(newPlannedSet)
})

router.delete("/:id", async (req, res) => {
  const plannedSetToDelete = await PlannedSet.findById(req.params.id)
  await plannedSetToDelete.remove()
  res.json(plannedSetToDelete)
})

module.exports = router
