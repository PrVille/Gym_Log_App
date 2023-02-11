import axios from "axios"

const webUrl = "http://localhost:3001/api/exercises"
const mobileUrl = "http://192.168.0.105:3001/api/exercises"
const baseUrl = mobileUrl

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getById = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const create = async (newObject) => {

  const response = await axios.post(baseUrl, newObject)//.catch(err => console.log(err.response.data))
  
  return response.data
}

const update = async (id, newObject) => {
  const reponse = await axios.put(`${baseUrl}/${id}`, newObject);
  return reponse.data
};


export default { getAll, getById, create, update}
