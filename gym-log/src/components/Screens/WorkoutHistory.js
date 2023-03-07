import { useState, useMemo, createRef } from "react"
import {
  View,
  FlatList,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native"
import { ListItem, Icon, Button } from "@rneui/themed"
import { selectWorkoutsByQuery } from "../../redux/reducers/workoutReducer"
import { useSelector, useDispatch } from "react-redux"
import { deleteWorkout } from "../../redux/reducers/workoutReducer"
import { useTheme } from "@react-navigation/native"
import { selectSets, refetchSets } from "../../redux/reducers/setReducer"
import { refetchExercises } from "../../redux/reducers/exerciseReducer"
import { createStackNavigator } from "@react-navigation/stack"
import Header from "../Utils/Header"
import { compareAsc, compareDesc, parseISO, format } from "date-fns"

const WorkoutListItem = ({ workout, navigation, removeWorkout }) => {
  const confirmDeletion = (workout) => {
    Alert.alert(
      `Delete ${workout.name}?`,
      "This will delete the workout and all related data.",
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
          {format(parseISO(workout.createdAt), "dd.MM.yy hh:mm")}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  )
}

const ItemSeparator = () => <View style={{ height: 5 }} />

const Stack = createStackNavigator()

const WorkoutHistory = ({ params, navigation }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [order, setOrder] = useState("descDate")
  const workouts = useSelector((state) =>
    selectWorkoutsByQuery(state, searchQuery)
  )
  const sets = useSelector(selectSets)
  const dispatch = useDispatch()
  const { colors } = useTheme()

  const onChangeSearch = (query) => setSearchQuery(query)
  const toggleOrder = () =>
    setOrder(order === "ascDate" ? "descDate" : "ascDate")

  let searchRef = createRef()

  useMemo(
    () =>
      order === "ascDate"
        ? workouts.sort((a, b) =>
            compareAsc(parseISO(a.createdAt), parseISO(b.createdAt))
          )
        : workouts.sort((a, b) =>
            compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
          ),
    [order, workouts]
  )

  const removeWorkout = (id) => {
    try {
      dispatch(deleteWorkout(id)).then(() => {
        dispatch(refetchExercises())
        dispatch(refetchSets())
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WorkoutHistoryWithSearchAndSorting"
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
          <SafeAreaView
            style={{
              backgroundColor: colors.background,
              flex: 1,
            }}
          >
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
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
            </TouchableWithoutFeedback>
          </SafeAreaView>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default WorkoutHistory
