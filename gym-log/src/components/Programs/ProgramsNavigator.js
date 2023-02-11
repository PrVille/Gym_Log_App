import React from "react"
import { Text, View, StyleSheet } from "react-native"
import Constants from "expo-constants"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

import Programs from "./Programs"
import Exercises from "./Exercises"
import PlannedWorkouts from "./PlannedWorkouts"



const Tab = createMaterialTopTabNavigator()

const ProgramsNavigator = ({ params }) => (
  <Tab.Navigator
    initialRouteName={"Exercises"}
    screenOptions={{
      swipeEnabled: false,
      tabBarStyle: { shadowOpacity: 0 },
    }}
  >
    <Tab.Screen name="Programs" component={Programs} />
    <Tab.Screen name="PlannedWorkouts" component={PlannedWorkouts} />
    <Tab.Screen name="Exercises" component={Exercises} />
  </Tab.Navigator>
)

export default ProgramsNavigator
