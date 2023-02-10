import { createSlice } from "@reduxjs/toolkit"
import exerciseService from "../../services/exercises"

export const exerciseSlice = createSlice({
  name: "workouts",
  initialState: null,
  reducers: {
    setExercises(state, { payload }) {
      return payload
    },
    addNewExercise(state, { payload }) {
      return state.concat(payload)
    },
  },
})

const { setExercises, addNewExercise } = exerciseSlice.actions

// ACTIONS

export const initializeExercises = () => {
  return async (dispatch) => {
    const exercises = await exerciseService.getAll()
    dispatch(setExercises(exercises))
  }
}

export const createExercise = (exercise) => {
  return async (dispatch) => {
    const newExercise = await exerciseService.create(exercise)
    dispatch(addNewExercise(newExercise)) 
    return newExercise
  }
}

// SELECTORS

// useSelector(selectExercises) === useSelector(state => selectExercises(state))
export const selectExercises = (state) => state.exercises

// useSelector(state => selectExerciseById(state, id))
export const selectExerciseById = (state, id) => {
  return state.exercises.find((exercise) => exercise._id === id)
}

export const selectExercisesWithFields = (state, fields) => {
  return state.exercises.map((exercise) =>
    Object.fromEntries(
      fields
        .filter((field) => field in exercise)
        .map((field) => [field, exercise[field]])
    )
  )
}

export default exerciseSlice.reducer
