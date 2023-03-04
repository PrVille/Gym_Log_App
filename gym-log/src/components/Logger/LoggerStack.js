import { useState, useEffect } from "react"
import { View, Alert } from "react-native"
import Stopwatch from "../Utils/Stopwatch"
import { createStackNavigator } from "@react-navigation/stack"
import FinishWorkoutScreen from "./FinishWorkoutScreen"
import uuid from "react-native-uuid"
import ExercisePicker from "../Screens/ExercisePicker"
import { useDispatch, useSelector } from "react-redux"
import { createWorkout } from "../../redux/reducers/workoutReducer"
import { createMultipleSets } from "../../redux/reducers/setReducer"
import { updateExercise } from "../../redux/reducers/exerciseReducer"
import { selectPlannedWorkoutById } from "../../redux/reducers/plannedWorkoutReducer"
import CloseButton from "../Buttons/CloseButton"
import BackButton from "../Buttons/BackButton"
import ForwardButton from "../Buttons/ForwardButton"
import DoneButton from "../Buttons/DoneButton"
import { Icon } from "@rneui/themed"
import {
  selectActiveRoutine,
  updateRoutineCompletedCount,
} from "../../redux/reducers/routineReducer"
import Logger from "./Logger"
import { format } from "date-fns"
import { epley1RM, brzycki1RM } from "../../helpers"

const Stack = createStackNavigator()

