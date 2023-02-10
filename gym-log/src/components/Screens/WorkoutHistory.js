import React from "react"
import { Text, View } from "react-native"
import { useSelector } from "react-redux";
import { selectWorkouts } from "../../redux/reducers/workoutReducer"

const WorkoutHistory = ({ params }) => {
  const workouts = useSelector(selectWorkouts)
  
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      {workouts.map(workout => (
        <Text key={workout._id}>{workout.name}</Text>
      ))}
    </View>
  )
}

export default WorkoutHistory
