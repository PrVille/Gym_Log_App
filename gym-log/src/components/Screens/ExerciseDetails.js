import { View, Text, Button } from "react-native"
import { useSelector } from "react-redux";
import { selectExerciseById } from "../../redux/reducers/exerciseReducer"


const ExerciseDetails = ({ route, navigation }) => {
  const id = route.params
  const exercise = useSelector(state => selectExerciseById(state, id))    
  
  const { name, instructions, primaryMuscleGroups, secondaryMuscleGroups, oneRepMax } = exercise

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
        <Text>{name}</Text>
        <Text>{oneRepMax}</Text>
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
