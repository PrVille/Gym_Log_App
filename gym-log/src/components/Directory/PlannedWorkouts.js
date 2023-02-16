import React, { useState, createRef } from "react"
import {
  Text,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import Search from "../Utils/Search"
import { useSelector, useDispatch } from "react-redux"
import { selectPlannedWorkoutsByQuery, deletePlannedWorkout } from "../../redux/reducers/plannedWorkoutReducer"
import { ListItem, Icon, Button, SearchBar, FAB, Chip } from "@rneui/themed"
import { useTheme } from "@react-navigation/native"
import { refetchPlannedSets } from "../../redux/reducers/plannedSetReducer"

const Stack = createStackNavigator()

const PlannedWorkoutListItem = ({
  plannedWorkout,
  navigation,
  removePlannedWorkout,
}) => {
  const confirmDeletion = (plannedWorkout) => {
    Alert.alert(
      `Delete ${plannedWorkout.name}?`,
      "This will delete the planned workout and all related data (planned sets)",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Delete", onPress: () => removePlannedWorkout(plannedWorkout._id) },
      ]
    )
  }

  return (
    <ListItem.Swipeable
      onPress={() =>
        navigation.navigate("PlannedWorkoutDetails", plannedWorkout._id)
      }
      leftContent={(reset) => (
        <Button
          title="Edit"
          titleStyle={{ color: "white" }}
          onPress={() => {
            navigation.navigate("CreatePlannedWorkout", plannedWorkout._id)
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
            confirmDeletion(plannedWorkout)
            reset()
          }}
          icon={{ name: "delete", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
        />
      )}
    >
      <Icon name="dumbbell" type="material-community" size={50} />
      <ListItem.Content>
        <ListItem.Title>{plannedWorkout.name}</ListItem.Title>
        <ListItem.Subtitle>Exercises: {plannedWorkout.plannedExercises.length} | Duration: {plannedWorkout.estimatedDuration} </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  )
}

const ItemSeparator = () => <View style={{ height: 5 }} />

const PlannedWorkoutList = ({ navigation, searchQuery }) => {
  const dispatch = useDispatch()
  const plannedWorkouts = useSelector((state) =>
    selectPlannedWorkoutsByQuery(state, searchQuery)
  )
  const { colors } = useTheme()

  const removePlannedWorkout = (id) => {
    try {
      dispatch(deletePlannedWorkout(id)).then(() => {
        dispatch(refetchPlannedSets())
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
        <FlatList
          data={plannedWorkouts}
          ItemSeparatorComponent={ItemSeparator}
          ListFooterComponent={<View style={{height: 100}}></View>}
          renderItem={({ item }) => (
            <PlannedWorkoutListItem
              plannedWorkout={item}
              navigation={navigation}
              removePlannedWorkout={removePlannedWorkout}
            />
          )}
        />
        <FAB
          icon={{ name: "add", color: colors.background }}
          onPress={() => navigation.navigate("CreatePlannedWorkout")}
        />
      </>
    </TouchableWithoutFeedback>
  )
}

const PlannedWorkouts = ({ params }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const onChangeSearch = (query) => setSearchQuery(query)
  const { colors } = useTheme()
  let searchRef = createRef()

  return (
    <Stack.Navigator
      screenOptions={{
        headerStatusBarHeight: 0,
        headerStyle: {
          height: 60,
        },
        cardStyle: {},
      }}
    >
      <Stack.Screen
        name="PlannedWorkoutList"
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
                    color: colors.primary,
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
                    color: colors.primary,
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
        {(props) => <PlannedWorkoutList searchQuery={searchQuery} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default PlannedWorkouts
