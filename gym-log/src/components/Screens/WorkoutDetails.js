import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectWorkoutById } from "../../redux/reducers/workoutReducer"
import { useTheme } from "@react-navigation/native"
import { StyleSheet, ScrollView, SafeAreaView, Text, View } from "react-native"
import Section from "../Utils/Section"
import Card from "../Utils/Card"
import theme from "../../theme"
import {
  format,
  parseISO
} from "date-fns"

const WorkoutDetails = ({ params, route, navigation }) => {
  const id = route.params
  const workout = useSelector((state) => selectWorkoutById(state, id))
  const { colors } = useTheme()

  const { name, notes, duration, exercises, createdAt } = workout

  useEffect(() => {
    navigation.setOptions({
      title: name,
    })
  }, [])

  const primaryMuscles = [
    ...new Set(exercises.map((p) => p.exercise.primaryMuscles).flat()),
  ]
  const secondaryMuscles = [
    ...new Set(exercises.map((p) => p.exercise.secondaryMuscles).flat()),
  ].filter((muscle) => !primaryMuscles.includes(muscle))

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView>
        <Section>
          <Section.SubSection divider>
            <Section.SubSectionItem>
              <Section.SubSectionItemTitle>
                Exercises
              </Section.SubSectionItemTitle>
              <Section.SubSectionItemBody>
                {exercises.length}
              </Section.SubSectionItemBody>
            </Section.SubSectionItem>
            <Section.SubSectionItem>
              <Section.SubSectionItemTitle>
                Duration
              </Section.SubSectionItemTitle>
              <Section.SubSectionItemBody>
                {duration} min
              </Section.SubSectionItemBody>
            </Section.SubSectionItem>
          </Section.SubSection>
          <Section.SubSection divider>
            <Section.SubSectionItem>
              <Section.SubSectionItemTitle>Sets</Section.SubSectionItemTitle>
              <Section.SubSectionItemBody>
                {exercises.map((e) => e.sets.length).reduce((a, b) => a + b, 0)}
              </Section.SubSectionItemBody>
            </Section.SubSectionItem>
            <Section.SubSectionItem>
              <Section.SubSectionItemTitle>Volume</Section.SubSectionItemTitle>
              <Section.SubSectionItemBody>
                {exercises
                  .map((e) => e.sets)
                  .flat()
                  .map((set) => set.weight * set.reps)
                  .reduce((a, b) => a + b, 0)}{" "}
                kg
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

        {exercises.map((exercise) => (
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

                  <Card.Column>{set.reps}</Card.Column>

                  <Card.Column>{set.weight} kg</Card.Column>
                </Card.Row>
              ))}
            </Card.Body>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  )

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{name}</Text>
      <Text>{notes}</Text>
      <Text>{duration}</Text>
      <Text>{createdAt}</Text>
      {exercises.map((exercise) => {
        return (
          <View key={exercise._id}>
            <Text>
              {exercise.exercise.name}, Sets: {exercise.sets.length}
            </Text>
          </View>
        )
      })}
    </View>
  )
}

export default WorkoutDetails
