import AuthStorage from "./utils/authStorage"
import axios from "axios"
import Constants from "expo-constants"

const baseUrl = Constants.manifest.extra.BASE_URL + "/api/users"
const authStorage = new AuthStorage()

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

const deleteUser = async (id) => {
  const reponse = await axios.delete(`${baseUrl}/${id}`);
  return reponse.data
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { setUser, getUser, removeUser, update, deleteUser, create }
