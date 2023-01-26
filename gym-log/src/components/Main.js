import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"

import TabNavigator from "./TabNavigator"

const Main = () => {
  return (
    <>
      <StatusBar />
      <TabNavigator />
    </>
  )
}

export default Main
