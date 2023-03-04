import { Text, View, FlatList, Pressable, SafeAreaView } from "react-native"
import { useSelector } from "react-redux"
import { selectPlannedWorkoutsByQuery } from "../../redux/reducers/plannedWorkoutReducer"
import { ListItem, Icon, Button, SearchBar, FAB, Chip } from "@rneui/themed"
import { useState, createRef, useMemo } from "react"
import Header from "../Utils/Header"
import theme from "../../theme"

const ItemSeparator = () => <View style={{ height: 5 }} />

const PlannedWorkoutPicker = ({ navigation, onSelection, route }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [order, setOrder] = useState("asc")
  const onChangeSearch = (query) => setSearchQuery(query)
  const toggleOrder = () => setOrder(order === "asc" ? "desc" : "asc")
  let searchRef = createRef()
  const plannedWorkouts = useSelector((state) =>
    selectPlannedWorkoutsByQuery(state, searchQuery)
  )

  useMemo(
    () =>
      order === "asc"
        ? plannedWorkouts.sort((a, b) => (a.name > b.name ? 1 : -1))
        : plannedWorkouts.sort((a, b) => (a.name < b.name ? 1 : -1)),
    [order, plannedWorkouts]
  )

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        onChangeSearch={onChangeSearch}
        searchQuery={searchQuery}
        searchRef={searchRef}
        order={order}
        toggleOrder={toggleOrder}
      />
      <FlatList
        style={{ backgroundColor: theme.colors.background }}
        data={plannedWorkouts}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => {
          return (
            <ListItem
              onPress={() => {
                onSelection(route.params, item)
                navigation.goBack()
              }}
            >
              <Icon name="dumbbell" type="material-community" size={50} />
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>
                  Exercises: {item.plannedExercises.length} | Duration:{" "}
                  {item.estimatedDuration}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          )
        }}
      />

      <FAB
        icon={{ name: "add", color: theme.colors.background }}
        onPress={() => navigation.navigate("CreatePlannedWorkout")}
      />
    </SafeAreaView>
  )
}

export default PlannedWorkoutPicker
