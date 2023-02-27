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
import GraphScreen from "./Statistics/GraphScreen"

const Stack = createStackNavigator()

const MainStack = () => {
  const { colors } = useTheme()
  const state = useSelector((state) => state)
  const stateInitializer = useInitialization(state.user)

  useEffect(() => {
    stateInitializer()
  }, [state.user])

  if (
    !state.exercises ||
    !state.workouts ||
    !state.plannedSets ||
    !state.sets ||
    !state.plannedWorkouts ||
    !state.routines
  )
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>LOADING...</Text>
      </View>
    )

  return (
    <>
      <Stack.Navigator initialRouteName="">
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
          name="RoutineFormStack"
          component={RoutineFormStack}
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
          options={({ navigation, route }) => ({
            presentation: "transparentModal",
            headerShadowVisible: false,
            headerLeft: () => (
              <CloseButton onPress={() => navigation.goBack()} />
            ),
            cardStyle: {
              flex: 1,
              backgroundColor: colors.background,
            },
          })}
        />

        <Stack.Screen
          name="CreateExercise"
          component={CreateExercise}
          options={({ navigation }) => ({
            presentation: "transparentModal",
            headerTitle: "Create new exercise",
            headerShadowVisible: false,
            headerLeft: () => (
              <CloseButton onPress={() => navigation.goBack()} />
            ),
          })}
        />
        <Stack.Screen
          name="WorkoutHistory"
          component={WorkoutHistory}
          options={({ navigation }) => ({
            presentation: "transparentModal",
            headerTitle: "Workout history",
            headerShadowVisible: false,
            headerLeft: () => (
              <CloseButton onPress={() => navigation.goBack()} />
            ),
          })}
        />
        <Stack.Screen
          name="PlannedWorkoutDetails"
          component={PlannedWorkoutDetails}
          options={({ navigation }) => ({
            presentation: "transparentModal",
            headerShadowVisible: false,
            headerLeft: () => (
              <CloseButton onPress={() => navigation.goBack()} />
            ),
            cardStyle: {
              flex: 1,
              backgroundColor: colors.background,
            },
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
              <CloseButton onPress={() => navigation.goBack()} />
            ),
          })}
        />

        <Stack.Screen
          name="SetHistory"
          component={SetHistory}
          options={({ navigation }) => ({
            presentation: "transparentModal",
            headerTitle: "Set History",
            headerShadowVisible: false,
            headerLeft: () => (
              <CloseButton onPress={() => navigation.goBack()} />
            ),
          })}
        />

        <Stack.Screen
          name="RoutineDetails"
          component={RoutineDetails}
          options={({ navigation }) => ({
            presentation: "transparentModal",
            headerTitle: "",
            headerShadowVisible: false,
            cardStyle: {
              flex: 1,
              backgroundColor: colors.background,
            },
            headerLeft: () => (
              <CloseButton onPress={() => navigation.goBack()} />
            ),
          })}
        />

        <Stack.Screen
          name="GraphScreen"
          component={GraphScreen}
          options={({ navigation, route }) => ({
            presentation: "transparentModal",
            headerShadowVisible: false,
            headerLeft: () => (
              <CloseButton onPress={() => navigation.goBack()} />
            ),
            cardStyle: {
              flex: 1,
              backgroundColor: colors.background,
            },
          })}
        />
      </Stack.Navigator>
    </>
  )
}

export default MainStack
