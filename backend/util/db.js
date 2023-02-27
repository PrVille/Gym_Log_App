const { DATABASE_URL } = require("./config")
const mongoose = require("mongoose")
const Exercise = require("../models/exercise")

const connectToDatabase = async () => {
  mongoose
    .connect(DATABASE_URL)
    .then(() => {
      console.log("connected to MongoDB")
    })
    .catch((error) => {
      console.log("error connection to MongoDB:", error.message)
    })

  return null
}

const initializeExercises = async (user) => {
  const exercises = [
    {
      name: "Conventional Deadlift",
      user: user._id,
      instructions:
        "Set up close to the barbell with your feet set wide, and your feet pointing outwards. Set your grip on the barbell, gripping inside of your knees with straight arms. Set your hips to a comfortable height and push your knees outwards to align with your foot angle. Brace your back by depressing and retracting your scapula, and brace your core after breathing in. Push with your legs while maintaining your torso angle to lift the bar, staying braced and finish the lift by pushing your hips through and flexing the glutes to stand up straight.",
      primaryMuscles: ["gluteals", "quadriceps", "lats", "traps", "hamstrings"],
      secondaryMuscles: ["abs"],
    },
    {
      name: "Sumo Deadlift",
      user: user._id,
      instructions:
        "Set up with your shins approximately an inch away from the barbell, at a width slightly narrower than shoulder width apart. Your feet should be pointing straight forwards or very slightly outwards. Grip the bar outside of your knees with straight arms. Set your hips to a comfortable height and push your knees outwards. Brace your back by depressing and retracting your scapula, and brace your core after breathing in. Push with your legs while maintaining your torso angle to lift the bar, staying braced and finish the lift by pushing your hips through and flexing the glutes to stand up straight.",
      primaryMuscles: ["gluteals", "quadriceps", "lats", "traps"],
      secondaryMuscles: ["abs", "hamstrings"],
    },
    {
      name: "Bench Press",
      user: user._id,
      instructions:
      "Set your feet at a stable position and lie on a flat bench with the racked bar above your face. Place your hands slightly wider than shoulder width on the bar, ensuring the grip is even on both sides and the width is comfortable. Leverage yourself against the bar to retract and depress your scapula, and push with your legs to reinforce your lower back arch. Unrack the bar and bring it forward over your chest with straight arms. Lower the bar in a controlled manner until it touches your lower chest before pressing it back to its starting position, all while maintaining the same scapula position and lower back arch.",
      primaryMuscles: ["pectoralis", "triceps"],
      secondaryMuscles: ["deltoids"],
    },
    {
      name: "Squat",
      user: user._id,
      instructions:
      "Set up in front of a racked barbell at shoulder height. Grip the bar evenly on the barbell outside of shoulder width. Step underneath the bar and place it on top of your trapezius across the top of your shoulders, ensuring that it is stable. Stand up with the bar to unrack it and step backwards to clear the rack. Set your feet at a comfortable width and angle, usually at shoulder width with toes pointed out slightly. Take a deep breath and brace your core. Squat down by bending at the hips and knees to a comfortable depth, allowing your torso to lean forwards slighty. Aim for your thighs to be parallel or beneath parallel to the floor. Stand back up with the weight to the starting position by extending the hips and knees until your torso angle and legs are straight.",
      primaryMuscles: ["quadriceps", "gluteals"],
      secondaryMuscles: ["hamstrings", "abs"],
    },
    {
      name: "Bent Over Barbell Row",
      user: user._id,
      instructions:
      "Set your feet and shoulder width apart, and grip the barbell at a comfortable width outside of your knees. Brace your core and lift the bar slightly off the ground with straight arms and a straight back. Row the barbell towards your body by driving your elbows up, maintaining the same back angle, making contact with your stomach then returning the bar to its original position slightly above the ground.",
      primaryMuscles: ["lats", "traps"],
      secondaryMuscles: ["biceps", "deltoids"],
    },
  ]

  await Exercise.insertMany(exercises)
}

module.exports = { connectToDatabase, initializeExercises }
