import { ScrollView, StyleSheet } from "react-native"
import { Icon } from "@rneui/themed"

import { useDispatch, useSelector } from "react-redux"
import {
  selectExerciseById,
  updateExercise,
} from "../../redux/reducers/exerciseReducer"
import { useEffect } from "react"
import Section from "../Utils/Section"
import { selectUser } from "../../redux/reducers/userReducer"

const ExerciseDetails = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const id = route.params
  const exercise = useSelector((state) => selectExerciseById(state, id))
  const countWarmupSets =
    useSelector(selectUser).settings.general.countWarmupSets
  const {
    name,
    instructions,
    favourite,
    primaryMuscles,
    secondaryMuscles,
    oneRepMax,
    oneRepMaxGoal,
  } = exercise

  const sets = countWarmupSets
    ? exercise.sets
    : exercise.sets.filter((set) => set.type !== "warmup")

  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerRight: () => (
        <Icon
          style={{ marginEnd: 10 }}
          size={30}
          name={favourite ? "star" : "star-outline"}
          type="material-community"
          onPress={() =>
            dispatch(
              updateExercise({ ...exercise, favourite: !exercise.favourite })
            )
          }
        />
      ),
    })
  }, [exercise])

  const getVolumeRecord = () => {
    if (sets.length === 0) return 0
    const recordSet = sets.reduce((prev, current) =>
      prev.weight * prev.reps > current.weight * current.reps ? prev : current
    )
    return `${recordSet.weight * recordSet.reps} kg in ${recordSet.reps} reps`
  }

  return (
    <ScrollView>
      <Section>
        <Section.Title
          buttonTitle="Show History"
          onButtonPress={() => navigation.navigate("SetHistory", id)}
        >
          Stats
        </Section.Title>

        <Section.SubSection divider>
          <Section.SubSectionItem>
            <Section.SubSectionItemTitle>1RM</Section.SubSectionItemTitle>
            <Section.SubSectionItemBody>{oneRepMax}</Section.SubSectionItemBody>
          </Section.SubSectionItem>

          <Section.SubSectionItem>
            <Section.SubSectionItemTitle>1RM Goal</Section.SubSectionItemTitle>
            <Section.SubSectionItemBody>
              {oneRepMaxGoal}
            </Section.SubSectionItemBody>
          </Section.SubSectionItem>
        </Section.SubSection>

        <Section.SubSection divider>
          <Section.SubSectionItem>
            <Section.SubSectionItemTitle>
              Weight Record
            </Section.SubSectionItemTitle>
            <Section.SubSectionItemBody>
              {sets.length === 0
                ? 0
                : Math.max(...sets.map((set) => set.weight))}{" "}
              kg
            </Section.SubSectionItemBody>
          </Section.SubSectionItem>

          <Section.SubSectionItem>
            <Section.SubSectionItemTitle>
              Volume Record
            </Section.SubSectionItemTitle>
            <Section.SubSectionItemBody>
              {getVolumeRecord()}
            </Section.SubSectionItemBody>
          </Section.SubSectionItem>
        </Section.SubSection>

        <Section.SubSection divider>
          <Section.SubSectionItem>
            <Section.SubSectionItemTitle>
              Total Sets
            </Section.SubSectionItemTitle>
            <Section.SubSectionItemBody>
              {sets.length}
            </Section.SubSectionItemBody>
          </Section.SubSectionItem>

          <Section.SubSectionItem>
            <Section.SubSectionItemTitle>
              Total Volume
            </Section.SubSectionItemTitle>
            <Section.SubSectionItemBody>
              {sets
                .map((set) => set.weight * set.reps)
                .reduce((a, b) => a + b, 0).toFixed()}{" "}
              kg
            </Section.SubSectionItemBody>
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
            <Section.SubSectionItemTitle>Secondary</Section.SubSectionItemTitle>
            <Section.SubSectionItemBody>
              {secondaryMuscles.join(", ")}
            </Section.SubSectionItemBody>
          </Section.SubSectionItem>
        </Section.SubSection>
      </Section>

      <Section>
        <Section.Title>Instructions</Section.Title>

        <Section.SubSection divider>
          <Section.SubSectionItem>
            <Section.SubSectionItemBody>
              {instructions}
            </Section.SubSectionItemBody>
          </Section.SubSectionItem>
        </Section.SubSection>
      </Section>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})

export default ExerciseDetails
