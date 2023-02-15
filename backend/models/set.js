const mongoose = require("mongoose")
const Exercise = require("./exercise")

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

schema.post('remove', (doc) => {
  console.log("removed set", doc._id);
});

module.exports = mongoose.model("Set", schema)
