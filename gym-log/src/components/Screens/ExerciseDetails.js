import { View, Text, Button } from "react-native"
import useExercise from "../../hooks/useExercise"

const ExerciseDetails = ({ route, navigation }) => {
  const id = route.params
  const { exercise, loading } = useExercise(id)

  if (loading) return null

  const { instructions, primaryMuscleGroups, secondaryMuscleGroups } = exercise

  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flex: 0,
          margin: 5,
          alignItems: "center",
        }}
      >
        <Button onPress={() => navigation.goBack()} title="go back" />
        <Text>{instructions}</Text>
      </View>
      <View
        style={{
          paddingTop: 20,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            flex: 0,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            Primary Muscle Groups
          </Text>
          {primaryMuscleGroups.map((muscleGroup) => (
            <Text key={muscleGroup}>{muscleGroup}</Text>
          ))}
        </View>
        <View
          style={{
            flex: 0,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            Secondary Muscle Groups
          </Text>
          {secondaryMuscleGroups.map((muscleGroup) => (
            <Text key={muscleGroup}>{muscleGroup}</Text>
          ))}
        </View>
      </View>
      
    </View>
  )
}

export default ExerciseDetails
