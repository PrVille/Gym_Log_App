import { createSlice } from "@reduxjs/toolkit"
import setService from "../../services/sets"

export const setSlice = createSlice({
  name: "sets",
  initialState: null,
  reducers: {
    setSets(state, { payload }) {
      return payload
    },
    addNewSet(state, { payload }) {
      return state.concat(payload)
    },
    addMultipleNewSets(state, { payload }) {      
      return state.concat(payload)
    },
    removeSet(state, { payload }) {
      return state.filter((set) => set._id !== payload)
    },
  },
})

const { setSets, addNewSet, addMultipleNewSets, removeSet } = setSlice.actions

// ACTIONS

export const initializeSets = () => {
  return async (dispatch) => {
    const sets = await setService.getAll()   
    dispatch(setSets(sets))
  }
}

export const refetchSets = () => initializeSets()

export const createSet = (set) => {
  return async (dispatch) => {
    const newSet = await setService.create(set)
    dispatch(addNewSet(newSet))
    return newSet
  }
}

export const createMultipleSets = (sets) => {
  return async (dispatch) => {
    const newSets = await setService.create(sets)
    dispatch(addMultipleNewSets(newSets))    
    return newSets
  }
}

export const deleteSet = (id) => {
  return async (dispatch) => {    
    const deletedSet = await setService.remove(id)
    dispatch(removeSet(id))   
    return deletedSet 
  }
}

// SELECTORS

export const selectSets = (state) => state.sets

export const selectSetsByExerciseId = (state, id) => {
  return state.sets.filter((set) => set.exercise === id)
}

export const selectSetById = (state, id) => {
  return state.sets.find((set) => set._id === id)
}

export default setSlice.reducer
