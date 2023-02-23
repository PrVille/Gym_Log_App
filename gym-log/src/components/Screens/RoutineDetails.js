import { StyleSheet, ScrollView, SafeAreaView, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import {
  selectRoutineById,
  selectActiveRoutine,
  updateRoutine,
} from "../../redux/reducers/routineReducer"
import { useEffect } from "react"
import Section from "../Utils/Section"
import Card from "../Utils/Card"
import { Button } from "@rneui/themed"
import theme from "../../theme"
import { setNotification } from "../../redux/reducers/notificationReducer"

const RoutineDetails = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const id = route.params
  const routine = useSelector((state) => selectRoutineById(state, id))
  const activeRoutine = useSelector(selectActiveRoutine)
  const { name, notes, weeks, active, completedCount } = routine

  useEffect(() => {
    navigation.setOptions({
      title: name,
    })
  }, [])

  const notify = (message, type = "info") => {
    dispatch(setNotification({ message, type }, 5))
  }

  const toggleActive = () => {
    try {
      if (activeRoutine && activeRoutine._id !== id)
        notify("You are already following a routine!")
      else dispatch(updateRoutine({ ...routine, active: !routine.active }))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Section>
          <Section.SubSection divider>
            <Section.SubSectionItem>
              <Section.SubSectionItemTitle>Weeks</Section.SubSectionItemTitle>
              <Section.SubSectionItemBody>
                {weeks.length}
              </Section.SubSectionItemBody>
            </Section.SubSectionItem>
            <Section.SubSectionItem>
              <Section.SubSectionItemTitle>
                Workouts
              </Section.SubSectionItemTitle>
              <Section.SubSectionItemBody>
                {weeks.map((week) => week.plannedWorkouts).flat().length}
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
          onPress={toggleActive}
          title={active ? "Unfollow routine" : "Follow routine"}
        />

        {weeks.map((week, i) => (
          <View key={i}>
            <View
              style={{
                marginVertical: 15,
                marginHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontSize: theme.fontSizes.heading,
                  color: theme.colors.primary,
                  fontWeight: theme.fontWeights.bold,
                }}
              >
                {weeks.length === 1 ? "Weekly" : "Week " + week.week}
              </Text>
            </View>
            {week.plannedWorkouts.map((plannedWorkout, i) => (
              <Card key={i}>
                <Card.Header
                  divider
                  buttonTitle="Workout Details"
                  onButtonPress={() =>
                    navigation.navigate(
                      "PlannedWorkoutDetails",
                      plannedWorkout._id
                    )
                  }
                >
                  {"Day " + (i + 1) + ": "}
                  {plannedWorkout.name}
                </Card.Header>

                <Card.Body>
                  {plannedWorkout.plannedExercises.map((plannedExercise) => (
                    <Card.Row key={plannedExercise.exercise._id} disableSwipe>
                      <Card.Column alignItems="flex-start">
                        {plannedExercise.exercise.name}
                      </Card.Column>
                      <Card.Column>
                        {plannedExercise.sets.length === 1
                          ? plannedExercise.sets.length + " set"
                          : plannedExercise.sets.length + " sets"}
                      </Card.Column>
                      <Card.Column>
                        {plannedExercise.sets
                          .map((set) => set.plannedReps)
                          .reduce((a, b) => a + b, 0)}{" "}
                        reps
                      </Card.Column>
                    </Card.Row>
                  ))}
                </Card.Body>
              </Card>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default RoutineDetails
