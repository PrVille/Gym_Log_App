const router = require("express").Router()
const PlannedSet = require("../models/plannedSet")

PlannedSet.watch().on("change", (data) => console.log(data))

const getWeight = (plannedSet) => {
  switch (plannedSet.plannedWeightType) {
    case "previousWeight":
      // find most recent similiar set
      console.log("previous weight")
      return 100
    case "oneRepMaxPercentage":
      // get % of 1RM
      const oneRepMax = 100
      return (plannedSet.oneRepMaxPercentage / 100) * oneRepMax
    case "plannedWeight":
      // set weight to planned weight
      return plannedSet.plannedWeight
    default:
      console.log("Could not find plannedSet type")
      return 0
  }
}

router.get("/", async (req, res) => {
  PlannedSet.find({})
    .populate("exercise", ["id", "name"])
    .lean()
    .exec((err, sets) => {
      sets = sets.map((set) => {
        set.weight = getWeight(set)
        return set
      })
      res.json(sets)
    })
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
