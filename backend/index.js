const express = require("express")
const cors = require("cors")

require("express-async-errors")
const app = express()

const middleware = require("./util/middleware")

const { PORT } = require("./util/config")
const { connectToDatabase } = require("./util/db")

const clearDatabaseRouter = require("./controllers/clearDatabase")

const initializeDatabaseRouter = require("./controllers/initializeDatabase")

const exercisesRouter = require("./controllers/exercises")
const setsRouter = require("./controllers/sets")
const workoutsRouter = require("./controllers/workouts")
const plannedSetsRouter = require("./controllers/plannedSets")
const plannedWorkoutsRouter = require("./controllers/plannedWorkouts")
const routinesRouter = require("./controllers/routines")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")

const userExtractor = middleware.userExtractor

app.use(express.json())
app.use(cors())

app.use("/api/clear", clearDatabaseRouter)

app.use("/api/init", initializeDatabaseRouter)

app.use("/api/exercises", userExtractor, exercisesRouter)
app.use("/api/sets", userExtractor, setsRouter)
app.use("/api/workouts", userExtractor, workoutsRouter)
app.use("/api/plannedsets", userExtractor, plannedSetsRouter)
app.use("/api/plannedworkouts", userExtractor, plannedWorkoutsRouter)
app.use("/api/routines", userExtractor, routinesRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.use(middleware.errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })
}

start()
