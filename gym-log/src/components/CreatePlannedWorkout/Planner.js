import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import Card from "../Utils/Card"
import RestTimer from "../Utils/RestTimer"
import theme from "../../theme"
import { Button, Chip } from "@rneui/themed"

const Planner = ({ navigation, exercises, plannedWorkout, removeSet }) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>{plannedWorkout.name}</Text>
        </View>

        {exercises.map((exercise, i) => (
          <Card key={exercise.exercise._id}>
            <Card.Header
              divider
              buttonTitle="Exercise Details"
              onButtonPress={() =>
                navigation.navigate("ExerciseDetails", exercise.exercise._id)
              }
            >
              {exercise.exercise.name}
            </Card.Header>
            <Card.Body divider>
              {exercise.sets.map((set, index) => (
                <Card.Row
                  key={set._id}
                  onDeletePress={() =>
                    removeSet(exercise.exercise._id, set._id)
                  }
                >
                  <Card.Column alignItems="flex-start">
                    {index + 1}
                  </Card.Column>

                  <Card.IconColumn
                    name={set.type === "warmup" ? "fitness" : "weight-lifter"}
                    type={
                      set.type === "warmup" ? "ionicon" : "material-community"
                    }
                  />
                  <Card.IconColumn
                    name={
                      set.plannedWeightType === "previousWeight"
                        ? "skip-backward"
                        : set.plannedWeightType === "oneRepMaxPercentage"
                        ? "percent"
                        : "weight-kilogram"
                    }
                    type="material-community"
                  />
                  <Card.Column>{set.plannedReps}</Card.Column>

                  <Card.Column>
                    {set.plannedWeightType === "previousWeight"
                      ? "-"
                      : set.plannedWeightType === "oneRepMaxPercentage"
                      ? set.oneRepMaxPercentage
                      : set.plannedWeight}
                  </Card.Column>
                </Card.Row>
              ))}
            </Card.Body>
            <Card.Footer>
              <Chip
                containerStyle={{
                  marginVertical: 5,
                  alignItems: "flex-end",
                }}
                buttonStyle={{ backgroundColor: theme.colors.background }}
                titleStyle={{
                  color: theme.colors.primary,
                }}
                title="Add Set"
                icon={{
                  name: "playlist-add",
                  type: "material-icon",
                  color: theme.colors.primary,
                }}
                iconRight
                onPress={() =>
                  navigation.navigate("CreatePlannedSet", exercise.exercise._id)
                }
              />
            </Card.Footer>
          </Card>
        ))}

        <Button
          title="Add Exercise"
          containerStyle={{ margin: 10 }}
          onPress={() => navigation.navigate("ExercisePicker")}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    margin: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: theme.fontSizes.heading,
    textAlign: "center",
    color: theme.colors.primary,
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
