import React from "react"
import { Text, View } from "react-native"
import useWorkouts from "../../hooks/useWorkouts"

const WorkoutHistory = ({ params }) => {
  const { workouts, loading } = useWorkouts()

  if (loading) return null
  console.log(workouts);
  
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
