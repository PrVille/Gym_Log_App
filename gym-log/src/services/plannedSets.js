import axios from "axios"

const webUrl = "http://localhost:3001/api/plannedsets"
const mobileUrl = "http://192.168.0.105:3001/api/plannedsets"
const baseUrl = mobileUrl

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



export default { create, createMany, getAll }