const LoggerStack = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const [startTime] = useState(Date.now())
  const [finishTime, setFinishTime] = useState(Date.now())
  const [exercises, setExercises] = useState([])
  const [workout, setWorkout] = useState({
    name: `Improvised Workout`,
    notes: `Improvised workout ${format(new Date(), "dd.MM.yy")}`,
    duration: "",
  })
  const plannedWorkout = route.params
    ? useSelector((state) => selectPlannedWorkoutById(state, route.params))
    : null
  const activeRoutine = useSelector(selectActiveRoutine)
  const sets = exercises.map((e) => e.sets).flat()
  const hasEmptyFields =
    exercises.length === 0 ||
    exercises.some(e => e.sets.length === 0) ||
    sets
      .map((set) => Object.values(set))
      .flat()
      .includes("")

  useEffect(() => {
    const selectWeight = (plannedSet, exercise) => {
      switch (plannedSet.plannedWeightType) {
        case "previousWeight":
          exercise.sets.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
          })
          const set = exercise.sets.find(
            (set) => set.reps === plannedSet.plannedReps
          )
          if (!set) return 0
          return !set.weight ? 0 : set.weight
        case "oneRepMaxPercentage":
          return (exercise.oneRepMax * plannedSet.oneRepMaxPercentage) / 100
        case "plannedWeight":
          return plannedSet.plannedWeight
        default:
          return 0
      }
    }

    if (plannedWorkout) {
      const plannedExercises = plannedWorkout.plannedExercises

      for (let i = 0; i < plannedExercises.length; i++) {
        const exercise = plannedExercises[i]
        const plannedSets = plannedExercises[i].sets
        for (let j = 0; j < plannedSets.length; j++) {
          const plannedSet = plannedSets[j]
          const set = {
            _id: uuid.v4(),
            type: plannedSet.type,
            exercise: plannedSet.exercise,
            reps: plannedSet.plannedReps,
            weight: parseFloat(
              selectWeight(plannedSet, exercise.exercise)
            ).toLocaleString("en-US", { maximumFractionDigits: 2 }),
          }

          plannedSets[j] = { ...set }
        }
      }

      setExercises(plannedExercises)
      setWorkout({
        name: plannedWorkout.name,
        notes: plannedWorkout.notes,
        duration: plannedWorkout.estimatedDuration,
      })
    }
  }, [])

  const confirmCancel = () => {
    Alert.alert(`Cancel workout?`, "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => navigation.goBack() },
    ])
  }

  const addExercise = (newExercise) => {
    const newSet = {
      _id: uuid.v4(),
      type: "work",
      exercise: newExercise._id,
      weight: "",
      reps: "",
    }

    return setExercises([
      ...exercises,
      {
        exercise: newExercise,
        sets: [newSet],
      },
    ])
  }

  const removeExercise = (exerciseId) => {
    return setExercises(
      [...exercises].filter((e) => e.exercise._id !== exerciseId)
    )
  }

  const submitWorkout = async () => {
    const getUpdated1RM = (set, exercise) => {
      const weight = set.weight
      const reps = set.reps
      const current1RM = exercise.oneRepMax
      const new1RM =
        reps <= 10 ? brzycki1RM(weight, reps) : epley1RM(weight, reps)

      if (new1RM > current1RM) {
        return new1RM.toFixed(2)
      }
      return current1RM
    }

    for (let i = 0; i < exercises.length; i++) {
      const sets = exercises[i].sets
      for (let j = 0; j < sets.length; j++) {
        exercises[i].exercise.oneRepMax = getUpdated1RM(
          sets[j],
          exercises[i].exercise
        )
        delete sets[j]._id
      }

      await dispatch(createMultipleSets(sets)).then((createdSets) => {
        exercises[i].sets = createdSets
        dispatch(
          updateExercise({
            ...exercises[i].exercise,
            sets: exercises[i].exercise.sets.concat(createdSets),
          })
        )
      })
    }

    if (activeRoutine && plannedWorkout) {
      const routineWorkouts = activeRoutine.weeks
        .map((week) => week.plannedWorkouts)
        .flat()
      if (
        routineWorkouts[activeRoutine.completedCount]._id === plannedWorkout._id
      )
        dispatch(updateRoutineCompletedCount(activeRoutine))
    }

    dispatch(
      createWorkout({
        ...workout,
        exercises,
      })
    )
  }

  const addWorkingSet = (id) => {
    const copyOfExercises = JSON.parse(JSON.stringify(exercises)) // deep copy
    const exercise = copyOfExercises.find((e) => e.exercise._id === id)

    const newSet = {
      _id: uuid.v4(),
      type: "work",
      exercise: id,
      weight: "",
      reps: "",
    }

    exercise.sets.push(newSet)
    return setExercises(copyOfExercises)
  }

  const addWarmupSet = (id) => {
    const copyOfExercises = JSON.parse(JSON.stringify(exercises)) // deep copy
    const exercise = copyOfExercises.find((e) => e.exercise._id === id)

    const newWarmupSet = {
      _id: uuid.v4(),
      type: "warmup",
      exercise: id,
      weight: "",
      reps: "",
    }

    const warmupSetAmount = exercise.sets.filter(
      (set) => set.type === "warmup"
    ).length

    if (warmupSetAmount === 0) {
      exercise.sets.unshift(newWarmupSet)
    } else {
      exercise.sets.splice(warmupSetAmount, 0, newWarmupSet)
    }
    return setExercises(copyOfExercises)
  }

  const updateWeightForSet = (exerciseId, setId, weight) => {
    const copyOfExercises = JSON.parse(JSON.stringify(exercises)) // deep copy
    const exercise = copyOfExercises.find((e) => e.exercise._id === exerciseId)
    const set = exercise.sets.find((set) => set._id === setId)
    set.weight = weight
    return setExercises(copyOfExercises)
  }

  const updateRepsForSet = (exerciseId, setId, reps) => {
    const copyOfExercises = JSON.parse(JSON.stringify(exercises)) // deep copy
    const exercise = copyOfExercises.find((e) => e.exercise._id === exerciseId)
    const set = exercise.sets.find((set) => set._id === setId)
    set.reps = reps
    return setExercises(copyOfExercises)
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
        name="Logger"
        options={({ navigation }) => ({
          presentation: "transparentModal",
          headerShadowVisible: false,
          headerTitle: () => <Stopwatch startTime={startTime} />,
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
                  setFinishTime(Date.now())
                  navigation.navigate("FinishWorkout")
                }}
              />
            </View>
          ),
        })}
      >
        {(props) => (
          <Logger
            exercises={exercises}
            addWorkingSet={addWorkingSet}
            addWarmupSet={addWarmupSet}
            updateWeightForSet={updateWeightForSet}
            updateRepsForSet={updateRepsForSet}
            workout={workout}
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
        name="FinishWorkout"
        options={({ navigation }) => ({
          presentation: "card",
          headerTitle: "Finish workout",
          headerShadowVisible: false,
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
          headerRight: () => (
            <DoneButton
              disabled={!workout.name || !workout.duration}
              onPress={() => {
                submitWorkout()
                navigation.navigate("TabNavigator")
                navigation.navigate("HomeStack")
              }}
            />
          ),
        })}
      >
        {(props) => (
          <FinishWorkoutScreen
            startTime={startTime}
            finishTime={finishTime}
            workout={workout}
            setWorkout={setWorkout}
            {...props}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default LoggerStack
