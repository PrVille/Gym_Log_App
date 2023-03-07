import axios from "./utils/axios"
import Constants from "expo-constants"

const baseUrl = Constants.manifest.extra.BASE_URL + "/api/exercises"

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = async (id, newObject) => {
  const reponse = await axios.put(`${baseUrl}/${id}`, newObject)
  return reponse.data
}

const remove = async (id) => {
  const reponse = await axios.delete(`${baseUrl}/${id}`)
  return reponse.data
}

export default { getAll, create, update, remove }
