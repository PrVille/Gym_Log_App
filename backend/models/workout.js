const mongoose = require("mongoose")
const Set = require("./set")

const exerciseSchema = new mongoose.Schema({
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
  },
  sets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Set",
    },
  ],
})

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Improvised Workout",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    notes: {
      type: String,
    },
    duration: {
      type: Number,
    },
    exercises: [
      {
        type: exerciseSchema,
      },
    ],
  },
  { timestamps: true }
)

schema.pre('remove', async function(next) {
  const doc = JSON.parse(JSON.stringify(this))
  console.log("Removing workout", doc.name);
  
  for (let i = 0; i < doc.exercises.length; i++) {
    const exercise = doc.exercises[i]    
    for (let j = 0; j < exercise.sets.length; j++) {
      const setToDelete = await Set.findById(exercise.sets[j])      
      await setToDelete.remove()
    }    
  }
  next()
});

module.exports = mongoose.model("Workout", schema)
