import { createSlice } from "@reduxjs/toolkit"
import userService from "../../services/user"
import signInService from "../../services/signIn"

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, { payload }) {
      return payload
    },
    removeUser(state, action) {
      return null
    },
  },
})

const { setUser, removeUser } = userSlice.actions

// ACTIONS

export const initUser = () => {
  return async (dispatch) => {
    const userFromStorage = await userService.getUser()
    if (userFromStorage) dispatch(setUser(userFromStorage))
  }
}

export const signIn = (username, password) => {
  return async (dispatch) => {
    const user = await signInService.signIn({ username, password })
    await userService.setUser(user)
    dispatch(setUser(user))
  }
}

export const signOut = () => {
  return async (dispatch) => {
    await userService.removeUser()
    dispatch(removeUser())
  }
}

// SELECTORS

export const selectUser = (state) => state.user

export default userSlice.reducer
