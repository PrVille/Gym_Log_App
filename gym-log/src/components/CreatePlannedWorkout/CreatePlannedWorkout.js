import React, { useState, useEffect } from "react"
import { Text, Button } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

import FinishPlanning from "./FinishPlanning"

import Planner from "./Planner"
import ExerciseList from "./ExerciseList"
import CreatePlannedSet from "./CreatePlannedSet"
import usePlannedWorkoutsService from "../../hooks/usePlannedWorkoutsService"

const Stack = createStackNavigator()

const CreatePlannedWorkout = ({ route, navigation, workout }) => {
  const [exercises, setExercises] = useState([])
  const { createPlannedWorkout } = usePlannedWorkoutsService()

  const addPlannedSet = (exerciseId, newPlannedSet) => {
    const copyOfExercises = JSON.parse(JSON.stringify(exercises)) // deep copy
    const exercise = copyOfExercises.find((e) => e.exercise._id === exerciseId)    

    if (newPlannedSet.type === "warmup") {
      const warmupSetAmount = exercise.sets.filter(
        (set) => set.type === "warmup"
      ).length

      if (warmupSetAmount === 0) {
        exercise.sets.unshift(newPlannedSet)
      } else {
        exercise.sets.splice(warmupSetAmount, 0, newPlannedSet)
      }
      return setExercises(copyOfExercises)
    }

    exercise.sets.push(newPlannedSet)
    return setExercises(copyOfExercises)
  }

  const addExercise = async (newExercise) => {
  
    return setExercises([...exercises, {
      exercise: newExercise,
      sets: []
    }])
  }

  const submitWorkout = async () => {
    //UPDATE SETS WEIGHTS AND REPS
    //THEN CREATE WORKOUT
    console.log(exercises)
    
    await createPlannedWorkout({
      name: "test",
      notes: "test",
      estimatedDuration: 90,
      plannedExercises: exercises,
    })

  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Planner"
        options={({ navigation }) => ({
          presentation: "transparentModal",
          headerTitle: () => <Text>Planning workout</Text>,
          headerLeft: () => (
            <Button
              onPress={() => navigation.goBack()}
              title="Cancel"
              color="black"
            />
          ),
          headerRight: () => (
            <Button
              onPress={() => {
                navigation.navigate("FinishPlanning")
              }}
              title="Done"
              color="black"
            />
          ),
        })}
      >
        {(props) => (
          <Planner
            exercises={exercises}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="ExerciseList"
        options={({ navigation }) => ({
          presentation: "transparentModal",
          headerTitle: "Choose Exercise",
          headerLeft: () => (
            <Button
              onPress={() => navigation.goBack()}
              title="Cancel"
              color="black"
            />
          ),
          headerRight: null, //search button here
        })}
      >
        {(props) => <ExerciseList addExercise={addExercise} {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="FinishPlanning"
        options={({ navigation }) => ({
          presentation: "card",
          headerTitle: "Finish planning",
          headerLeft: () => (
            <Button
              onPress={() => navigation.goBack()}
              title="<--"
              color="black"
            />
          ),
          headerRight: () => (
            <Button
              onPress={() => {
                submitWorkout()
                navigation.navigate("TabNavigator")
                navigation.navigate("ProgramsNavigator")
                navigation.navigate("PlannedWorkouts")
              }}
              title="Finish Workout"
              color="black"
            />
          ),
        })}
      >
        {(props) => <FinishPlanning {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="CreatePlannedSet"
        options={({ navigation }) => ({
          presentation: "transparentModal",
          headerTitle: "Create Planned Set",
          headerLeft: () => (
            <Button
              onPress={() => navigation.goBack()}
              title="cancel"
              color="black"
            />
          ),
        })}
      >
        {(props) => (
          <CreatePlannedSet addPlannedSet={addPlannedSet} {...props} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default CreatePlannedWorkout
