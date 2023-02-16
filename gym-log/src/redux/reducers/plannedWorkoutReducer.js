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
    updateOnePlannedWorkout(state, { payload }) {
      return state.map((plannedWorkout) =>
        plannedWorkout._id === payload._id ? payload : plannedWorkout
      )
    },
    removePlannedWorkout(state, { payload }) {
      return state.filter((plannedWorkout) => plannedWorkout._id !== payload)
    },
  },
})

const { setPlannedWorkouts, addNewPlannedWorkout, updateOnePlannedWorkout, removePlannedWorkout } = plannedWorkoutSlice.actions

// ACTIONS

export const initializePlannedWorkouts = () => {
  return async (dispatch) => {
    const plannedWorkouts = await plannedWorkoutService.getAll()
    dispatch(setPlannedWorkouts(plannedWorkouts))
  }
}

export const refetchPlannedWorkouts = () => initializePlannedWorkouts()

export const createPlannedWorkout = (plannedWorkout) => {
  return async (dispatch) => {
    const newPlannedWorkout = await plannedWorkoutService.create(plannedWorkout)
    dispatch(addNewPlannedWorkout(newPlannedWorkout))        
    return newPlannedWorkout
  }
}

export const updatePlannedWorkout = (plannedWorkoutToUpdate) => {
  return async (dispatch) => {
    const updatedPlannedWorkout = await plannedWorkoutService.update(
      plannedWorkoutToUpdate._id,
      plannedWorkoutToUpdate
    )    
    dispatch(updateOnePlannedWorkout(updatedPlannedWorkout))
    return updatedPlannedWorkout
  }
}

// Backend removes related planned sets, initialize them after calling this
export const deletePlannedWorkout = (id) => {
  return async (dispatch) => {
    console.log("deletePlannedWorkout");
    
    const deletedPlannedWorkout = await plannedWorkoutService.remove(id)
    dispatch(removePlannedWorkout(id))    
    return deletedPlannedWorkout
  }
}

// SELECTORS

export const selectPlannedWorkouts = (state) => state.plannedWorkouts

export const selectPlannedWorkoutById = (state, id) => {
  const plannedWorkout = state.plannedWorkouts.find((plannedWorkout) => plannedWorkout._id === id)
  return JSON.parse(JSON.stringify(plannedWorkout))
}

export const selectPlannedWorkoutsByQuery = (state, query) => {
  return state.plannedWorkouts.filter((e) =>
    e.name.toLowerCase().includes(query.toLowerCase())
  )
}

export default plannedWorkoutSlice.reducer
