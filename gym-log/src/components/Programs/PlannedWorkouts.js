import React, { useState } from "react"
import { Text, View, FlatList, Pressable, TouchableOpacity } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import Search from "../Utils/Search"
import { useSelector, useDispatch } from "react-redux";
import { selectPlannedWorkouts } from "../../redux/reducers/plannedWorkoutReducer"

const Stack = createStackNavigator()

const PlannedWorkoutCard = ({ item }) => {
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
          <Text>Exercises</Text>
          <Text>6</Text>
        </View>
        <View
          style={{
            flex: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Total Sets</Text>
          <Text>20</Text>
        </View>
        <View
          style={{
            flex: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Estimated duration</Text>
          <Text>60 min</Text>
        </View>
      </View>
    </View>
  )
}

const ItemSeparator = () => <View style={{ height: 5 }} />

const PlannedWorkoutList = ({ navigation }) => {
  const plannedWorkouts = useSelector(selectPlannedWorkouts)

  return (
    <FlatList
      data={plannedWorkouts}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigation.navigate("PlannedWorkoutDetails", item._id)}
        >
          <Text
            style={{
              position: "absolute",
              backgroundColor: "white",
              zIndex: 10,
              marginRight: 100,
              alignSelf: "flex-end",
              marginTop: -10
            }}
          >
            LABEL
          </Text>
          <PlannedWorkoutCard item={item} />
        </Pressable>
      )}
    />
  )
}

const PlannedWorkouts = ({ params }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStatusBarHeight: 0,
        headerStyle: {
          height: 60,
        },
        cardStyle: {
        },
      }}
    >
      <Stack.Screen
        name="PlannedWorkoutList"
        component={PlannedWorkoutList}
        options={({ navigation }) => ({
          headerTitle: "",
          headerLeft: (props) => <Search {...props} />,
          headerRight: () => (
            <View
              style={{ flex: 1, flexDirection: "row",  }}
            >
              <TouchableOpacity
                style={{
                  marginEnd: 10,
                  paddingEnd: 10,
                  paddingStart: 10,
                  flex: 0,
                  alignContent: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("WorkoutHistory")}
              >
                <Text style={{ fontSize: 30 }}>H</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginEnd: 10,
                  paddingEnd: 10,
                  paddingStart: 10,
                  flex: 0,
                  alignContent: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("CreatePlannedWorkout")}
              >
                <Text style={{ fontSize: 30 }}>+</Text>
              </TouchableOpacity>
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  )
}

export default PlannedWorkouts
