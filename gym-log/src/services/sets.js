import axios from "axios"
import Constants from "expo-constants"

const baseUrl = Constants.manifest.extra.BASE_URL + "/api/sets"

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const createMany = async (newObjects) => {
  const response = await axios.post(baseUrl, newObjects)
  return response.data
}

const remove = async (id) => {
  const reponse = await axios.delete(`${baseUrl}/${id}`);
  return reponse.data
};

export default { getAll, create, createMany, remove }
