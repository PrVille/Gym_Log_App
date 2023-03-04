import { Text, View, ScrollView, SafeAreaView } from "react-native"
import RestTimer from "../Utils/RestTimer"
import theme from "../../theme"
import { useTheme } from "@react-navigation/native"
import { Button, Chip } from "@rneui/themed"
import Card from "../Utils/Card"
import Section from "../Utils/Section"

const Logger = ({
  navigation,
  exercises,
  addWorkingSet,
  addWarmupSet,
  updateWeightForSet,
  updateRepsForSet,
  workout,
  removeSet,
  removeExercise
}) => {
  const { colors } = useTheme()

  const primaryMuscles = [
    ...new Set(exercises.map((p) => p.exercise.primaryMuscles).flat()),
  ]
  const secondaryMuscles = [
    ...new Set(exercises.map((p) => p.exercise.secondaryMuscles).flat()),
  ].filter((muscle) => !primaryMuscles.includes(muscle))

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          padding: 10,
          backgroundColor: colors.background,
        }}
      >
        <View
          style={{
            alignItems: "center",
            margin: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: theme.fontSizes.heading,
              textAlign: "center",
              color: theme.colors.primary,
            }}
          >
            {workout.name}
          </Text>
        </View>

        {exercises.map((exercise, i) => (
          <Card key={exercise.exercise._id}>
            <Card.Header
              divider
              buttonTitle="Exercise Details"
              onButtonPress={() =>
                navigation.navigate("ExerciseDetails", exercise.exercise._id)
              }
              removeIcon
              onIconPress={() => removeExercise(exercise.exercise._id)}
            >
              {exercise.exercise.name}
            </Card.Header>
            <Card.Body divider>
              {exercise.sets.map((set, index) => (
                <Card.Row
                  key={index}
                  onDeletePress={() =>
                    removeSet(exercise.exercise._id, set._id)
                  }
                >
                  <Card.Column alignItems="flex-start">{index + 1}</Card.Column>

                  <Card.IconColumn
                    alignItems="flex-start"
                    name={set.type === "warmup" ? "fitness" : "weight-lifter"}
                    type={
                      set.type === "warmup" ? "ionicon" : "material-community"
                    }
                  />

                  <Card.InputColumn
                    placeholder="Reps"
                    value={`${set.reps}`}
                    onChangeText={(value) =>
                      updateRepsForSet(exercise.exercise._id, set._id, value)
                    }
                  />

                  <Card.InputColumn
                    keyboardType="decimal-pad"
                    placeholder="Kg"
                    value={`${set.weight}`}
                    onChangeText={(value) =>
                      updateWeightForSet(exercise.exercise._id, set._id, value)
                    }
                  />
                </Card.Row>
              ))}
            </Card.Body>
            <Card.Footer>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Chip
                  containerStyle={{
                    marginVertical: 5,
                  }}
                  buttonStyle={{ backgroundColor: theme.colors.background }}
                  titleStyle={{
                    color: theme.colors.primary,
                  }}
                  title="Add Warmup Set"
                  icon={{
                    name: "fitness",
                    type: "ionicon",
                    color: theme.colors.primary,
                  }}
                  iconRight
                  onPress={() => addWarmupSet(exercise.exercise._id)}
                />
                <Chip
                  containerStyle={{
                    marginVertical: 5,
                  }}
                  buttonStyle={{ backgroundColor: theme.colors.background }}
                  titleStyle={{
                    color: theme.colors.primary,
                  }}
                  title="Add Working Set"
                  icon={{
                    name: "weight-lifter",
                    type: "material-community",
                    color: theme.colors.primary,
                  }}
                  iconRight
                  onPress={() => addWorkingSet(exercise.exercise._id)}
                />
              </View>
            </Card.Footer>
          </Card>
        ))}

        <Button
          title="Add Exercise"
          containerStyle={{ margin: 10 }}
          onPress={() => navigation.navigate("ExercisePicker")}
        />

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
      </ScrollView>

      <RestTimer />
    </SafeAreaView>
  )
}

export default Logger
