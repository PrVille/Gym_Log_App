import React from "react"
import { Text, View, FlatList, Pressable, Alert } from "react-native"
import { selectWorkouts } from "../../redux/reducers/workoutReducer"
import { useSelector, useDispatch } from "react-redux"
import { deleteWorkout } from "../../redux/reducers/workoutReducer"
import { deleteSet } from "../../redux/reducers/setReducer"
import { useTheme } from "@react-navigation/native"
import { selectSets, initializeSets } from "../../redux/reducers/setReducer"

const WorkoutCard = ({ workout }) => {
  const dispatch = useDispatch()

  const confirm = () => {
    Alert.alert(
      `Remove ${workout.name}?`,
      "This will remove workout and all related completed sets form history",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => handlePress() },
      ]
    )
  }

  //no need to await ??
  const handlePress = async () => {
    try {
      await dispatch(deleteWorkout(workout._id)).then((res) => console.log(res))
      dispatch(initializeSets())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        justifyContent: "space-between",
        alignItems: "stretch",
        borderRadius: 5,
        borderWidth: 2,
        overflow: "hidden",
        borderColor: "grey",
        flexDirection: "row",
      }}
    >
      <Text style={{ textAlign: "center" }}>{workout.name}</Text>
      <Pressable onPress={() => confirm()}>
        <Text>REMOVE</Text>
      </Pressable>
    </View>
  )
}

const ItemSeparator = () => <View style={{ height: 5 }} />

const WorkoutHistory = ({ params, navigation }) => {
  const workouts = useSelector(selectWorkouts)
  const sets = useSelector(selectSets)

  const { colors } = useTheme()

  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}
    >
      <FlatList
      ListHeaderComponent={      <Text>Sets: {sets.length}</Text>
    }
        data={workouts}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("WorkoutDetails", item._id)}
          >
            <WorkoutCard workout={item} />
          </Pressable>
        )}
      />
    </View>
  )
}

export default WorkoutHistory
