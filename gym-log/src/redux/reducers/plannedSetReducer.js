import { createSlice } from "@reduxjs/toolkit"
import plannedSetService from "../../services/plannedSets"

export const plannedSetSlice = createSlice({
  name: "plannedSets",
  initialState: null,
  reducers: {
    setPlannedSets(state, { payload }) {
      return payload
    },
    addNewPlannedSet(state, { payload }) {
      return state.concat(payload)
    },
    addMultipleNewPlannedSets(state, { payload }) {
      return state.concat(payload)
    },
  },
})

const { setPlannedSets, addNewPlannedSet, addMultipleNewPlannedSets} = plannedSetSlice.actions

// ACTIONS

export const initializePlannedSets = () => {
  return async (dispatch) => {
    const plannedSets = await plannedSetService.getAll()
    dispatch(setPlannedSets(plannedSets))
  }
}

export const createPlannedSet = (plannedSet) => {
  return async (dispatch) => {
    const newPlannedSet = await plannedSetService.create(plannedSet)
    dispatch(addNewPlannedSet(newPlannedSet))
    return newPlannedSet
  }
}

export const createMultiplePlannedSets = (plannedSets) => {
  return async (dispatch) => {
    const newPlannedSets = await plannedSetService.create(plannedSets)
    dispatch(addMultipleNewPlannedSets(newPlannedSets))    
    return newPlannedSets
  }
}


// SELECTORS

export const selectPlannedSets = (state) => state.plannedSets

export const selectPlannedSetById = (state, id) => {
  return state.plannedSets.find((plannedSet) => plannedSet._id === id)
}

export default plannedSetSlice.reducer
