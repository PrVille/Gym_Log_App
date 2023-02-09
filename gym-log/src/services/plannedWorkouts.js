import axios from "axios"

const webUrl = "http://localhost:3001/api/plannedworkouts"
const mobileUrl = "http://192.168.0.105:3001/api/plannedworkouts"
const baseUrl = mobileUrl

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getById = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { create, getAll, getById }
