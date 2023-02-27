import axios from "axios"

const webUrl = "http://localhost:3001/api/plannedworkouts"
const mobileUrl = "http://192.168.0.105:3001/api/plannedworkouts"
const baseUrl = mobileUrl

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

const remove = async (id) => {
  console.log("plannedWorkoutService - remove");
  
  const reponse = await axios.delete(`${baseUrl}/${id}`);
  return reponse.data
};


export default { create, getAll, update, remove }
