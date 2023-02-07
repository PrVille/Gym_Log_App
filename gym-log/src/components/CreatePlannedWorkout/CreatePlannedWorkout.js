import React, { useState, useEffect } from "react"
import {
  Text,
  Button,
} from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

import FinishPlanning from "./FinishPlanning"

import usePlannedSetsService from "../../hooks/usePlannedSetsService"
import Planner from "./Planner"
import ExerciseList from "./ExerciseList"

const Stack = createStackNavigator()

const CreatePlannedWorkout = ({ route, navigation, workout }) => {
  const [exercises, setExercises] = useState([])
  const { createPlannedSet } = usePlannedSetsService()

  console.log(exercises);
  
  const defaultSet = {
    plannedWeightType: "previousWeight",
    plannedRepRangeMax: 12,
    plannedRepRangeMin: 10,
    plannedReps: 12
  }

  const addExercise = async (newExercise) => {
    const newPlannedSet = await createPlannedSet({
      ...defaultSet,
      type: "work",
      exercise: newExercise._id,
    })

    newExercise.sets = [newPlannedSet]

    return setExercises([...exercises, newExercise])
  }

  const submitWorkout = async () => {
    //UPDATE SETS WEIGHTS AND REPS
    //THEN CREATE WORKOUT
    console.log(exercises)
    const sets = exercises.map(e => e.sets).flat()
    await updateSets(sets)
    console.log("here");
    await createWorkout({
      name: "test",
      notes: "test",
      duration: 90,
      exercises: exercises
    })
    
  }

  const addWorkingSet = async (id) => {
    const copyOfExercises = JSON.parse(JSON.stringify(exercises)) // deep copy
    const exercise = copyOfExercises.find((e) => e._id === id)

    const newPlannedSet = await createPlannedSet({
      ...defaultSet,
      type: "work",
      exercise: id,
    })

    exercise.sets.push(newPlannedSet)
    return setExercises(copyOfExercises)
  }

  const addWarmupSet = async (id) => {
    const copyOfExercises = JSON.parse(JSON.stringify(exercises)) // deep copy
    const exercise = copyOfExercises.find((e) => e._id === id)

    const newPlannedSet = await createPlannedSet({
      ...defaultSet,
      type: "warmup",
      exercise: id,
    })

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

  const updateWeightTypeForSet = (exerciseId, setId, plannedWeightType) => {
    console.log(exerciseId, setId, plannedWeightType);
    
    const copyOfExercises = JSON.parse(JSON.stringify(exercises)) // deep copy
    const exercise = copyOfExercises.find((e) => e._id === exerciseId)
    const set = exercise.sets.find((set) => set._id === setId)
    set.plannedWeightType = plannedWeightType
    return setExercises(copyOfExercises)
  }

  const updatePlannedRepsForSet = (exerciseId, setId, plannedReps) => {
    const copyOfExercises = JSON.parse(JSON.stringify(exercises)) // deep copy
    const exercise = copyOfExercises.find((e) => e._id === exerciseId)
    const set = exercise.sets.find((set) => set._id === setId)
    set.plannedReps = plannedReps
    return setExercises(copyOfExercises)
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
            addWorkingSet={addWorkingSet}
            addWarmupSet={addWarmupSet}
            updateWeightTypeForSet={updateWeightTypeForSet}
            updatePlannedRepsForSet={updatePlannedRepsForSet}
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
        {(props) => (
          <ExerciseList addExercise={addExercise} {...props} />
        )}
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
                navigation.navigate("Overview")
              }}
              title="Finish Workout"
              color="black"
            />
          ),
        })}
      >
        {(props) => (
          <FinishPlanning
            {...props}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default CreatePlannedWorkout
