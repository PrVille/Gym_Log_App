import { Text, View, FlatList, Pressable } from "react-native"
import { useSelector } from "react-redux"
import { selectExercises } from "../../redux/reducers/exerciseReducer"
import { useTheme } from '@react-navigation/native';


const ItemSeparator = () => <View style={{ height: 5 }} />

const ExercisePicker = ({ navigation, onSelection, existingExercises }) => {
  const exercises = useSelector(selectExercises)
  const { colors } = useTheme();
  
  const availableExercises = exercises.filter(exercise => !existingExercises.includes(exercise._id))

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
      data={availableExercises}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => {
        return (
          <Pressable
            style={{
              borderBottomWidth: 2,
              borderBottomColor: "grey",
              borderRadius: 2,
            }}
            onPress={() => {
              onSelection(item)
              navigation.goBack()
            }}
          >
            <Text style={{ marginTop: 10 }}>{item.name}</Text>
          </Pressable>
        )
      }}
    />
  )
}

export default ExercisePicker
