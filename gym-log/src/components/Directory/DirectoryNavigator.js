import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Routines from "./Routines"
import Exercises from "./Exercises"
import PlannedWorkouts from "./PlannedWorkouts"

const Tab = createMaterialTopTabNavigator()

const DirectoryNavigator = ({ params }) => (
  <Tab.Navigator
    screenOptions={{
      swipeEnabled: false,
      tabBarStyle: { shadowOpacity: 0 },
    }}
  >
    <Tab.Screen
      name="Routines"
      component={Routines}
      options={{ title: "Routines" }}
    />
    <Tab.Screen
      name="PlannedWorkouts"
      component={PlannedWorkouts}
      options={{ title: "Workouts" }}
    />
    <Tab.Screen name="Exercises" component={Exercises} />
  </Tab.Navigator>
)

export default DirectoryNavigator
