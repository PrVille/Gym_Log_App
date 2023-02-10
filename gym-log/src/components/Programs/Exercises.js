import React from "react"
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import Search from "../Utils/Search"
import { useSelector, useDispatch } from "react-redux";
import { selectExercises, createExercise } from "../../redux/reducers/exerciseReducer"


const Stack = createStackNavigator()

const CreateExercise = ({ navigation }) => {
  const dispatch = useDispatch()

  const newExercise = {
    name: "test6",
    instructions: "just do it",
    oneRepMax: 50,
    primaryMuscleGroups: ["head"],
    secondaryMuscleGroups: ["legs"],
    primaryMuscles: ["finger"],
    secondaryMuscles: ["toe"],
    sets: []
  }

  const addExercise = () => {
    dispatch(createExercise(newExercise)).then(res => console.log(res))
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => addExercise()} title="Create" />
      <Text style={{ fontSize: 30 }}>
        IMPLEMENT: Creation of a new exercise here
      </Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  )
}

const ExerciseCard = ({ item }) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        alignItems: "stretch",
        borderRadius: 5,
        borderWidth: 2,
        overflow: "hidden",
        borderColor: "grey",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {item.name}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            flex: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Total Sets</Text>
          <Text>12</Text>
        </View>
        <View
          style={{
            flex: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Total Volume</Text>
          <Text>1000</Text>
        </View>
        <View
          style={{
            flex: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Estimated 1RM</Text>
          <Text>100</Text>
        </View>
      </View>
    </View>
  )
}

const ItemSeparator = () => <View style={{ height: 5 }} />

const ExerciseList = ({ navigation }) => {
  const exercises = useSelector(selectExercises);
  console.log(exercises.length);
  
  return (
    <FlatList
      data={exercises}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigation.navigate("ExerciseDetails", item._id)}>
          <ExerciseCard item={item} />
        </Pressable>
      )}
    />
  )
}

const Exercises = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStatusBarHeight: 0,
        headerStyle: {
          backgroundColor: "white",
          height: 60,
        },
        cardStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen
        name="ExerciseList"
        component={ExerciseList}
        options={({ navigation }) => ({
          headerTitle: "",
          headerLeft: (props) => <Search {...props} />,
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginEnd: 10,
                paddingEnd: 10,
                paddingStart: 10,
                flex: 1,
                alignContent: "center",
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("CreateExercise")}
            >
              <Text style={{ fontSize: 30 }}>+</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="CreateExercise"
        component={CreateExercise}
        options={{ headerBackTitle: "Cancel", headerTitle: "" }}
      />

    </Stack.Navigator>
  )
}

export default Exercises
