import { StyleSheet, Text, View, Button } from "react-native"

import { createStackNavigator } from "@react-navigation/stack"
import TabNavigator from "./TabNavigator"
import LoggerOptions from "./Logger/LoggerOptions"
import LoggerStack from "./Logger/Logger"
import ExerciseDetails from "./Screens/ExerciseDetails"
import WorkoutHistory from "./Screens/WorkoutHistory"
import CreatePlannedWorkout from "./CreatePlannedWorkout/CreatePlannedWorkout"
import PlannedWorkoutDetails from "./Screens/PlannedWorkoutDetails"

const Stack = createStackNavigator()

const MainStack = () => {
  return (
    <Stack.Navigator >
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
      
    </Stack.Navigator>
  )
}

export default MainStack
