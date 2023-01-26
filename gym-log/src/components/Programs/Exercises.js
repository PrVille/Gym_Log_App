import React from "react"
import { Text, View, Button } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

const CreateExercise = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>IMPLEMENT: Creation of a new exercise here</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  )
}

const ExerciseHome = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Exercises</Text>
      <Button
        onPress={() => navigation.navigate("CreateExercise")}
        title="Create exercise"
      />
    </View>
  )
}

const Exercises = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExerciseHome" component={ExerciseHome} />
      <Stack.Screen name="CreateExercise" component={CreateExercise} />
    </Stack.Navigator>
  )
}

export default Exercises
