const router = require("express").Router()
const Set = require("../models/set")

router.get("/", async (req, res) => {
  const user = req.user
  const sets = await Set.find({ user: user._id })
  res.json(sets)
})

router.post("/", async (req, res) => {
  const user = req.user

  if (Array.isArray(req.body)) {
    const sets = req.body.map(set => ({...set, user: user._id}))
    const inserts = await Set.insertMany(sets)
    res.json(inserts)
    return
  }

  const newSet = await Set.create({ ...req.body, user: user._id })
  res.json(newSet)
})

router.delete("/:id", async (req, res) => {
  const setToDelete = await Set.findById(req.params.id)
  await setToDelete.remove()
  res.json(setToDelete)
})

module.exports = router
