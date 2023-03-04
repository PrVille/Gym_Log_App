const mongoose = require("mongoose")

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  favouriteGraphs: {
    overall: [
      {
        type: String,
      },
    ],
    targetMuscle: [
      {
        type: String,
      },
    ],
    exercise: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
      },
    ],
  },
  favouriteAchievements: [{ type: String }],
  settings: {
    general: {
      countWarmupSets: {
        type: Boolean,
        default: false,
      },
    },
    statistics: {
      secondaryMuscleWeight: {
        type: Number,
        default: 0.5
      },
      graphLineType: {
        type: String,
        default: "monotoneX"
      }
    },
    home: {
      overview: {
        active: {
          type: Boolean,
          default: true,
        },
        options: {
          workouts: {
            type: Boolean,
            default: true,
          },
          volume: {
            type: Boolean,
            default: true,
          },
          sets: {
            type: Boolean,
            default: true,
          },
          reps: {
            type: Boolean,
            default: true,
          },
          duration: {
            type: Boolean,
            default: true,
          },
        },
      },
      followedRoutine: {
        active: {
          type: Boolean,
          default: true,
        },
      },
      favouriteAchievements: {
        active: {
          type: Boolean,
          default: false,
        },
      },
      favouriteExercises: {
        active: {
          type: Boolean,
          default: true,
        },
        options: {
          oneRepMax: {
            type: Boolean,
            default: true,
          },
          oneRepMaxGoal: {
            type: Boolean,
            default: true,
          },
          volume: {
            type: Boolean,
            default: true,
          },
          sets: {
            type: Boolean,
            default: true,
          },
          reps: {
            type: Boolean,
            default: true,
          },
          weightRecord: {
            type: Boolean,
            default: true,
          },
          volumeRecord: {
            type: Boolean,
            default: true,
          },
        },
      },
      favouriteGraphs: {
        active: {
          type: Boolean,
          default: false,
        },
        options: {
          period: {
            type: Number,
            default: 1,
          },
          grouping: {
            type: String,
            default: "weekly",
          },
          exerciseData: {
            type: String,
            default: "Sets",
          },
          targetMuscleData: {
            type: String,
            default: "Sets",
          },
        },
      },
    },
  },
})

module.exports = mongoose.model("User", schema)
