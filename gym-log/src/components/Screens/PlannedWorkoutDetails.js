import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native"
import { useSelector } from "react-redux"
import { selectPlannedWorkoutById } from "../../redux/reducers/plannedWorkoutReducer"
import { useEffect } from "react"
import Section from "../Utils/Section"
import ExerciseCard from "../Utils/ExerciseCard"
import { Button } from "@rneui/themed"

const PlannedWorkoutDetails = ({ route, navigation }) => {
  const id = route.params
  const plannedWorkout = useSelector((state) =>
    selectPlannedWorkoutById(state, id)
  )
  const { name, notes, estimatedDuration, plannedExercises } = plannedWorkout

  useEffect(() => {
    navigation.setOptions({
      title: name,
    })
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
    <ScrollView >
      <Section>
        <Section.SubSection divider>
          <Section.SubSectionItem>
            <Section.SubSectionItemTitle>Exercises</Section.SubSectionItemTitle>
            <Section.SubSectionItemBody>
              {plannedExercises.length}
            </Section.SubSectionItemBody>
          </Section.SubSectionItem>
          <Section.SubSectionItem>
            <Section.SubSectionItemTitle>
              Estimated Duration
            </Section.SubSectionItemTitle>
            <Section.SubSectionItemBody>
              {estimatedDuration}
            </Section.SubSectionItemBody>
          </Section.SubSectionItem>
        </Section.SubSection>
        <Section.SubSection divider>
          <Section.SubSectionItem>
            <Section.SubSectionItemTitle>Notes</Section.SubSectionItemTitle>
            <Section.SubSectionItemBody>{notes}</Section.SubSectionItemBody>
          </Section.SubSectionItem>
        </Section.SubSection>
      </Section>

      <Button
        containerStyle={{ marginBottom: 10, marginHorizontal: 10 }}
        onPress={() => navigation.navigate("LoggerStack", { plannedWorkout })}
        title="Start workout"
      />

      {plannedExercises.map((exercise) => (
        <ExerciseCard key={exercise.exercise._id}>
          <ExerciseCard.Header
            divider
            buttonTitle="Exercise Details"
            onButtonPress={() =>
              navigation.navigate("ExerciseDetails", exercise.exercise._id)
            }
          >
            {exercise.exercise.name}
          </ExerciseCard.Header>

          <ExerciseCard.Body>
            {exercise.sets.map((set, index) => (
              <ExerciseCard.Row key={set._id} disableSwipe>
                <ExerciseCard.Column alignItems="flex-start">
                  {index + 1}
                </ExerciseCard.Column>

                <ExerciseCard.IconColumn
                  name={set.type === "warmup" ? "fitness" : "weight-lifter"}
                  type={
                    set.type === "warmup" ? "ionicon" : "material-community"
                  }
                />
                <ExerciseCard.IconColumn
                  name={
                    set.plannedWeightType === "previousWeight"
                      ? "skip-backward"
                      : set.plannedWeightType === "oneRepMaxPercentage"
                      ? "percent"
                      : "weight-kilogram"
                  }
                  type="material-community"
                />
                <ExerciseCard.Column>{set.plannedReps}</ExerciseCard.Column>

                <ExerciseCard.Column>
                  {set.plannedWeightType === "previousWeight"
                    ? "-"
                    : set.plannedWeightType === "oneRepMaxPercentage"
                    ? set.oneRepMaxPercentage
                    : set.plannedWeight}
                </ExerciseCard.Column>
              </ExerciseCard.Row>
            ))}
          </ExerciseCard.Body>
        </ExerciseCard>
      ))}
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default PlannedWorkoutDetails
