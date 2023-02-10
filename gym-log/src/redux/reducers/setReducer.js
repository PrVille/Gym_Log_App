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
  },
})

const { setSets, addNewSet, addMultipleNewSets } = setSlice.actions

// ACTIONS

export const initializeSets = () => {
  return async (dispatch) => {
    const sets = await setService.getAll()
    dispatch(setSets(sets))
  }
}

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


// SELECTORS

export const selectSets = (state) => state.sets

export const selectSetById = (state, id) => {
  return state.sets.find((set) => set._id === id)
}

export default setSlice.reducer
