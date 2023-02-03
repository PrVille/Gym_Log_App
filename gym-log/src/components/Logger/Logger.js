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
import exercises from "../../../data"
import FinishWorkoutScreen from "./FinishWorkoutScreen"
import theme from "../../theme"
import uuid from "react-native-uuid"

const DynamicComponents = () => {
  const [components, setComponents] = useState([])

  const renderNewField = () => {
    return setComponents([...components, "new component"])
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Components</Text>
      <Button title="Add new" onPress={renderNewField} />
      {components.map((component, i) => {
        return <Text key={i}>{component}</Text>
      })}
    </View>
  )
}

const ItemSeparator = () => <View style={{ height: 5 }} />

const ExerciseList = ({ navigation, updateExercises }) => {
  return (
    <FlatList
      style={{ backgroundColor: "white" }}
      data={exercises}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
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
      )}
    />
  )
}


const ExerciseCard = ({
  exercise,
  sets,
  addWorkingSet,
  addWarmupSet,
  updateWeightForSet,
  updateRepsForSet,
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
        <TouchableOpacity>
          <Text>Exercise Details</Text>
        </TouchableOpacity>
      </View>
      {/** SETS */}
      <View
        style={{
          margin: 5,
        }}
      >
        <TouchableOpacity onPress={() => addWarmupSet(exercise.id)}>
          <Text>ADD WARMUP SET</Text>
        </TouchableOpacity>
        {sets.map((set, i) => {
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
                onChangeText={(value) => updateWeightForSet(exercise.id, set.id, value)}
              />
              <TextInput
                placeholder={`${set.reps} reps`}
                onChangeText={(value) => updateRepsForSet(exercise.id, set.id, value)}
              />
            </View>
          )
        })}
        <TouchableOpacity onPress={() => addWorkingSet(exercise.id)}>
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
  sets,
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
            sets={sets[exercise.id]}
            addWorkingSet={addWorkingSet}
            addWarmupSet={addWarmupSet}
            updateWeightForSet={updateWeightForSet}
            updateRepsForSet={updateRepsForSet}
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
  const [startTime] = useState(Date.now())
  const [finishTime, setFinishTime] = useState()
  const [exercises, setExercises] = useState([])
  const [sets, setSets] = useState({}) //[workoutid] -> [sets]
  const [plannedWorkout, setPlannedWorkout] = useState(null)

  useEffect(() => {
    const populateWorkout = (plannedWorkout) => {
      setExercises(plannedWorkout.exercises)
      plannedWorkout.exercises.forEach((exercise) => {
        sets[exercise.id] = exercise.sets
      })
      setSets({ ...sets })
    }
    setPlannedWorkout(route.params)
    route.params ? populateWorkout(route.params) : null
  }, [])

  const updateExercises = (newExercise) => {
    sets[newExercise.id] = [
      {
        //new set
        id: uuid.v4(),
        type: "working", //default
        weight: 0, //default
        reps: 0, //default
      },
    ]

    setSets({ ...sets })
    return setExercises([...exercises, newExercise])
  }

  const submitWorkout = () => {
    console.log(exercises.map((e) => e.name))
    console.log(sets)
  }

  const addWorkingSet = (id) => {
    sets[id].push({
      //new set
      id: uuid.v4(),
      type: "working", //default
      weight: 0, //default
      reps: 0, //default
    })
    return setSets({ ...sets })
  }

  const addWarmupSet = (id) => {
    const newSet = {
      //new set
      id: uuid.v4(),
      type: "warmup", //default
      weight: 0, //default
      reps: 0, //default
    }

    const warmupSetAmount = sets[id].filter(
      (set) => set.type === "warmup"
    ).length

    if (warmupSetAmount === 0) {
      sets[id].unshift(newSet)
      return setSets({ ...sets })
    }

    sets[id].splice(warmupSetAmount, 0, newSet)
    return setSets({ ...sets })
  }

  const updateWeightForSet = (exerciseId, setId, weight) => {
    sets[exerciseId].find(set => set.id === setId).weight = weight
    setSets({ ...sets })
  }

  const updateRepsForSet = (exerciseId, setId, reps) => {
    sets[exerciseId].find(set => set.id === setId).reps = reps
    setSets({ ...sets })
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
            sets={sets}
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
