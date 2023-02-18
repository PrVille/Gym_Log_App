import React, { createRef, useMemo, useState } from "react"
import {
  View,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import {
  selectExercisesByQuery,
  deleteExercise,
} from "../../redux/reducers/exerciseReducer"
import { ListItem, Icon, Button, SearchBar, FAB, Chip } from "@rneui/themed"
import theme from "../../theme"
import { useDispatch, useSelector } from "react-redux"
import { refetchWorkouts } from "../../redux/reducers/workoutReducer"
import { refetchSets } from "../../redux/reducers/setReducer"
import { refetchPlannedSets } from "../../redux/reducers/plannedSetReducer"
import { refetchPlannedWorkouts } from "../../redux/reducers/plannedWorkoutReducer"
import Header from "../Utils/Header"

const Stack = createStackNavigator()

const ExerciseListItem = ({ exercise, navigation, removeExercise }) => {
  const confirmDeletion = (exercise) => {
    Alert.alert(
      `Delete ${exercise.name}?`,
      "This will delete the exercise and all related data (sets, planned sets, exercise in workouts and planned workouts)",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Delete", onPress: () => removeExercise(exercise._id) },
      ]
    )
  }

  return (
    <ListItem.Swipeable
      onPress={() => navigation.navigate("ExerciseDetails", exercise._id)}
      leftContent={(reset) => (
        <Button
          title="Edit"
          titleStyle={{ color: "white" }}
          onPress={() => {
            navigation.navigate("CreateExercise", exercise)
            reset()
          }}
          icon={{ name: "edit", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "blue" }}
        />
      )}
      rightContent={(reset) => (
        <Button
          title="Delete"
          titleStyle={{ color: "white" }}
          onPress={() => {
            confirmDeletion(exercise)
            reset()
          }}
          icon={{ name: "delete", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
        />
      )}
    >
      <Icon name="image" size={50} />
      <ListItem.Content>
        <ListItem.Title>{exercise.name}</ListItem.Title>
        <ListItem.Subtitle>
          Sets: {exercise.sets.length} | Volume:{" "}
          {exercise.sets.map((set) => set.weight * set.reps).reduce((a, b) => a + b, 0)} kg
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  )
}

const ItemSeparator = () => <View style={{ height: 5 }} />

const ExerciseList = ({ navigation, searchQuery, order }) => {
  const dispatch = useDispatch()
  const exercises = useSelector((state) =>
    selectExercisesByQuery(state, searchQuery)
  )
  useMemo(
    () =>
      order === "asc"
        ? exercises.sort((a, b) => (a.name > b.name ? 1 : -1))
        : exercises.sort((a, b) => (a.name < b.name ? 1 : -1)),
    [order, exercises]
  )

  const removeExercise = (id) => {
    try {
      dispatch(deleteExercise(id)).then(() => {
        dispatch(refetchSets())
        dispatch(refetchWorkouts())
        dispatch(refetchPlannedSets())
        dispatch(refetchPlannedWorkouts())
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>

        <FlatList
          data={exercises}
          ItemSeparatorComponent={ItemSeparator}
          ListFooterComponent={<View style={{ height: 100 }}></View>}
          renderItem={({ item }) => (
            <ExerciseListItem
              exercise={item}
              navigation={navigation}
              removeExercise={removeExercise}
            />
          )}
        />
        <FAB
          icon={{ name: "add", color: theme.colors.paleDogwood }}
          onPress={() => navigation.navigate("CreateExercise")}
        />
      </>
    </TouchableWithoutFeedback>
  )
}

const Exercises = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [order, setOrder] = useState("asc")
  const onChangeSearch = (query) => setSearchQuery(query)
  const toggleOrder = () => setOrder(order === "asc" ? "desc" : "asc")

  let searchRef = createRef()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExerciseList"
        options={({ navigation }) => ({
          header: (props) => (
            <Header
              onChangeSearch={onChangeSearch}
              searchQuery={searchQuery}
              searchRef={searchRef}
              order={order}
              toggleOrder={toggleOrder}
            />
          ),
        })}
      >
        {(props) => (
          <ExerciseList searchQuery={searchQuery} order={order} {...props} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default Exercises