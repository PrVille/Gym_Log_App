const express = require("express")
require('express-async-errors')
const app = express()

const middleware = require('./util/middleware')

const { PORT } = require("./util/config")
const { connectToDatabase } = require('./util/db')

const clearDatabaseRouter = require("./controllers/clearDatabase")

const initializeDatabaseRouter = require("./controllers/initializeDatabase")

const exercisesRouter = require("./controllers/exercises")
const setsRouter = require("./controllers/sets")
const workoutsRouter = require("./controllers/workouts")

app.use(express.json())

app.use("/api/clear", clearDatabaseRouter)

app.use("/api/init", initializeDatabaseRouter)

app.use('/api/exercises', exercisesRouter)
app.use('/api/sets', setsRouter)
app.use('/api/workouts', workoutsRouter)

app.use(middleware.errorHandler)

const start = async () => {  
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })
}

start()