import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Programs from "./Programs"
import Exercises from "./Exercises"
import PlannedWorkouts from "./PlannedWorkouts"

const Tab = createMaterialTopTabNavigator()

const ProgramsNavigator = ({ params }) => (
  <Tab.Navigator
    initialRouteName={"PlannedWorkouts"}
    screenOptions={{
      swipeEnabled: false,
      tabBarStyle: { shadowOpacity: 0 },
    }}
  >
    <Tab.Screen name="Programs" component={Programs} options={{title: "Routines"}}/>
    <Tab.Screen name="PlannedWorkouts" component={PlannedWorkouts} options={{title: "Workouts"}} />
    <Tab.Screen name="Exercises" component={Exercises} />
  </Tab.Navigator>
)

export default ProgramsNavigator
