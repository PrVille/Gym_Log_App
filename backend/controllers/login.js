const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const router = require("express").Router()
const User = require("../models/user")

router.post("/", async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "Invalid username or password",
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 365,
  })

  res.json({
    token,
    username: user.username,
    name: user.name,
    _id: user._id,
    settings: user.settings,
    favouriteGraphs: user.favouriteGraphs,
    favouriteAchievements: user.favouriteAchievements
  })
})

module.exports = router
