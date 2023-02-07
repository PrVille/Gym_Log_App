import React, { useState, useEffect } from "react"
import {
  Text,
  View,
  Button,
  FlatList,
  Pressable,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native"
import Stopwatch from "../Utils/Stopwatch"
import { createStackNavigator } from "@react-navigation/stack"
import FinishWorkoutScreen from "./FinishWorkoutScreen"
import theme from "../../theme"
import useExercises from "../../hooks/useExercises"
import useSetsService from "../../hooks/useSetsService"
import useWorkoutsService from "../../hooks/useWorkoutsService"

const ItemSeparator = () => <View style={{ height: 5 }} />

const ExerciseList = ({ navigation, updateExercises }) => {
  const { exercises, loading } = useExercises({ fields: ["name", "_id"] })

  return (
    <FlatList
      style={{ backgroundColor: "white" }}
      data={exercises}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => {
        return (
          <Pressable
            onPress={() => {
              updateExercises(item)
              navigation.navigate("Logger")
            }}
          >
            <Text style={{ marginTop: 10, alignSelf: "center" }}>
              {item.name}
            </Text>
          </Pressable>
        )
      }}
    />
  )
}

const ExerciseCard = ({
  exercise,
  addWorkingSet,
  addWarmupSet,
  updateWeightForSet,
  updateRepsForSet,
  navigation
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
          {exercise.name}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("ExerciseDetails", exercise._id)}>
          <Text>Exercise Details</Text>
        </TouchableOpacity>
      </View>
      {/** SETS */}
      <View
        style={{
          margin: 5,
        }}
      >
        <TouchableOpacity onPress={() => addWarmupSet(exercise._id)}>
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
                placeholder={`${set.weight} kg`}
                onChangeText={(value) =>
                  updateWeightForSet(exercise._id, set._id, value)
                }
              />
              <TextInput
                placeholder={`${set.reps} reps`}
                onChangeText={(value) =>
                  updateRepsForSet(exercise._id, set._id, value)
                }
              />
            </View>
          )
        })}
        <TouchableOpacity onPress={() => addWorkingSet(exercise._id)}>
          <Text>ADD WORKING SET</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Footer = () => {
  return (
    <View
      style={{
        height: 50,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>TODO: Rest Timer</Text>
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
  plannedWorkout,
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
            {plannedWorkout ? plannedWorkout.name : "Improvised Workout"}
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
          onPress={() => navigation.navigate("ExerciseList")}
        >
          <Text style={{ fontWeight: "bold" }}>Add Exercise</Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  )
}

const Stack = createStackNavigator()

const LoggerStack = ({ route, navigation, workout }) => {
  const [mode, setMode] = useState()
  const [startTime] = useState(Date.now())
  const [finishTime, setFinishTime] = useState()
  const [exercises, setExercises] = useState([])
  const [plannedWorkout, setPlannedWorkout] = useState(null)
  const { createWorkout } = useWorkoutsService()
  const { createSet, updateSets } = useSetsService()

  useEffect(() => {
    setMode(route.params.mode)
    if (route.params.workout) setPlannedWorkout(route.params.workout)
  }, [])  

  const updateExercises = async (newExercise) => {
    const newSet = await createSet({
      type: "work",
      exercise: newExercise._id,
      weight: 0,
      reps: 0,
    })
    newExercise.sets = [newSet]

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

    const newSet = await createSet({
      type: "work",
      exercise: id,
      weight: 0,
      reps: 0,
    })

    exercise.sets.push(newSet)
    return setExercises(copyOfExercises)
  }

  const addWarmupSet = async (id) => {
    const copyOfExercises = JSON.parse(JSON.stringify(exercises)) // deep copy
    const exercise = copyOfExercises.find((e) => e._id === id)

    const newWarmupSet = await createSet({
      type: "warmup",
      exercise: id,
      weight: 0,
      reps: 0,
    })

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
    const exercise = copyOfExercises.find((e) => e._id === exerciseId)
    const set = exercise.sets.find((set) => set._id === setId)
    set.weight = weight
    return setExercises(copyOfExercises)
  }

  const updateRepsForSet = (exerciseId, setId, reps) => {
    const copyOfExercises = JSON.parse(JSON.stringify(exercises)) // deep copy
    const exercise = copyOfExercises.find((e) => e._id === exerciseId)
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
          headerTitle: () => mode === "planWorkout" ? <Text>Planning workout</Text> : <Stopwatch startTime={startTime} />,
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
            plannedWorkout={plannedWorkout}
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
          <ExerciseList updateExercises={updateExercises} {...props} />
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
