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
import { refetchWorkouts, selectWorkouts } from "../../redux/reducers/workoutReducer"
import { useSelector, useDispatch } from "react-redux"
import { deleteWorkout } from "../../redux/reducers/workoutReducer"
import { deleteSet, selectSetsByExerciseId } from "../../redux/reducers/setReducer"
import { useTheme } from "@react-navigation/native"
import { selectSets, refetchSets } from "../../redux/reducers/setReducer"
import { refetchExercises } from "../../redux/reducers/exerciseReducer"

const SetListItem = ({ set, navigation, removeSet }) => {
  const confirmDeletion = (set) => {
    Alert.alert(
      `Delete set?`,
      "This will delete the set and all related data",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Delete", onPress: () => removeSet(set._id) },
      ]
    )
  }

  return (
    <ListItem.Swipeable
      rightContent={(reset) => (
        <Button
          title="Delete"
          titleStyle={{ color: "white" }}
          onPress={() => {
            confirmDeletion(set)
            reset()
          }}
          icon={{ name: "delete", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
        />
      )}
    >
      <Icon name="archive-check" type="material-community" size={50} />
      <ListItem.Content>
        <ListItem.Title>{set.createdAt}</ListItem.Title>
        <ListItem.Subtitle>
          {set.type} | {set.reps} reps | {set.weight} kg
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  )
}

const ItemSeparator = () => <View style={{ height: 5 }} />

const SetHistory = ({ route, navigation }) => {
  const sets = useSelector(state => selectSetsByExerciseId(state, route.params))
  const dispatch = useDispatch()
  const { colors } = useTheme()

  const removeSet = async (id) => {
    try {
      dispatch(deleteSet(id)).then(() => {
        dispatch(refetchExercises())
        dispatch(refetchWorkouts())
      })
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
            data={sets}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
              <SetListItem
                set={item}
                navigation={navigation}
                removeSet={removeSet}
              />
            )}
          />
        </View>
      </>
    </TouchableWithoutFeedback>
  )
}

export default SetHistory
