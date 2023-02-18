import React, { useState } from "react"
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native"
import {
  Input,
  Button,
  ListItem,
  Divider,
  ButtonGroup,
  CheckBox,
  Icon,
} from "@rneui/themed"
import { RadioButton } from "react-native-paper"
import uuid from "react-native-uuid"
import { useTheme } from "@react-navigation/native"
import theme from "../../theme"
import Section from "../Utils/Section"

const CreatePlannedSet = ({ route, navigation, addPlannedSet }) => {
  const exerciseId = route.params
  const { colors } = useTheme()
  const [plannedSet, setPlannedSet] = useState({
    type: "work",
    exercise: exerciseId,
    plannedWeightType: "previousWeight",
    plannedReps: 12, //default
  })

  const submitPlannedSet = async () => {
    const newPlannedSet = {
      _id: uuid.v4(),
      ...plannedSet,
    }

    addPlannedSet(exerciseId, newPlannedSet)
    navigation.goBack()
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <ScrollView>
        <Section>
          <Section.SubSection divider>
            <Section.SubSectionItem>
              <Section.SubSectionItemTitle>Type</Section.SubSectionItemTitle>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CheckBox
                  checked={plannedSet.type === "warmup"}
                  title="Warmup"
                  onPress={() =>
                    setPlannedSet({ ...plannedSet, type: "warmup" })
                  }
                />
                <CheckBox
                  checked={plannedSet.type === "work"}
                  title="Working"
                  onPress={() => setPlannedSet({ ...plannedSet, type: "work" })}
                />
              </View>
            </Section.SubSectionItem>
          </Section.SubSection>
        </Section>

        <Section>
          <Section.SubSection>
            <Section.SubSectionItem>
              <Section.SubSectionItemTitle>Weight</Section.SubSectionItemTitle>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CheckBox
                  checked={plannedSet.plannedWeightType === "previousWeight"}
                  title="Fetch Previous"
                  onPress={() =>
                    setPlannedSet({
                      ...plannedSet,
                      plannedWeightType: "previousWeight",
                    })
                  }
                />
                <Icon name="skip-backward" type="material-community" />
              </View>
            </Section.SubSectionItem>
          </Section.SubSection>

          <Section.SubSection>
            <Section.SubSectionItem>
              <CheckBox
                checked={plannedSet.plannedWeightType === "plannedWeight"}
                title="Kg"
                onPress={() =>
                  setPlannedSet({
                    ...plannedSet,
                    plannedWeightType: "plannedWeight",
                  })
                }
              />
            </Section.SubSectionItem>
            <Section.SubSectionItem>
              <Input
                keyboardType="decimal-pad"
                maxLength={6}
                selectTextOnFocus={true}
                disabled={plannedSet.plannedWeightType !== "plannedWeight"}
                containerStyle={{ paddingEnd: 0 }}
                rightIcon={
                  <Icon name="weight-kilogram" type="material-community" />
                }
                placeholder="Planned Weight"
                value={
                  plannedSet.plannedWeight
                    ? plannedSet.plannedWeight.replace(",", ".")
                    : ""
                }
                onChangeText={(value) =>
                  setPlannedSet({ ...plannedSet, plannedWeight: value })
                }
              />
            </Section.SubSectionItem>
          </Section.SubSection>

          <Section.SubSection divider>
            <Section.SubSectionItem>
              <CheckBox
                checked={plannedSet.plannedWeightType === "oneRepMaxPercentage"}
                title="% 1RM"
                onPress={() =>
                  setPlannedSet({
                    ...plannedSet,
                    plannedWeightType: "oneRepMaxPercentage",
                  })
                }
              />
            </Section.SubSectionItem>
            <Section.SubSectionItem>
              <Input
                keyboardType="decimal-pad"
                maxLength={6}
                selectTextOnFocus={true}
                value={
                  plannedSet.oneRepMaxPercentage
                    ? plannedSet.oneRepMaxPercentage.replace(",", ".")
                    : ""
                }
                disabled={
                  plannedSet.plannedWeightType !== "oneRepMaxPercentage"
                }
                containerStyle={{ paddingEnd: 0 }}
                rightIcon={<Icon name="percent" type="material-community" />}
                placeholder={`% of 1RM`}
                onChangeText={(value) =>
                  setPlannedSet({
                    ...plannedSet,
                    oneRepMaxPercentage: value,
                  })
                }
              />
            </Section.SubSectionItem>
          </Section.SubSection>
        </Section>

        <Section divider>
          <Section.SubSection divider>
            <Section.SubSectionItem>
              <Section.SubSectionItemTitle>Reps</Section.SubSectionItemTitle>
              <Input
                containerStyle={{ maxWidth: "40%" }}
                maxLength={3}
                selectTextOnFocus={true}
                keyboardType="number-pad"
                placeholder={`Planned Reps`}
                value={`${plannedSet.plannedReps}`}
                onChangeText={(value) =>
                  setPlannedSet({ ...plannedSet, plannedReps: value })
                }
                errorStyle={{ color: "red" }}
                errorMessage=""
              />
            </Section.SubSectionItem>
          </Section.SubSection>
        </Section>

        <Button
          disabled={
            !plannedSet.plannedReps ||
            (plannedSet.plannedWeightType === "oneRepMaxPercentage" &&
              !plannedSet.oneRepMaxPercentage) ||
            (plannedSet.plannedWeightType === "plannedWeight" &&
              !plannedSet.plannedWeight)
          }
          title="Add Set"
          containerStyle={{ margin: 10 }}
          onPress={() => submitPlannedSet()}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreatePlannedSet
