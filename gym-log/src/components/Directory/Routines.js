import React, { useState, createRef, useMemo } from "react"
import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { useSelector, useDispatch } from "react-redux"
import { ListItem, Icon, Button, FAB } from "@rneui/themed"
import Header from "../Utils/Header"
import theme from "../../theme"
import { selectRoutinesByQuery } from "../../redux/reducers/routineReducer"

const Stack = createStackNavigator()

const RoutineListItem = ({
  routine,
  navigation,
  removeRoutine,
}) => {
  const confirmDeletion = (routine) => {
    Alert.alert(
      `Delete ${routine.name}?`,
      "This will delete the routine and all related data (?)",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Delete", onPress: () => removeRoutine(routine._id) },
      ]
    )
  }

  return (
    <ListItem.Swipeable
      onPress={() =>
        navigation.navigate("RoutineDetails", routine._id)
      }
      leftContent={(reset) => (
        <Button
          title="Edit"
          titleStyle={{ color: "white" }}
          onPress={() => {
            console.log("navigate to edit/create routine")
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
            confirmDeletion(routine)
            reset()
          }}
          icon={{ name: "delete", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
        />
      )}
    >
      <Icon name="calendar" type="material-community" size={50} />
      <ListItem.Content>
        <ListItem.Title>{routine.name}</ListItem.Title>
        <ListItem.Subtitle>Workouts: {routine.weeks.map(week => week.plannedWorkouts).flat().length}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  )
}

const ItemSeparator = () => <View style={{ height: 5 }} />

const RoutinesList = ({ navigation, searchQuery, order }) => {
  const dispatch = useDispatch()
  const routines = useSelector((state) =>
    selectRoutinesByQuery(state, searchQuery)
  )

  useMemo(
    () =>
      order === "asc"
        ? routines.sort((a, b) => (a.name > b.name ? 1 : -1))
        : routines.sort((a, b) => (a.name < b.name ? 1 : -1)),
    [order, routines]
  )

  const removeRoutine = (id) => {
    try {
      console.log("removing routine");
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
      <FlatList
          data={routines}
          ItemSeparatorComponent={ItemSeparator}
          ListFooterComponent={<View style={{height: 100}}></View>}
          renderItem={({ item }) => (
            <RoutineListItem
              routine={item}
              navigation={navigation}
              removeRoutine={removeRoutine}
            />
          )}
        />
        <FAB
          icon={{ name: "add", color: theme.colors.background }}
          onPress={() => console.log("navigate to create routine")}
        />
      </>
    </TouchableWithoutFeedback>
  )
}

const Routines = ({ params }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [order, setOrder] = useState("asc")

  const onChangeSearch = (query) => setSearchQuery(query)
  const toggleOrder = () => setOrder(order === "asc" ? "desc" : "asc")

  let searchRef = createRef()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RoutinesList"
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
          <RoutinesList searchQuery={searchQuery} order={order} {...props} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default Routines
