import React from "react"
import { Text, View, StyleSheet } from "react-native"
import Constants from "expo-constants"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import theme from "../../theme"

import Programs from "./Programs"
import Exercises from "./Exercises"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColors.primary,
    paddingTop: Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "center",
  },
})

const Tab = createMaterialTopTabNavigator()

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  )
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  )
}

const ProgramsNavigator = ({ params }) => (
  <Tab.Navigator>
      <Tab.Screen name="Programs" component={Programs} />
      <Tab.Screen name="Exercises" component={Exercises} />
  </Tab.Navigator>
)

export default ProgramsNavigator
