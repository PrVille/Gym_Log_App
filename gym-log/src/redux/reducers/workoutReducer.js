import { createSlice } from "@reduxjs/toolkit"
import workoutService from "../../services/workouts"

export const workoutSlice = createSlice({
  name: "workouts",
  initialState: null,
  reducers: {
    setWorkouts(state, { payload }) {      
      return payload
    },
    addNewWorkout(state, { payload }) {
      return state.concat(payload)
    },
    removeWorkout(state, { payload }) {
      return state.filter((workout) => workout._id !== payload)
    },
  },
})

const { setWorkouts, addNewWorkout, removeWorkout } = workoutSlice.actions

// ACTIONS

export const initializeWorkouts = () => {
  return async (dispatch) => {
    const workouts = await workoutService.getAll()    
    dispatch(setWorkouts(workouts))
  }
}

export const createWorkout = (workout) => {
  return async (dispatch) => {
    const newWorkout = await workoutService.create(workout)
    dispatch(addNewWorkout(newWorkout))    
    return newWorkout
  }
}

// NOTE: remember to delete equivalent sets
export const deleteWorkout = (id) => {
  return async (dispatch) => {
    const res = await workoutService.remove(id)
    dispatch(removeWorkout(id))    
    return res
  }
}

// SELECTORS

export const selectWorkouts = (state) => state.workouts

export const selectWorkoutById = (state, id) => {
  return state.workouts.find((workout) => workout._id === id)
}

export default workoutSlice.reducer
