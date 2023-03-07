import axios from "axios"
import Constants from "expo-constants"

const baseUrl = Constants.manifest.extra.BASE_URL + "/api/login"

const signIn = async (credentials) => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}

export default { signIn }
