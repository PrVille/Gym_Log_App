import React, { useState, useEffect } from "react"
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native"
import Stopwatch from "../Utils/Stopwatch"
import RestTimer from "../Utils/RestTimer"
import { createStackNavigator } from "@react-navigation/stack"
import FinishWorkoutScreen from "./FinishWorkoutScreen"
import theme from "../../theme"
import uuid from "react-native-uuid"
import ExercisePicker from "../Screens/ExercisePicker"
import { useDispatch } from "react-redux"
import { createWorkout } from "../../redux/reducers/workoutReducer"
import { createMultipleSets } from "../../redux/reducers/setReducer"

const ExerciseCard = ({
  exercise,
  addWorkingSet,
  addWarmupSet,
  updateWeightForSet,
  updateRepsForSet,
  navigation,
}) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        marginTop: 10,
        borderRadius: 5,
        borderWidth: 2,
        overflow: "hidden",
        borderColor: "grey",
      }}
    >
      {/** HEADER */}
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 5,
          borderBottomColor: "grey",
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {exercise.exercise.name}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ExerciseDetails", exercise.exercise._id)
          }
        >
          <Text>Exercise Details</Text>
        </TouchableOpacity>
      </View>
      {/** SETS */}
      <View
        style={{
          margin: 5,
        }}
      >
        <TouchableOpacity onPress={() => addWarmupSet(exercise.exercise._id)}>
          <Text>ADD WARMUP SET</Text>
        </TouchableOpacity>
        {exercise.sets.map((set, i) => {
          return (
            <View
              key={i}
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text>{i + 1}</Text>
              <Text>{set.type}</Text>
              <TextInput
                inputMode="numeric"
                keyboardType="numbers-and-punctuation"
                keyboardAppearance="dark"
                value={`${set.weight}`}
                placeholder={`kg`}
                onChangeText={(value) =>
                  updateWeightForSet(exercise.exercise._id, set._id, value)
                }
              />
              <TextInput
                inputMode="numeric"
                placeholder={"reps"}
                value={`${set.reps}`}
                onChangeText={(value) =>
                  updateRepsForSet(exercise.exercise._id, set._id, value)
                }
              />
            </View>
          )
        })}
        <TouchableOpacity onPress={() => addWorkingSet(exercise.exercise._id)}>
          <Text>ADD WORKING SET</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Logger = ({
  navigation,
  exercises,
  addWorkingSet,
  addWarmupSet,
  updateWeightForSet,
  updateRepsForSet,
  workout,
}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          padding: 10,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            alignItems: "center",
            margin: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: theme.fontSizes.heading,
              textAlign: "center",
            }}
          >
            {workout.name}
          </Text>
        </View>

        {exercises.map((exercise, i) => (
          <ExerciseCard
            key={i}
            exercise={exercise}
            addWorkingSet={addWorkingSet}
            addWarmupSet={addWarmupSet}
            updateWeightForSet={updateWeightForSet}
            updateRepsForSet={updateRepsForSet}
            navigation={navigation}
          />
        ))}

        <TouchableOpacity
          style={{
            alignItems: "center",
            borderRadius: 5,
            borderWidth: 2,
            overflow: "hidden",
            borderColor: "black",
            padding: 10,
            marginHorizontal: 5,
            marginVertical: 40,
          }}
          onPress={() => navigation.navigate("ExercisePicker")}
        >
          <Text style={{ fontWeight: "bold" }}>Add Exercise</Text>
        </TouchableOpacity>
      </ScrollView>

      <RestTimer />
    </SafeAreaView>
  )
}

const Stack = createStackNavigator()

const LoggerStack = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const [startTime] = useState(Date.now())
  const [finishTime, setFinishTime] = useState()
  const [exercises, setExercises] = useState([])
  const [workout, setWorkout] = useState({
    name: `${uuid.v4()}`,
    notes: "test",
    duration: 90,
  })

  useEffect(() => {
    console.log(route.params);
    
    if (route.params.plannedWorkout) {
      const plannedWorkout = route.params.plannedWorkout
      const plannedExercises = plannedWorkout.plannedExercises

      for (let i = 0; i < plannedExercises.length; i++) {
        const plannedSets = plannedExercises[i].sets
        for (let j = 0; j < plannedSets.length; j++) {
          const plannedSet = plannedSets[j]
          const set = {
            _id: uuid.v4(),
            type: plannedSet.type,
            exercise: plannedSet.exercise,
            reps: plannedSet.plannedReps,
            weight: plannedSet.weightToUse,
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

  const updateExercises = (newExercise) => {
    const existingExercise = exercises.find(
      (exercise) => exercise.exercise._id === newExercise._id
    )
    if (existingExercise) {
      console.log("EXERCISE ALREADY IN WORKOUT")
      return
    }

    const newSet = {
      _id: uuid.v4(),
      type: "work",
      exercise: newExercise._id,
      weight: 0,
      reps: 0,
    }

    return setExercises([
      ...exercises,
      {
        exercise: newExercise,
        sets: [newSet],
      },
    ])
  }

  const submitWorkout = async () => {
    for (let i = 0; i < exercises.length; i++) {
      const sets = exercises[i].sets
      for (let j = 0; j < sets.length; j++) {
        delete sets[j]._id
      }
      await dispatch(createMultipleSets(sets)).then(
        (createdSets) => (exercises[i].sets = createdSets)
      )
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
      weight: 0,
      reps: 0,
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
      weight: 0,
      reps: 0,
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

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Logger"
        options={({ navigation }) => ({
          presentation: "transparentModal",
          headerTitle: () => <Stopwatch startTime={startTime} />,
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
                setFinishTime(Date.now())
                navigation.navigate("FinishWorkout")
              }}
              title="Finish"
              color="black"
            />
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
          <ExercisePicker
            onSelection={updateExercises}
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
          <FinishWorkoutScreen
            startTime={startTime}
            finishTime={finishTime}
            {...props}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default LoggerStack
