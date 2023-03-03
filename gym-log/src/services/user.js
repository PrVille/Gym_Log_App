import AuthStorage from "./utils/authStorage"
import axios from "axios"

const authStorage = new AuthStorage()

const webUrl = "http://localhost:3001/api/users"
const mobileUrl = "http://192.168.0.105:3001/api/users"
const baseUrl = mobileUrl

const setUser = async (user) => {
  await authStorage.setUser(user)
}

const getUser = async () => {
  const user = await authStorage.getUser()
  return user
}

const removeUser = async () => {
  await authStorage.removeUser()
}

const update = async (id, newObject) => {
  const reponse = await axios.put(`${baseUrl}/${id}`, newObject)
  return reponse.data
}


export default { setUser, getUser, removeUser, update }
