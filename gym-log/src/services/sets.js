import axios from "axios"

const webUrl = "http://localhost:3001/api/sets"
const mobileUrl = "http://192.168.0.105:3001/api/sets"
const baseUrl = webUrl

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = async (id, newObject) => {
  const reponse = await axios.put(`${baseUrl}/${id}`, newObject);
  return reponse.data
};

export default { getAll, create, update }
