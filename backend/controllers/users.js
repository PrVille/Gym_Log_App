const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = require("express").Router()
const User = require("../models/user")
const Routine = require("../models/routine")
const Workout = require("../models/workout")
const Exercise = require("../models/exercise")
const PlannedWorkout = require("../models/plannedWorkout")
const PlannedSet = require("../models/plannedSet")
const Set = require("../models/set")

const { initializeExercises } = require("../util/db")
const middleware = require("../util/middleware")
const userExtractor = middleware.userExtractor

router.get("/", async (req, res) => {
  const users = await User.find({}, { passwordHash: 0 })
  res.json(users)
})

router.post("/", async (req, res) => {
  const { username, name, password } = req.body

  if (!password || password.length < 3) {
    return res.status(400).json({
      error: "Invalid password",
    })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({
      error: "Username already exists!",
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = await User.create({
    username,
    name,
    passwordHash,
  })
  const createdUser = await User.findById(newUser._id, { passwordHash: 0 })
  await initializeExercises(createdUser)
  res.json(createdUser)
})

router.put("/:id", userExtractor, async (req, res) => {
  const user = req.body
  await User.findByIdAndUpdate(req.params.id, user, {
    new: true,
    runValidators: true,
    context: "query",
  })
  res.json({ message: "Success" })
})

router.delete("/:id", userExtractor, async (req, res) => {
  const userToDelete = await User.findById(req.params.id)

  await Set.deleteMany({ user: userToDelete._id })
  await Exercise.deleteMany({ user: userToDelete._id })
  await Workout.deleteMany({ user: userToDelete._id })
  await PlannedSet.deleteMany({ user: userToDelete._id })
  await PlannedWorkout.deleteMany({ user: userToDelete._id })
  await Routine.deleteMany({ user: userToDelete._id })
  
  await userToDelete.remove()
  res.json({ message: "Success" })
})

module.exports = router
