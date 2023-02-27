import axios from "axios"

const webUrl = "http://localhost:3001/api/login"
const mobileUrl = "http://192.168.0.105:3001/api/login"
const baseUrl = mobileUrl

const signIn = async (credentials) => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}

export default { signIn }
