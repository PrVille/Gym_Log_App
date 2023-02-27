const jwt = require("jsonwebtoken")
const User = require("../models/user")

const errorHandler = (error, request, response, next) => {
  if (error.name === "MongoServerError") {
    return response.status(400).send({ error: error.message })
  } else if (error.name === "MongoBulkWriteError") {
    return response.status(400).send({ error: error.message })
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message })
  }

  console.log("-----ERROR HANDLER-----\n", error.message, "\n-----END-----")

  next(error)
}

const userExtractor = async (request, response, next) => {
  const authorization = request.get("authorization")

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const decodedToken = jwt.verify(
        authorization.substring(7),
        process.env.SECRET
      )
      if (decodedToken) {
        request.user = await User.findById(decodedToken.id, { passwordHash: 0 })
      }
    } catch (error) {
      return response.status(401).json({ error: "Token expired" })
    }
  }

  next()
}

module.exports = {
  errorHandler,
  userExtractor,
}
