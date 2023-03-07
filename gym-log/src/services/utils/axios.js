import axios from "axios"
import userService from "../user"
import { signOut } from "../../redux/reducers/userReducer"
import { setNotification } from "../../redux/reducers/notificationReducer"

let store

export const injectStore = (_store) => {
  store = _store
}

axios.interceptors.request.use(
  async function (config) {
    const user = await userService.getUser()    
    config.headers.Authorization = `bearer ${user?.token}`
    return config
  },
  async function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  async function (response) {
    return response
  },
  async function (error) {    
    store.dispatch(setNotification({ message: error.response?.data?.error, type: "info" }, 5))
    if (error.response?.data?.error === "Token expired") store.dispatch(signOut())
    return Promise.reject(error)
  }
)

export default axios
