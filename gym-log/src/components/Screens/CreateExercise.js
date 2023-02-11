import React, { useState } from "react"
import { Text, ScrollView } from "react-native"
import { useDispatch } from "react-redux"
import { createExercise } from "../../redux/reducers/exerciseReducer"
import { useTheme } from "@react-navigation/native"
import { Input, Button, ListItem, Divider } from "@rneui/themed"

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

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <Text style={{ color: "red", alignSelf: "center", marginVertical: 10 }}>{errorMessage}</Text>
}

const CreateExercise = ({ navigation }) => {
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const [errorMessage, setErrorMessage] = useState(null)
  const [primaryMuscles, setPrimaryMuscles] = useState(data)
  const [primaryMusclesExpanded, setPrimaryMusclesExpanded] = useState(false)
  const [secondaryMuscles, setSecondaryMuscles] = useState(data)
  const [secondaryMusclesExpanded, setSecondaryMusclesExpanded] =
    useState(false)
  const [newExercise, setNewExercise] = useState({
    name: "",
    instructions: "",
    oneRepMax: 0,
    primaryMuscles: [],
    secondaryMuscles: [],
    sets: [],
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const addExercise = async () => {
    const pms = primaryMuscles
      .filter((pm) => pm.isChecked)
      .map((pm) => pm.muscle)
    const sms = secondaryMuscles
      .filter((sm) => sm.isChecked)
      .map((sm) => sm.muscle)
    newExercise.primaryMuscles = pms
    newExercise.secondaryMuscles = sms
    try {
      await dispatch(createExercise(newExercise)).then((res) =>
        console.log(res)
      )
    } catch (error) {
      notify(error.response.data.error)
      return
    }
    navigation.goBack()
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
      <Notify errorMessage={errorMessage} />

      <Input
        inputContainerStyle={{}}
        label={"Name"}
        placeholder={`Name`}
        onChangeText={(value) =>
          setNewExercise({ ...newExercise, name: value })
        }
      />

      <Input
        inputContainerStyle={{}}
        label={"Instructions"}
        placeholder={`Instructions`}
        onChangeText={(value) =>
          setNewExercise({ ...newExercise, instructions: value })
        }
      />

      <Input
        inputContainerStyle={{}}
        label={"1RM"}
        placeholder={`Defaults to 0, will update automatically`}
        onChangeText={(value) =>
          setNewExercise({ ...newExercise, oneRepMax: value })
        }
      />

      <ListItem.Accordion
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
                  // Use ThemeProvider to change the defaults of the checkbox
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
                  // Use ThemeProvider to change the defaults of the checkbox
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

      <Button
        containerStyle={{ marginVertical: 50 }}
        onPress={() => addExercise()}
        title="Create"
        disabled={!newExercise.name}
      />
    </ScrollView>
  )
}

export default CreateExercise
