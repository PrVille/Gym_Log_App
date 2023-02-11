import React from "react"
import { Text, View } from "react-native"
import { useSelector } from "react-redux"
import { selectWorkoutById } from "../../redux/reducers/workoutReducer"
import { useTheme } from '@react-navigation/native';


const WorkoutDetails = ({ params, route, navigation }) => {
  const id = route.params
  const workout = useSelector(state => selectWorkoutById(state, id))
  const { colors } = useTheme()

  const { name, notes, duration, exercises, createdAt } = workout    

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{name}</Text>
      <Text>{notes}</Text>
      <Text>{duration}</Text>
      <Text>{createdAt}</Text>
    </View>
  )
}

export default WorkoutDetails
