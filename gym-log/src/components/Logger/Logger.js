import React, { useState } from "react"
import {
  Text,
  View,
  Button,
  FlatList,
  Pressable,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native"
import Stopwatch from "../Utils/Stopwatch"
import { createStackNavigator } from "@react-navigation/stack"
import exercises from "../../../data"

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
          <Text style={{ marginTop: 10, alignSelf: "center"}}>{item.name}</Text>
        </Pressable>
      )}
    />
  )
}

const ExerciseCard = ({ exercise, sets, updateSets }) => {
    
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
      <View style={{
        margin: 5
      }}>
        {sets.map((set, i) => {            
          return (
            <View key={i} style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,

            }}>
              <Text>{i + 1}</Text>
              <Text>{set.type}</Text>
              <Text>{set.weight} kg</Text>
              <Text>{set.reps} reps</Text>
            </View>
          )
        })}
        <TouchableOpacity onPress={() => updateSets(exercise.id)}>
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

const Logger = ({ navigation, exercises, sets, updateSets }) => {
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
        {exercises.map((exercise, i) => (
          <ExerciseCard key={i} exercise={exercise} sets={sets.filter(set => set.exerciseId == exercise.id)} updateSets={updateSets} />
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

const LoggerStack = ({ route, navigation }) => {
  const [exercises, setExercises] = useState([])
  const [sets, setSets] = useState([])

  const updateExercises = (newExercise) => {
    setSets([...sets,
      {
        //new set
        exerciseId: newExercise.id,
        type: "working", //default
        weight: 0, //default
        reps: 0, //default
      },
      {
        exerciseId: newExercise.id,
        type: "warmup", //default
        weight: 0, //default
        reps: 0, //default
      },
    ])

    return setExercises([...exercises, newExercise])
  }

  const updateSets = (id) => {
    const newSet = {
        //new set
        exerciseId: id,
        type: "working", //default
        weight: 0, //default
        reps: 0, //default
      }
    return setSets([...sets, newSet])
  }


  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        presentation: "transparentModal",
        headerTitle: () => <Stopwatch />,
        headerLeft: () => (
          <Button
            onPress={() => navigation.goBack()}
            title="Cancel"
            color="black"
          />
        ),
        headerRight: () => (
          <Button
            onPress={() => alert("Finish workout?")}
            title="Finish"
            color="black"
          />
        ),
      })}
    >
      <Stack.Screen name="Logger">
        {(props) => <Logger exercises={exercises} sets={sets} updateSets={updateSets} {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="ExerciseList"
        options={({ navigation }) => ({
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
    </Stack.Navigator>
  )
}

export default LoggerStack
