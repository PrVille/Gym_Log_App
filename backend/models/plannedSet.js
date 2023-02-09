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
    },    
    weightToUse: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

schema.post('find', async function (result) {
  console.log(result);
  for (let i = 0; i < result.length; i++) {
    const doc = result[i]
    //console.log(doc);
    switch (doc.plannedWeightType) {
      case "previousWeight":
        doc.weightToUse = 50
        break;
      case "oneRepMaxPercentage":
        doc.weightToUse = doc.oneRepMaxPercentage * 50 / 100
        break;
      case "plannedWeight":
        doc.weightToUse = doc.plannedWeight
        break;
      default:
        console.log("how are we here");
        break;
    }
    console.log(doc);
    
  }
  return result
});

module.exports = mongoose.model("PlannedSet", schema)
