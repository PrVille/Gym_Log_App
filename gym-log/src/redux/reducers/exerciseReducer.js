import { createSlice } from "@reduxjs/toolkit"
import exerciseService from "../../services/exercises"

export const exerciseSlice = createSlice({
  name: "exercises",
  initialState: null,
  reducers: {
    setExercises(state, { payload }) {
      return payload
    },
    addNewExercise(state, { payload }) {
      return state.concat(payload)
    },
    updateOneExercise(state, { payload }) {
      return state.map((exercise) =>
        exercise._id === payload._id ? payload : exercise
      )
    },
    removeExercise(state, { payload }) {
      return state.filter((exercise) => exercise._id !== payload)
    },
  },
})

const { setExercises, addNewExercise, updateOneExercise, removeExercise } =
  exerciseSlice.actions

// ACTIONS

export const initializeExercises = () => {
  return async (dispatch) => {
    const exercises = await exerciseService.getAll()
    setTimeout(() => {
      dispatch(setExercises(exercises))
    }, 0)
  }
}

export const refetchExercises = () => initializeExercises()

export const createExercise = (exercise) => {
  return async (dispatch) => {
    const newExercise = await exerciseService.create(exercise)
    dispatch(addNewExercise(newExercise))
    return newExercise
  }
}

export const updateExercise = (exerciseToUpdate) => {
  return async (dispatch) => {   
    const updatedExercise = await exerciseService.update(
      exerciseToUpdate._id,
      exerciseToUpdate
    )
    dispatch(updateOneExercise(updatedExercise))
    return updatedExercise
  }
}

export const deleteExercise = (id) => {
  return async (dispatch) => {
    const deletedExercise = await exerciseService.remove(id)
    dispatch(removeExercise(id))
    return deletedExercise
  }
}

// SELECTORS

export const selectExercises = (state) => state.exercises

export const selectFavouriteExercises = (state) => {
  return state.exercises.filter((e) => e.favourite)
}

export const selectExerciseById = (state, id) => {
  return state.exercises.find((exercise) => exercise._id === id)
}

export const selectExercisesByQuery = (state, query) => {
  return state.exercises.filter((e) =>
    e.name.toLowerCase().includes(query.toLowerCase())
  )
}

export const selectExercisesSortedByName = (state, order) => {
  switch (order) {
    case "asc":
      return [...state.exercises].sort((a, b) => (a.name > b.name ? 1 : -1))
    case "desc":
      return [...state.exercises].sort((a, b) => (a.name < b.name ? 1 : -1))
    default:
      return [...state.exercises]
  }
}

export const selectExercisesByPrimaryMuscle = (state, muscle) => {
  return state.exercises.filter((e) =>
    e.primaryMuscles.includes(muscle.toLowerCase())
  )
}

export const selectExercisesBySecondaryMuscle = (state, muscle) => {
  return state.exercises.filter((e) =>
    e.secondaryMuscles.includes(muscle.toLowerCase())
  )
}

export default exerciseSlice.reducer
