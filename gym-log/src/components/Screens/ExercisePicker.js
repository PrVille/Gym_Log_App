import { View, FlatList, SafeAreaView } from "react-native"
import { useSelector } from "react-redux"
import { selectExercisesByQuery } from "../../redux/reducers/exerciseReducer"
import { useTheme } from "@react-navigation/native"
import { ListItem, Icon, FAB } from "@rneui/themed"
import { useState, createRef, useMemo } from "react"
import Header from "../Utils/Header"
import { selectUser } from "../../redux/reducers/userReducer"

const ItemSeparator = () => <View style={{ height: 5 }} />

const ExercisePicker = ({ navigation, onSelection, existingExercises }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [order, setOrder] = useState("asc")
  const countWarmupSets =
    useSelector(selectUser).settings.general.countWarmupSets
  const onChangeSearch = (query) => setSearchQuery(query)
  const toggleOrder = () => setOrder(order === "asc" ? "desc" : "asc")
  let searchRef = createRef()
  const exercises = useSelector((state) =>
    selectExercisesByQuery(state, searchQuery)
  )
  const { colors } = useTheme()

  useMemo(
    () =>
      order === "asc"
        ? exercises.sort((a, b) => (a.name > b.name ? 1 : -1))
        : exercises.sort((a, b) => (a.name < b.name ? 1 : -1)),
    [order, exercises]
  )

  const availableExercises = exercises.filter(
    (exercise) => !existingExercises.includes(exercise._id)
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        onChangeSearch={onChangeSearch}
        searchQuery={searchQuery}
        searchRef={searchRef}
        order={order}
        toggleOrder={toggleOrder}
      />

      <FlatList
        style={{ backgroundColor: colors.background }}
        data={availableExercises}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => {
          const sets = countWarmupSets
            ? item.sets
            : item.sets.filter((set) => set.type !== "warmup")
          return (
            <ListItem
              onPress={() => {
                onSelection(item)
                navigation.goBack()
              }}
            >
              <Icon name="image" size={50} />
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>
                  Sets: {sets.length} | Volume:{" "}
                  {sets
                    .map((set) => set.weight * set.reps)
                    .reduce((a, b) => a + b, 0)}{" "}
                  kg
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          )
        }}
      />
      <FAB
        icon={{ name: "add", color: colors.background }}
        onPress={() => navigation.navigate("CreateExercise")}
      />
    </SafeAreaView>
  )
}

export default ExercisePicker
