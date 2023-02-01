import React from "react"
import { Text, View, StyleSheet } from "react-native"
import Constants from "expo-constants"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import theme from "../../theme"

import Programs from "./Programs"
import Exercises from "./Exercises"
import Workouts from "./Workouts"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
})

const Tab = createMaterialTopTabNavigator()

const ProgramsNavigator = ({ params }) => (
  <Tab.Navigator initialRouteName={"Workouts"} sceneContainerStyle={styles.container}>
      <Tab.Screen name="Programs" component={Programs} />
      <Tab.Screen name="Workouts" component={Workouts} />
      <Tab.Screen name="Exercises" component={Exercises} />
  </Tab.Navigator>
)

export default ProgramsNavigator
