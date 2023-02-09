import axios from "axios"

const webUrl = "http://localhost:3001/api/exercises"
const mobileUrl = "http://192.168.0.105:3001/api/exercises"
const baseUrl = mobileUrl

const getAll = async () => {
  const res = await axios.get(baseUrl)
  //console.log(res.data);
  return res.data
}

const getAllWithFields = async (fields) => {
    const res = await axios.get(`${baseUrl}?fields=${fields}`)
    return res.data
}

const getById = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  //console.log(res.data);
  return res.data
}



export default { getAll, getAllWithFields, getById }
