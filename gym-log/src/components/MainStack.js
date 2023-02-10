import { useEffect } from "react"

import { StyleSheet, Text, View, Button } from "react-native"

import TabNavigator from "./TabNavigator"
import LoggerOptions from "./Logger/LoggerOptions"
import LoggerStack from "./Logger/Logger"
import ExerciseDetails from "./Screens/ExerciseDetails"
import WorkoutHistory from "./Screens/WorkoutHistory"
import CreatePlannedWorkout from "./CreatePlannedWorkout/CreatePlannedWorkout"
import PlannedWorkoutDetails from "./Screens/PlannedWorkoutDetails"

import { useDispatch, useSelector } from "react-redux"
import { initializeExercises } from "../redux/reducers/exerciseReducer"
import { initializeWorkouts } from "../redux/reducers/workoutReducer"
import { initializeSets } from "../redux/reducers/setReducer"
import { initializePlannedSets } from "../redux/reducers/plannedSetReducer"
import { initializePlannedWorkouts } from "../redux/reducers/plannedWorkoutReducer"

import { createStackNavigator } from "@react-navigation/stack"
import WorkoutDetails from "./Screens/WorkoutDetails"
import CreateExercise from "./Screens/CreateExercise"

const Stack = createStackNavigator()

const MainStack = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeExercises())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeWorkouts())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializePlannedSets())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeSets())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializePlannedWorkouts())
  }, [dispatch])

  const state = useSelector((state) => state)

  if (
    !state.exercises ||
    !state.workouts ||
    !state.plannedSets ||
    !state.sets ||
    !state.plannedWorkouts
  )
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>LOADING...</Text>
      </View>
    )

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoggerOptionsModal"
        component={LoggerOptions}
        options={{
          presentation: "transparentModal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoggerStack"
        component={LoggerStack}
        options={{
          presentation: "transparentModal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreatePlannedWorkout"
        component={CreatePlannedWorkout}
        options={{
          presentation: "transparentModal",
          headerShown: false,
        }}
      />

      {/** MODAL UNIVERSAL SCREENS */}

      <Stack.Screen
        name="ExerciseDetails"
        component={ExerciseDetails}
        options={({ navigation }) => ({
          presentation: "transparentModal",
          headerTitle: "",
          headerLeft: () => (
            <Button
              onPress={() => navigation.goBack()}
              title="X"
              color="black"
            />
          ),
        })}
      />

      <Stack.Screen
        name="CreateExercise"
        component={CreateExercise}
        options={({ navigation }) => ({
          presentation: "transparentModal",
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => (
            <Button
              onPress={() => navigation.goBack()}
              title="Cancel"
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="WorkoutHistory"
        component={WorkoutHistory}
        options={({ navigation }) => ({
          presentation: "card",
          headerTitle: "",
          headerLeft: () => (
            <Button
              onPress={() => navigation.goBack()}
              title="X"
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="PlannedWorkoutDetails"
        component={PlannedWorkoutDetails}
        options={({ navigation }) => ({
          presentation: "transparentModal",
          headerTitle: "",
          headerLeft: () => (
            <Button
              onPress={() => navigation.goBack()}
              title="X"
              color="black"
            />
          ),
        })}
      />

      <Stack.Screen
        name="WorkoutDetails"
        component={WorkoutDetails}
        options={({ navigation }) => ({
          presentation: "transparentModal",
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => (
            <Button
              onPress={() => navigation.goBack()}
              title="X"
              color="black"
            />
          ),
        })}
      />
    </Stack.Navigator>
  )
}

export default MainStack
