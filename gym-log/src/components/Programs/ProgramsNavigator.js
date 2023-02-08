import React from "react"
import { Text, View, StyleSheet } from "react-native"
import Constants from "expo-constants"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import theme from "../../theme"

import Programs from "./Programs"
import Exercises from "./Exercises"
import PlannedWorkouts from "./PlannedWorkouts"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
})

const Tab = createMaterialTopTabNavigator()

const ProgramsNavigator = ({ params }) => (
  <Tab.Navigator
    initialRouteName={"PlannedWorkouts"}
    sceneContainerStyle={styles.container}
  >
    <Tab.Screen name="Programs" component={Programs} />
    <Tab.Screen name="PlannedWorkouts" component={PlannedWorkouts} />
    <Tab.Screen name="Exercises" component={Exercises} />
  </Tab.Navigator>
)

export default ProgramsNavigator
