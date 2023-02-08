import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import ExerciseCard from "./ExerciseCard"
import RestTimer from "./RestTimer"
import theme from "../../theme"

const Planner = ({
  navigation,
  exercises,
}) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>{"Your Planned Workout"}</Text>
        </View>

        {exercises.map((exercise, i) => (
          <ExerciseCard
            key={i}
            exercise={exercise}
            navigation={navigation}
          />
        ))}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ExerciseList")}
        >
          <Text style={{ fontWeight: "bold" }}>Add Exercise</Text>
        </TouchableOpacity>
      </ScrollView>

      <RestTimer />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  container: {
    alignItems: "center",
    margin: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: theme.fontSizes.heading,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 2,
    overflow: "hidden",
    borderColor: "black",
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 40,
  },
})

export default Planner
