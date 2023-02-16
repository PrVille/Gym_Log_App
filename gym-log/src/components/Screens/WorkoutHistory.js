import React from "react"
import {
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native"
import { ListItem, Icon, Button, SearchBar, FAB, Chip } from "@rneui/themed"
import { selectWorkouts } from "../../redux/reducers/workoutReducer"
import { useSelector, useDispatch } from "react-redux"
import { deleteWorkout } from "../../redux/reducers/workoutReducer"
import { deleteSet } from "../../redux/reducers/setReducer"
import { useTheme } from "@react-navigation/native"
import { selectSets, refetchSets } from "../../redux/reducers/setReducer"

const WorkoutListItem = ({ workout, navigation, removeWorkout }) => {
  const confirmDeletion = (workout) => {
    Alert.alert(
      `Delete ${workout.name}?`,
      "This will delete the workout and all related data (sets)",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Delete", onPress: () => removeWorkout(workout._id) },
      ]
    )
  }

  return (
    <ListItem.Swipeable
      onPress={() => navigation.navigate("WorkoutDetails", workout._id)}
      leftContent={(reset) => (
        <Button
          title="Edit"
          titleStyle={{ color: "white" }}
          onPress={() => {
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
            confirmDeletion(workout)
            reset()
          }}
          icon={{ name: "delete", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
        />
      )}
    >
      <Icon name="archive-check" type="material-community" size={50} />
      <ListItem.Content>
        <ListItem.Title>{workout.name}</ListItem.Title>
        <ListItem.Subtitle>
          Exercises: {workout.exercises.length} | Duration: {workout.duration}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  )
}

const ItemSeparator = () => <View style={{ height: 5 }} />

const WorkoutHistory = ({ params, navigation }) => {
  const workouts = useSelector(selectWorkouts)
  const sets = useSelector(selectSets)
  const dispatch = useDispatch()
  const { colors } = useTheme()

  const removeWorkout = (id) => {
    try {
      dispatch(deleteWorkout(id)).then(dispatch(refetchSets()))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
        <View
          style={{
            backgroundColor: colors.background,
            flex: 1,
          }}
        >
          <FlatList
            data={workouts}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
              <WorkoutListItem
              workout={item}
              navigation={navigation}
              removeWorkout={removeWorkout}
            />
            )}
          />
        </View>
      </>
    </TouchableWithoutFeedback>
  )
}

export default WorkoutHistory
