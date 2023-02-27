const mongoose = require("mongoose")
const Exercise = require("./exercise")

const schema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["work", "warmup"],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
      required: true,
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



module.exports = mongoose.model("Set", schema)
