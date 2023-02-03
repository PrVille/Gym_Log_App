const mongoose = require("mongoose")

const schema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["work", "warmup"],
      required: true,
    },
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
    weightType: {
        type: String,
        enum: ["log", "rm", "weight"],
        default: "log",
    },
    weight: {
      type: Number,
      default: 0,
    },
    reps: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("PlannedSet", schema)
