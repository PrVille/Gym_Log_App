import React, { useState, useEffect } from "react"
import { Text, Button, View, Alert } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { Icon } from "@rneui/themed"
import FinishPlanning from "./FinishPlanning"

import Planner from "./Planner"
import CreatePlannedSet from "./CreatePlannedSet"
import ExercisePicker from "../Screens/ExercisePicker"
import { useDispatch, useSelector } from "react-redux"
import {
  createMultiplePlannedSets,
  deletePlannedSet,
} from "../../redux/reducers/plannedSetReducer"
import {
  createPlannedWorkout,
  selectPlannedWorkoutById,
  updatePlannedWorkout,
} from "../../redux/reducers/plannedWorkoutReducer"
import uuid from "react-native-uuid"
import CloseButton from "../Buttons/CloseButton"
import BackButton from "../Buttons/BackButton"
import ForwardButton from "../Buttons/ForwardButton"
import DoneButton from "../Buttons/DoneButton"

const Stack = createStackNavigator()

const CreatePlannedWorkout = ({ route, navigation, workout }) => {
  const dispatch = useDispatch()
  const [exercises, setExercises] = useState([])
  const [plannedWorkout, setPlannedWorkout] = useState({
    name: `Planned Workout`,
    notes: "My planned workout",
    estimatedDuration: "",
  })
  const workoutToEdit = route.params
    ? useSelector((state) => selectPlannedWorkoutById(state, route.params))
    : null
  const sets = exercises.map((e) => e.sets).flat()
  const hasEmptyFields =
    exercises.length === 0 || exercises.some((e) => e.sets.length === 0)

  useEffect(() => {
    if (workoutToEdit) {
      setExercises(workoutToEdit.plannedExercises)
      setPlannedWorkout({
        name: workoutToEdit.name,
        notes: workoutToEdit.notes,
        estimatedDuration: workoutToEdit.estimatedDuration,
      })
    }
  }, [])

  const confirmCancel = () => {
    Alert.alert(`Cancel planned workout?`, "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => navigation.goBack() },
    ])
  }

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
    return setExercises([
      ...exercises,
      {
        exercise: newExercise,
        sets: [],
      },
    ])
  }

  const removeExercise = (exerciseId) => {
    return setExercises(
      [...exercises].filter((e) => e.exercise._id !== exerciseId)
    )
  }

  const submitWorkout = async () => {
    for (let i = 0; i < exercises.length; i++) {
      const sets = exercises[i].sets
      for (let j = 0; j < sets.length; j++) {
        delete sets[j]._id
      }
      await dispatch(createMultiplePlannedSets(sets)).then(
        (createdSets) => (exercises[i].sets = createdSets)
      )
    }

    if (workoutToEdit) {
      const existingPlannedSets = workoutToEdit.plannedExercises
        .map((e) => e.sets)
        .flat()
        .map((set) => set._id)
      for (let i = 0; i < existingPlannedSets.length; i++) {
        await dispatch(deletePlannedSet(existingPlannedSets[i])).then(
          (res) => res
        )
      }

      dispatch(
        updatePlannedWorkout({
          ...plannedWorkout,
          plannedExercises: exercises,
          _id: workoutToEdit._id,
          active: workoutToEdit.active,
        })
      )
      return
    }

    dispatch(
      createPlannedWorkout({
        ...plannedWorkout,
        plannedExercises: exercises,
      })
    )
  }

  const removeSet = (exerciseId, setId) => {
    const copyOfExercises = JSON.parse(JSON.stringify(exercises)) // deep copy
    const exercise = copyOfExercises.find((e) => e.exercise._id === exerciseId)
    exercise.sets = exercise.sets.filter((set) => set._id !== setId)
    return setExercises(copyOfExercises)
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Planner"
        options={({ navigation }) => ({
          presentation: "transparentModal",
          headerShadowVisible: false,
          headerTitle: "Planning a workout",
          headerLeft: () => <CloseButton onPress={confirmCancel} />,
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <Icon
                style={{ marginEnd: 10 }}
                onPress={() => navigation.navigate("CalculatorsStack")}
                name="calculator"
                type="material-community"
                size={30}
              />
              <ForwardButton
                disabled={hasEmptyFields}
                onPress={() => {
                  navigation.navigate("FinishPlanning")
                }}
              />
            </View>
          ),
        })}
      >
        {(props) => (
          <Planner
            exercises={exercises}
            plannedWorkout={plannedWorkout}
            removeSet={removeSet}
            removeExercise={removeExercise}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="ExercisePicker"
        options={({ navigation }) => ({
          presentation: "transparentModal",
          headerTitle: "Choose Exercise",
          headerShadowVisible: false,
          headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
          headerRight: null, //search button here
        })}
      >
        {(props) => (
          <ExercisePicker
            onSelection={addExercise}
            existingExercises={exercises.map(
              (exercise) => exercise.exercise._id
            )}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="FinishPlanning"
        options={({ navigation }) => ({
          presentation: "card",
          headerTitle: "Finish planning",
          headerShadowVisible: false,
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
          headerRight: () => (
            <DoneButton
              disabled={
                !plannedWorkout.name || !plannedWorkout.estimatedDuration
              }
              onPress={() => {
                submitWorkout()
                navigation.goBack()
                navigation.goBack()
              }}
            />
          ),
        })}
      >
        {(props) => (
          <FinishPlanning
            plannedWorkout={plannedWorkout}
            setPlannedWorkout={setPlannedWorkout}
            exercises={exercises}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="CreatePlannedSet"
        options={({ navigation }) => ({
          presentation: "transparentModal",
          headerTitle: "Create Planned Set",
          headerShadowVisible: false,
          headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
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
