const mongoose = require("mongoose")

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
    plannedWeightType: {
        type: String,
        enum: ["previousWeight", "oneRepMaxPercentage", "plannedWeight"],
        default: "previousWeight",
    },
    plannedWeight: {
      type: Number,
      required: () => { return this.plannedWeightType === "plannedWeight" }
    },
    oneRepMaxPercentage: {
      type: Number,
      required: () => { return this.plannedWeightType === "oneRepMaxPercentage" }
    },
    plannedRepRangeMax: {
      type: Number
    },
    plannedRepRangeMin: {
      type: Number
    },
    plannedReps: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  { timestamps: true }
)



module.exports = mongoose.model("PlannedSet", schema)
