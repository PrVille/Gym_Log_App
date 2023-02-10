import React, { useState } from "react"
import { Text, View, Button, TextInput } from "react-native"
import { useDispatch } from "react-redux"
import { createExercise } from "../../redux/reducers/exerciseReducer"

const CreateExercise = ({ navigation }) => {
  const dispatch = useDispatch()
  const [newExercise, setNewExercise] = useState({
    name: "",
    instructions: "",
    oneRepMax: 0,
    primaryMuscleGroups: [],
    secondaryMuscleGroups: [],
    primaryMuscles: [],
    secondaryMuscles: [],
    sets: [],
  })

  const addExercise = async () => {    
    await dispatch(createExercise(newExercise)).then((res) => console.log(res))
    navigation.goBack()
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <TextInput
      style={{margin: 20}}
        placeholder={`name`}
        onChangeText={(value) =>
          setNewExercise({ ...newExercise, name: value })
        }
      />
      <Button onPress={() => addExercise()} title="Create" disabled={!newExercise.name ? true : false}/>
    </View>
  )
}

export default CreateExercise
