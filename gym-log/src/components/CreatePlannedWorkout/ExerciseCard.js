import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native"
import theme from "../../theme"

const ExerciseCardHeader = ({ exerciseName, exerciseId, navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{exerciseName}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("ExerciseDetails", exerciseId)}
      >
        <Text>Exercise Details</Text>
      </TouchableOpacity>
    </View>
  )
}

const PlannedSet = ({
  set,
  setNumber,
}) => {
  return (
    <>
      <Text>{setNumber}</Text>
      <Text>{set.type}</Text>
      {set.plannedWeightType === "oneRepMaxPercentage" && (
        <Text>{set.oneRepMaxPercentage} %</Text>
      )}
      {set.plannedWeightType === "plannedWeight" && (
        <Text>{set.plannedWeight} kg</Text>
      )}
      {set.plannedWeightType === "previousWeight" && (
        <Text>prev</Text>
      )}
      <Text>{set.plannedReps}</Text>
    </>
  )
}

const PlannedSets = ({
  sets,
}) => {
  return (
    <View style={styles.plannedSetsContainer}>
      {sets.map((set, i) => (
        <View key={set._id} style={styles.plannedSetContainer}>
          <PlannedSet
            set={set}
            setNumber={i + 1}
          />
        </View>
      ))}
    </View>
  )
}

const ExerciseCard = ({
  exercise,
  navigation,
}) => {
  
  return (
    <View style={styles.cardContainer}>
      <ExerciseCardHeader
        exerciseName={exercise.exercise.name}
        exerciseId={exercise.exercise._id}
        navigation={navigation}
      />
      <PlannedSets
        sets={exercise.sets}
        exerciseId={exercise.exercise._id}
      />
      <TouchableOpacity onPress={() => navigation.navigate("CreatePlannedSet", exercise.exercise._id)}>
        <Text>ADD SET</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 2,
    overflow: "hidden",
    borderColor: "grey",
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: "bold",
  },
  plannedSetsContainer: {
    margin: 5,
  },
  plannedSetContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
})

export default ExerciseCard
