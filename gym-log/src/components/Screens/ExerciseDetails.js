import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native"
import { Icon, Button } from "@rneui/themed"

import { useSelector } from "react-redux"
import { selectExerciseById } from "../../redux/reducers/exerciseReducer"
import { useTheme } from "@react-navigation/native"
import { useEffect } from "react"
import Section from "../Utils/Section"

const ExerciseDetails = ({ route, navigation }) => {
  const id = route.params
  const exercise = useSelector((state) => selectExerciseById(state, id))
  const { colors } = useTheme()
  const { width } = Dimensions.get("screen")
  const {
    name,
    instructions,
    primaryMuscles,
    secondaryMuscles,
    oneRepMax,
    oneRepMaxGoal,
    sets,
  } = exercise

  useEffect(() => {
    navigation.setOptions({
      title: name,
    })
  }, [])

  const SetVolumeRecord = () => {
    if (sets.length === 0) return 0
    const recordSet = sets.reduce((prev, current) =>
      prev.weight * prev.reps > current.weight * current.reps ? prev : current
    )
    return `${(recordSet.weight * recordSet.reps)} kg in ${recordSet.reps} reps`
  }

  return (
    <ScrollView contentInset={{ bottom: 50 }}>
      <Icon size={width} name="image" />

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
              {sets.length === 0 ? 0 : Math.max(...sets.map((set) => set.weight))} kg
            </Section.SubSectionItemBody>
          </Section.SubSectionItem>

          <Section.SubSectionItem>
            <Section.SubSectionItemTitle>
              Volume Record
            </Section.SubSectionItemTitle>
            <Section.SubSectionItemBody>
            {SetVolumeRecord()}
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
              {sets.map((set) => set.weight * set.reps).reduce((a, b) => a + b, 0)} kg
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
