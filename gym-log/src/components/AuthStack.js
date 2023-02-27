import { useEffect } from "react"

import { StyleSheet, Text, View } from "react-native"
import { ListItem, Icon, Button, SearchBar, FAB, Chip } from "@rneui/themed"

import TabNavigator from "./TabNavigator"
import LoggerOptions from "./Logger/LoggerOptions"
import LoggerStack from "./Logger/Logger"
import ExerciseDetails from "./Screens/ExerciseDetails"
import WorkoutHistory from "./Screens/WorkoutHistory"
import CreatePlannedWorkout from "./CreatePlannedWorkout/CreatePlannedWorkout"
import PlannedWorkoutDetails from "./Screens/PlannedWorkoutDetails"

import { useSelector } from "react-redux"
import { createStackNavigator } from "@react-navigation/stack"
import WorkoutDetails from "./Screens/WorkoutDetails"
import CreateExercise from "./Screens/CreateExercise"

import useInitialization from "../hooks/useInitialization"

import CloseButton from "./Buttons/CloseButton"

import { useTheme } from "@react-navigation/native"
import SetHistory from "./Screens/SetHistory"
import RoutineDetails from "./Screens/RoutineDetails"
import RoutineFormStack from "./Routine/RoutineFormStack"

import SignIn from "./Auth/SignIn"

const Stack = createStackNavigator()

const AuthStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </>
  )
}

export default AuthStack
