import { useState, useEffect, useMemo } from "react"
import {
  View,
  FlatList,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native"
import { ListItem, Icon, Button, Chip } from "@rneui/themed"
import {
  refetchWorkouts,
} from "../../redux/reducers/workoutReducer"
import { useSelector, useDispatch } from "react-redux"
import {
  deleteSet,
  selectSetsByExerciseId,
} from "../../redux/reducers/setReducer"
import { useTheme } from "@react-navigation/native"
import { refetchExercises } from "../../redux/reducers/exerciseReducer"
import { createStackNavigator } from "@react-navigation/stack"
import { compareAsc, compareDesc, parseISO, format } from "date-fns"
import theme from "../../theme"

const SetListItem = ({ set, navigation, removeSet }) => {
  const confirmDeletion = (set) => {
    Alert.alert(
      `Delete set?`,
      "This will delete the set and all related data.",
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
        <ListItem.Title>{set.type} | {set.reps} reps | {set.weight} kg</ListItem.Title>
        <ListItem.Subtitle>
        {format(parseISO(set.createdAt), "dd.MM.yy hh:mm")}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  )
}

const ItemSeparator = () => <View style={{ height: 5 }} />

const Stack = createStackNavigator()

const SetHistory = ({ route, navigation }) => {
  const sets = useSelector((state) =>
    selectSetsByExerciseId(state, route.params)
  )
  const [order, setOrder] = useState("desc")
  const toggleOrder = () => setOrder(order === "asc" ? "desc" : "asc")

  const dispatch = useDispatch()
  const { colors } = useTheme()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Chip
          icon={{
            name:
              order === "asc"
                ? "sort-calendar-ascending"
                : "sort-calendar-descending",
            type: "material-community",
            size: 20,
            color: theme.colors.primary,
          }}
          onPress={toggleOrder}
          type="outline"
          containerStyle={{ marginEnd: 10 }}
        />
      ),
    })
  }, [order])

  useMemo(
    () =>
      order === "asc"
        ? sets.sort((a, b) =>
            compareAsc(parseISO(a.createdAt), parseISO(b.createdAt))
          )
        : sets.sort((a, b) =>
            compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
          ),
    [order, sets]
  )

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
    <Stack.Navigator>
      <Stack.Screen
        name="SetHistoryWithSorting"
        options={({ navigation }) => ({
          header: (props) => null,
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
            </TouchableWithoutFeedback>
          </SafeAreaView>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default SetHistory
