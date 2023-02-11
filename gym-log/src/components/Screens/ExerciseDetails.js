import { View, Text, Button } from "react-native"
import { useSelector } from "react-redux";
import { selectExerciseById } from "../../redux/reducers/exerciseReducer"
import { useTheme } from '@react-navigation/native';


const ExerciseDetails = ({ route, navigation }) => {
  const id = route.params
  const exercise = useSelector(state => selectExerciseById(state, id))    
  const { colors } = useTheme();
  
  const { name, instructions, primaryMuscles, secondaryMuscles, oneRepMax } = exercise

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
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
            Primary Muscles
          </Text>
          {primaryMuscles.map((muscle) => (
            <Text key={muscle}>{muscle}</Text>
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
            Secondary Muscles
          </Text>
          {secondaryMuscles.map((muscle) => (
            <Text key={muscle}>{muscle}</Text>
          ))}
        </View>
      </View>
      
    </View>
  )
}

export default ExerciseDetails
