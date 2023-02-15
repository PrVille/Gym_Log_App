import React, { createRef, useState } from "react"
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
import {
  selectWorkouts,
  initializeWorkouts,
} from "../../redux/reducers/workoutReducer"
import { initializeSets } from "../../redux/reducers/setReducer"
import { initializePlannedSets } from "../../redux/reducers/plannedSetReducer"
import { initializePlannedWorkouts } from "../../redux/reducers/plannedWorkoutReducer"

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
        { text: "Delete", onPress: () => removeExercise(exercise) },
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
          {exercise.sets.map((set) => set.weight).reduce((a, b) => a + b, 0)} kg
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  )
}

const ItemSeparator = () => <View style={{ height: 5 }} />

const ExerciseList = ({ navigation, searchQuery }) => {
  const dispatch = useDispatch()
  const exercises = useSelector((state) =>
    selectExercisesByQuery(state, searchQuery)
  )

  //
  const removeExercise = (exercise) => {
    try {
      dispatch(deleteExercise(exercise._id)).then((res) => {
        //refresh cascading deleted
        dispatch(initializeSets())
        dispatch(initializeWorkouts())
        dispatch(initializePlannedSets())
        dispatch(initializePlannedWorkouts())
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
  const onChangeSearch = (query) => setSearchQuery(query)
  let searchRef = createRef()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExerciseList"
        options={({ navigation }) => ({
          header: (props) => (
            <>
              <SearchBar
                onChangeText={onChangeSearch}
                value={searchQuery}
                searchIcon={<Icon name="search" />}
                ref={(search) => (searchRef = search)}
                clearIcon={
                  <Icon name="clear" onPress={() => searchRef.clear()} />
                }
              />
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 5,
                  marginBottom: 5,
                }}
              >
                <Chip
                  title="Sort"
                  icon={{
                    name: "sort-alpha-asc",
                    type: "font-awesome",
                    size: 20,
                    color: theme.colors.chineseViolet,
                  }}
                  onPress={() => console.log("Sort ascending!")}
                  type="outline"
                  containerStyle={{ marginEnd: 5 }}
                />
                <Chip
                  title="Filter"
                  icon={{
                    name: "arm-flex",
                    type: "material-community",
                    size: 20,
                    color: theme.colors.chineseViolet,
                  }}
                  onPress={() => console.log("Filter by muscle!")}
                  type="outline"
                  containerStyle={{ marginEnd: 5 }}
                />
              </View>
            </>
          ),
        })}
      >
        {(props) => <ExerciseList searchQuery={searchQuery} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default Exercises
