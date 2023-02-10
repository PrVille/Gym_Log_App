import { createSlice } from "@reduxjs/toolkit"
import plannedWorkoutService from "../../services/plannedWorkouts"

export const plannedWorkoutSlice = createSlice({
  name: "plannedWorkouts",
  initialState: null,
  reducers: {
    setPlannedWorkouts(state, { payload }) {
      return payload
    },
    addNewPlannedWorkout(state, { payload }) {
      return state.concat(payload)
    },
  },
})

const { setPlannedWorkouts, addNewPlannedWorkout } = plannedWorkoutSlice.actions

// ACTIONS

export const initializePlannedWorkouts = () => {
  return async (dispatch) => {
    const plannedWorkouts = await plannedWorkoutService.getAll()
    dispatch(setPlannedWorkouts(plannedWorkouts))
  }
}

export const createPlannedWorkout = (plannedWorkout) => {
  return async (dispatch) => {
    const newPlannedWorkout = await plannedWorkoutService.create(plannedWorkout)
    dispatch(addNewPlannedWorkout(newPlannedWorkout))    
    console.log(newPlannedWorkout);
    
    return newPlannedWorkout
  }
}

// SELECTORS

export const selectPlannedWorkouts = (state) => state.plannedWorkouts

export const selectPlannedWorkoutById = (state, id) => {
  const plannedWorkout = state.plannedWorkouts.find((plannedWorkout) => plannedWorkout._id === id)
  return JSON.parse(JSON.stringify(plannedWorkout))
}

export default plannedWorkoutSlice.reducer
