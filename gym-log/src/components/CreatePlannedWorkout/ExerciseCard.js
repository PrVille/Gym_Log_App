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
  exerciseId,
  updatePlannedRepsForSet,
  updateWeightTypeForSet,
}) => {

  const cycleWeightType = () => {
    const type = set.plannedWeightType
    let value
    console.log(type);
    if (type === "previousWeight") {
        value = "oneRepMaxPercentage"
    } else if (type === "oneRepMaxPercentage") {
        value = "plannedWeight"
    } else if (type === "plannedWeight") {
        value = "previousWeight"
    }
    updateWeightTypeForSet(exerciseId, set._id, value)
  }

  return (
    <>
      <Text>{setNumber}</Text>
      <Text>{set.type}</Text>
      <TouchableOpacity onPress={() => cycleWeightType()}>
        <Text>{set.plannedWeightType}</Text>
      </TouchableOpacity>
      <TextInput
                placeholder={`reps`}
                onChangeText={(value) =>
                  updateRepsForSet(exercise._id, set._id, value)
                }
              />
    </>
  )
}

const PlannedSets = ({
  sets,
  exerciseId,
  updateWeightTypeForSet,
  updatePlannedRepsForSet,
}) => {
  return (
    <View style={styles.plannedSetsContainer}>
      {sets.map((set, i) => (
        <View key={set._id} style={styles.plannedSetContainer}>
          <PlannedSet
            set={set}
            setNumber={i + 1}
            exerciseId={exerciseId}
            updatePlannedRepsForSet={updatePlannedRepsForSet}
            updateWeightTypeForSet={updateWeightTypeForSet}
          />
        </View>
      ))}
    </View>
  )
}

const ExerciseCard = ({
  exercise,
  addWorkingSet,
  addWarmupSet,
  updateWeightTypeForSet,
  updatePlannedRepsForSet,
  navigation,
}) => {
  return (
    <View style={styles.cardContainer}>
      <ExerciseCardHeader
        exerciseName={exercise.name}
        exerciseId={exercise._id}
        navigation={navigation}
      />
      <TouchableOpacity onPress={() => addWarmupSet(exercise._id)}>
        <Text>ADD WARMUP SET</Text>
      </TouchableOpacity>
      <PlannedSets
        sets={exercise.sets}
        exerciseId={exercise._id}
        updatePlannedRepsForSet={updatePlannedRepsForSet}
        updateWeightTypeForSet={updateWeightTypeForSet}
      />
      <TouchableOpacity onPress={() => addWorkingSet(exercise._id)}>
        <Text>ADD WORKING SET</Text>
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
