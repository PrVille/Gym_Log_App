const { DATABASE_URL } = require("./config")
const mongoose = require('mongoose')
const Exercise = require("../models/exercise")
const exercises = require("../data/exercises.json")

const connectToDatabase = async () => {
  mongoose
    .connect(DATABASE_URL)
    .then(() => {
      console.log("connected to MongoDB")
    })
    .catch((error) => {
      console.log("error connection to MongoDB:", error.message)
    })

  return null
}

// used when creating a new user
const initializeExercises = async () => {
    const exercises = await Exercise.find({})

    if (exercises.length < 10) {
        const inserts = await Exercise.insertMany(exercises)
        console.log(inserts)
        return inserts
    }

    console.log("Skipped init exercises");
    
    return null
}

module.exports = { connectToDatabase, initializeExercises }