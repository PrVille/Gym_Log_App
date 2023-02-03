const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  instructions: {
    type: String,
  },
  oneRepMax: {
    type: Number
  },
  primaryMuscleGroups: [
    {
      type: String,
    },
  ],
  secondaryMuscleGroups: [
    {
      type: String,
    },
  ],
  primaryMuscles: [
    {
      type: String,
    },
  ],
  secondaryMuscles: [
    {
      type: String,
    },
  ],
  sets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Set",
    },
  ],
})

module.exports = mongoose.model("Exercise", schema)
