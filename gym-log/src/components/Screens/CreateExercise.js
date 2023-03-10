import React, { useState, useEffect } from "react"
import { Text, ScrollView, Alert } from "react-native"
import { useDispatch } from "react-redux"
import {
  createExercise,
  updateExercise,
} from "../../redux/reducers/exerciseReducer"
import { useTheme } from "@react-navigation/native"
import { Input, Button, ListItem, Divider, Icon } from "@rneui/themed"
import theme from "../../theme"

const data = [
  { id: 1, muscle: "pectoralis", isChecked: false },
  { id: 2, muscle: "deltoids", isChecked: false },
  { id: 3, muscle: "lats", isChecked: false },
  { id: 4, muscle: "traps", isChecked: false },
  { id: 5, muscle: "biceps", isChecked: false },
  { id: 6, muscle: "triceps", isChecked: false },
  { id: 7, muscle: "abs", isChecked: false },
  { id: 8, muscle: "forearms", isChecked: false },
  { id: 9, muscle: "quadriceps", isChecked: false },
  { id: 10, muscle: "hamstrings", isChecked: false },
  { id: 11, muscle: "gluteals", isChecked: false },
  { id: 12, muscle: "calves", isChecked: false },
]

const CreateExercise = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const [primaryMuscles, setPrimaryMuscles] = useState(data)
  const [primaryMusclesExpanded, setPrimaryMusclesExpanded] = useState(false)
  const [secondaryMuscles, setSecondaryMuscles] = useState(data)
  const [secondaryMusclesExpanded, setSecondaryMusclesExpanded] =
    useState(false)
  const [newExercise, setNewExercise] = useState({
    name: "",
    instructions: "",
    oneRepMax: "",
    oneRepMaxGoal: "",
    primaryMuscles: [],
    secondaryMuscles: [],
    sets: [],
  })

  useEffect(() => {
    if (route.params) {
      const pms = primaryMuscles.map((pm) => {
        return route.params.primaryMuscles.includes(pm.muscle)
          ? { ...pm, isChecked: true }
          : pm
      })
      const sms = secondaryMuscles.map((sm) => {
        return route.params.secondaryMuscles.includes(sm.muscle)
          ? { ...sm, isChecked: true }
          : sm
      })

      setPrimaryMuscles(pms)
      setSecondaryMuscles(sms)
      setNewExercise(JSON.parse(JSON.stringify(route.params)))
    }
  }, [])

  const addExercise = async () => {
    const pms = primaryMuscles
      .filter((pm) => pm.isChecked)
      .map((pm) => pm.muscle)
    const sms = secondaryMuscles
      .filter((sm) => sm.isChecked)
      .map((sm) => sm.muscle)
    newExercise.primaryMuscles = pms
    newExercise.secondaryMuscles = sms
    
    if (!newExercise.oneRepMax) newExercise.oneRepMax = 0
    if (!newExercise.oneRepMaxGoal) newExercise.oneRepMaxGoal = 0

    await dispatch(createExercise(newExercise))
      .then(() => navigation.goBack())
      .catch((err) => err)
  }

  const updateEditedExercise = async () => {
    const pms = primaryMuscles
      .filter((pm) => pm.isChecked)
      .map((pm) => pm.muscle)
    const sms = secondaryMuscles
      .filter((sm) => sm.isChecked)
      .map((sm) => sm.muscle)
    newExercise.primaryMuscles = pms
    newExercise.secondaryMuscles = sms

    if (!newExercise.oneRepMax) newExercise.oneRepMax = 0
    if (!newExercise.oneRepMaxGoal) newExercise.oneRepMaxGoal = 0

    await dispatch(updateExercise(newExercise))
      .then(() => navigation.goBack())
      .catch((err) => err)
  }

  const handleChangePrimary = (id) => {
    let newState = primaryMuscles.map((muscle) => {
      if (id === muscle.id) {
        return { ...muscle, isChecked: !muscle.isChecked }
      }
      return muscle
    })
    setPrimaryMuscles(newState)
  }

  const handleChangeSecondary = (id) => {
    let newState = secondaryMuscles.map((muscle) => {
      if (id === muscle.id) {
        return { ...muscle, isChecked: !muscle.isChecked }
      }
      return muscle
    })
    setSecondaryMuscles(newState)
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background, paddingTop: 20 }}
    >
      <Input
        inputContainerStyle={{}}
        label={"Name"}
        value={newExercise.name}
        selectTextOnFocus={true}
        placeholder={`Name`}
        onChangeText={(value) =>
          setNewExercise({ ...newExercise, name: value })
        }
      />

      <Input
        inputContainerStyle={{}}
        label={"Instructions"}
        value={newExercise.instructions}
        selectTextOnFocus={true}
        placeholder={`Instructions`}
        onChangeText={(value) =>
          setNewExercise({ ...newExercise, instructions: value })
        }
      />

      <Input
        inputContainerStyle={{}}
        label={"1RM"}
        keyboardType="decimal-pad"
        maxLength={6}
        selectTextOnFocus={true}
        value={`${newExercise.oneRepMax}`.replace(",", ".")}
        placeholder={`Defaults to 0, updates automatically`}
        onChangeText={(value) =>
          setNewExercise({ ...newExercise, oneRepMax: value })
        }
      />

      <Input
        inputContainerStyle={{}}
        label={"1RM Goal"}
        keyboardType="decimal-pad"
        maxLength={6}
        selectTextOnFocus={true}
        value={`${newExercise.oneRepMaxGoal}`.replace(",", ".")}
        placeholder={`Defaults to 0`}
        onChangeText={(value) =>
          setNewExercise({ ...newExercise, oneRepMaxGoal: value })
        }
      />

      <ListItem.Accordion
        icon={
          <Icon
            name={"chevron-down"}
            type="material-community"
            style={{ color: theme.colors.primary }}
          />
        }
        content={
          <ListItem.Content>
            <ListItem.Title>Primary muscles</ListItem.Title>
            <ListItem.Subtitle>Tap to expand</ListItem.Subtitle>
          </ListItem.Content>
        }
        isExpanded={primaryMusclesExpanded}
        onPress={() => {
          setPrimaryMusclesExpanded(!primaryMusclesExpanded)
        }}
      >
        {primaryMuscles
          .filter(
            (pm) => !secondaryMuscles.find((sm) => sm.id === pm.id).isChecked
          )
          .map((item) => {
            return (
              <ListItem key={item.id} bottomDivider>
                <ListItem.CheckBox
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  checked={item.isChecked}
                  onPress={() => handleChangePrimary(item.id)}
                />
                <ListItem.Content>
                  <ListItem.Title>{item.muscle}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            )
          })}
      </ListItem.Accordion>

      <Divider style={{ marginVertical: 20 }} />

      <ListItem.Accordion
        icon={
          <Icon
            name={"chevron-down"}
            type="material-community"
            style={{ color: theme.colors.primary }}
          />
        }
        content={
          <ListItem.Content>
            <ListItem.Title>Secondary muscles</ListItem.Title>
            <ListItem.Subtitle>Tap to expand</ListItem.Subtitle>
          </ListItem.Content>
        }
        isExpanded={secondaryMusclesExpanded}
        onPress={() => {
          setSecondaryMusclesExpanded(!secondaryMusclesExpanded)
        }}
      >
        {secondaryMuscles
          .filter(
            (sm) => !primaryMuscles.find((pm) => pm.id === sm.id).isChecked
          )
          .map((item) => {
            return (
              <ListItem key={item.id} bottomDivider>
                <ListItem.CheckBox
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  checked={item.isChecked}
                  onPress={() => handleChangeSecondary(item.id)}
                />
                <ListItem.Content>
                  <ListItem.Title>{item.muscle}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            )
          })}
      </ListItem.Accordion>

      {route.params ? (
        <Button
          containerStyle={{ marginVertical: 50 }}
          onPress={() => updateEditedExercise()}
          title="Update"
          disabled={!newExercise.name}
        />
      ) : (
        <Button
          containerStyle={{ marginVertical: 50 }}
          onPress={() => addExercise()}
          title="Create"
          disabled={!newExercise.name}
        />
      )}
    </ScrollView>
  )
}

export default CreateExercise
