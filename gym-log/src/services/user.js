import AuthStorage from "./utils/authStorage"

const authStorage = new AuthStorage()

const setUser = async (user) => {
  await authStorage.setUser(user)
}

const getUser = async () => {
  const user = await authStorage.getUser()
  return user
}

const removeUser = async () => {
  await authStorage.removeUser()
}


export default { setUser, getUser, removeUser }
