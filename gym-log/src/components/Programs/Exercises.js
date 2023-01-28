import React from "react"
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  Pressable,
  TextInput,
} from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import Ionicons from "@expo/vector-icons/Ionicons"
import exercises from "../../../data"

const Stack = createStackNavigator()

const CreateExercise = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>
        IMPLEMENT: Creation of a new exercise here
      </Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  )
}

const ExerciseDetails = ({ route }) => {
  const { primaryMuscleGroups, secondaryMuscleGroups, instructions } =
    route.params

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 0,
          margin: 5,
          alignItems: "center",
        }}
      >
        <Text>{instructions}</Text>
      </View>
      <View
        style={{
          paddingTop: 20,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            flex: 0,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            Primary Muscle Groups
          </Text>
          {primaryMuscleGroups.map((muscleGroup) => (
            <Text key={muscleGroup}>{muscleGroup}</Text>
          ))}
        </View>
        <View
          style={{
            flex: 0,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            Secondary Muscle Groups
          </Text>
          {secondaryMuscleGroups.map((muscleGroup) => (
            <Text key={muscleGroup}>{muscleGroup}</Text>
          ))}
        </View>
      </View>
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
  return (
    <FlatList
      data={exercises}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigation.navigate("ExerciseDetails", item)}>
          <ExerciseCard item={item} />
        </Pressable>
      )}
    />
  )
}

const Search = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        marginStart: 10,
      }}
    >
      <Ionicons name="search-outline" size={30} />
      <TextInput
        style={{
          padding: 7,
          marginStart: 5,
          flex: 1,
          borderRadius: 5,
          borderWidth: 2,
          overflow: "hidden",
          borderColor: "grey",
        }}
        placeholder="Search"
      />
    </View>
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
      <Stack.Screen
        name="ExerciseDetails"
        component={ExerciseDetails}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
    </Stack.Navigator>
  )
}

export default Exercises
