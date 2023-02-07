import axios from "axios"

const webUrl = "http://localhost:3001/api/plannedsets"
const mobileUrl = "http://192.168.0.105:3001/api/plannedsets"
const baseUrl = webUrl



const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}



export default { create }
