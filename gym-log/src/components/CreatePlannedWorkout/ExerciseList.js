import { Text, View, FlatList, Pressable } from "react-native"
import useExercises from "../../hooks/useExercises"

const ItemSeparator = () => <View style={{ height: 5 }} />

const ExerciseList = ({ navigation, addExercise }) => {
  const { exercises, loading } = useExercises({ fields: ["name", "_id"] })

  if (loading) return null

  return (
    <FlatList
      style={{ backgroundColor: "white" }}
      data={exercises}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => {
        return (
          <Pressable
            onPress={() => {
              addExercise(item)
              navigation.navigate("Planner")
            }}
          >
            <Text style={{ marginTop: 10, alignSelf: "center" }}>
              {item.name}
            </Text>
          </Pressable>
        )
      }}
    />
  )
}

export default ExerciseList
