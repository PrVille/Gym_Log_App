const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = require("express").Router()
const User = require("../models/user")
const { initializeExercises } = require("../util/db")

router.get("/", async (req, res) => {
  const users = await User.find({}, {passwordHash: 0})
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
      error: "Username must be unique",
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

router.put("/:id", async (req, res) => {
  const user = req.body  
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    user,
    { new: true, runValidators: true, context: "query" }
  )  
  res.json({message: "Success"})
})

module.exports = router
