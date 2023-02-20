import { createSlice } from "@reduxjs/toolkit"
import routineService from "../../services/routines"

export const routineSlice = createSlice({
  name: "routines",
  initialState: null,
  reducers: {
    setRoutines(state, { payload }) {
      return payload
    },
    addNewRoutine(state, { payload }) {
      return state.concat(payload)
    },
    updateOneRoutine(state, { payload }) {
      return state.map((routine) =>
        routine._id === payload._id ? payload : routine
      )
    },
    removeRoutine(state, { payload }) {
      return state.filter((routine) => routine._id !== payload)
    },
  },
})

const { setRoutines, addNewRoutine, updateOneRoutine, removeRoutine } =
  routineSlice.actions

// ACTIONS

export const initializeRoutines = () => {
  return async (dispatch) => {
    const routines = await routineService.getAll()
    dispatch(setRoutines(routines))
  }
}

export const refetchRoutines = () => initializeRoutines()

export const createRoutine = (routine) => {
  return async (dispatch) => {
    const newRoutine = await routineService.create(routine)
    dispatch(addNewRoutine(newRoutine))
    return newRoutine
  }
}

export const updateRoutine = (routineToUpdate) => {
  return async (dispatch) => {
    const updatedRoutine = await routineService.update(
      routineToUpdate._id,
      routineToUpdate
    )
    dispatch(updateOneRoutine(updatedRoutine))
    return updatedRoutine
  }
}

export const deleteRoutine = (id) => {
  return async (dispatch) => {
    const deletedRoutine = await routineService.remove(id)
    dispatch(removeRoutine(id))
    return deletedRoutine
  }
}

// SELECTORS

export const selectRoutines = (state) => state.routines

export const selectRoutineById = (state, id) => {
  return state.routines.find((routine) => routine._id === id)
}

export const selectRoutinesByQuery = (state, query) => {
  return state.routines.filter((e) =>
    e.name.toLowerCase().includes(query.toLowerCase())
  )
}

export default routineSlice.reducer
