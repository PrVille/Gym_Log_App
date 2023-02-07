import axios from "axios"

const webUrl = "http://localhost:3001/api/workouts"
const mobileUrl = "http://192.168.0.105:3001/api/workouts"
const baseUrl = webUrl

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}


export default { getAll, create }
