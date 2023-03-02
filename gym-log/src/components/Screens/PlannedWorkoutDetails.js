import { StyleSheet, ScrollView, SafeAreaView } from "react-native"
import { useSelector } from "react-redux"
import { selectPlannedWorkoutById } from "../../redux/reducers/plannedWorkoutReducer"
import { useEffect } from "react"
import Section from "../Utils/Section"
import Card from "../Utils/Card"
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

  const primaryMuscles = [
    ...new Set(plannedExercises.map((p) => p.exercise.primaryMuscles).flat()),
  ]
  const secondaryMuscles = [
    ...new Set(plannedExercises.map((p) => p.exercise.secondaryMuscles).flat()),
  ].filter((muscle) => !primaryMuscles.includes(muscle))

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Section>
          <Section.SubSection divider>
            <Section.SubSectionItem>
              <Section.SubSectionItemTitle>
                Exercises
              </Section.SubSectionItemTitle>
              <Section.SubSectionItemBody>
                {plannedExercises.length}
              </Section.SubSectionItemBody>
            </Section.SubSectionItem>
            <Section.SubSectionItem>
              <Section.SubSectionItemTitle>
                Estimated Duration
              </Section.SubSectionItemTitle>
              <Section.SubSectionItemBody>
                {estimatedDuration} min
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

        <Section>
          <Section.Title>Target muscles</Section.Title>

          <Section.SubSection divider>
            <Section.SubSectionItem>
              <Section.SubSectionItemTitle>Primary</Section.SubSectionItemTitle>
              <Section.SubSectionItemBody>
                {primaryMuscles.join(", ")}
              </Section.SubSectionItemBody>
            </Section.SubSectionItem>
          </Section.SubSection>

          <Section.SubSection divider>
            <Section.SubSectionItem>
              <Section.SubSectionItemTitle>
                Secondary
              </Section.SubSectionItemTitle>
              <Section.SubSectionItemBody>
                {secondaryMuscles.join(", ")}
              </Section.SubSectionItemBody>
            </Section.SubSectionItem>
          </Section.SubSection>
        </Section>

        <Button
          containerStyle={{ marginBottom: 10, marginHorizontal: 10 }}
          onPress={() => navigation.navigate("LoggerStack", id)}
          title="Start workout"
        />

        {plannedExercises.map((exercise) => (
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

            <Card.Body>
              {exercise.sets.map((set, index) => (
                <Card.Row key={set._id} disableSwipe>
                  <Card.Column alignItems="flex-start">{index + 1}</Card.Column>

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
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default PlannedWorkoutDetails
