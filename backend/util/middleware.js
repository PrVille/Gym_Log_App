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

module.exports = {
  errorHandler,
}
