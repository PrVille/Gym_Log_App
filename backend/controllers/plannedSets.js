const router = require("express").Router()
const PlannedSet = require("../models/plannedSet")

//PlannedSet.watch().on("change", (data) => console.log(data))


router.get("/", async (req, res) => {
  const sets = await PlannedSet.find({})
    .populate("exercise")

  res.json(sets)
})

router.get("/:id", async (req, res) => {
  const set = await PlannedSet.findById(req.params.id)
  res.json(set)
})

router.post("/", async (req, res) => {
  if (Array.isArray(req.body)) {
    const sets = req.body    
    const inserts = await PlannedSet.insertMany(sets)
    res.json(inserts)
    return  
  }

  const newSet = await PlannedSet.create(req.body)
  res.json(newSet)
})

router.delete("/:id", async (req, res) => {
  const plannedSetToDelete = await PlannedSet.findById(req.params.id)
  await plannedSetToDelete.remove()
  res.json(plannedSetToDelete)
})

module.exports = router
