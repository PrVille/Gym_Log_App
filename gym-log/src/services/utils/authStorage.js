import AsyncStorage from '@react-native-async-storage/async-storage'

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace
  }

  async getUser() {
    // Get the user for the storage
    const user = await AsyncStorage.getItem(
      `${this.namespace}:user`,
    )
    return user ? JSON.parse(user) : null
  }

  async setUser(user) {
    // Add the access token to the storage
    await AsyncStorage.setItem(
      `${this.namespace}:user`,
      JSON.stringify(user),
    )
  }

  async removeUser() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:user`)
  }
}

export default AuthStorage
