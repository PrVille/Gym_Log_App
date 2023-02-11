import React, { useState } from "react"
import { Text, View, TouchableOpacity, TextInput } from "react-native"
import { RadioButton } from "react-native-paper"
import uuid from "react-native-uuid"
import { useTheme } from '@react-navigation/native';

const CreatePlannedSet = ({
  route,
  navigation,
  addPlannedSet,
}) => {
  const exerciseId = route.params
  const { colors } = useTheme()
  const [plannedSet, setPlannedSet] = useState({
    type: "work",
    exercise: exerciseId,
    plannedWeightType: "previousWeight",
    plannedReps: 12 //default
  })

  const submitPlannedSet = async () => {

    const newPlannedSet = {
      _id: uuid.v4(),
      ...plannedSet
    }    
    
    addPlannedSet(exerciseId, newPlannedSet)
    navigation.goBack()
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>-----------------set type-----------------</Text>

      <View style={{ flexDirection: "row" }}>
        <Text>warmup</Text>
        <RadioButton
          value="warmup"
          status={plannedSet.type === "warmup" ? "checked" : "unchecked"}
          onPress={() => setPlannedSet({ ...plannedSet, type: "warmup" })}
        />

        <Text>working</Text>
        <RadioButton
          value="work"
          status={plannedSet.type === "work" ? "checked" : "unchecked"}
          onPress={() => setPlannedSet({ ...plannedSet, type: "work" })}
        />
      </View>

      <Text>----------------weight type-----------------</Text>

      <View style={{ flexDirection: "row" }}>
        <Text>previousWeight</Text>
        <RadioButton
          value="previousWeight"
          status={
            plannedSet.plannedWeightType === "previousWeight"
              ? "checked"
              : "unchecked"
          }
          onPress={() =>
            setPlannedSet({
              ...plannedSet,
              plannedWeightType: "previousWeight",
            })
          }
        />

        <Text>oneRepMaxPercentage</Text>
        <RadioButton
          value="oneRepMaxPercentage"
          status={
            plannedSet.plannedWeightType === "oneRepMaxPercentage"
              ? "checked"
              : "unchecked"
          }
          onPress={() =>
            setPlannedSet({
              ...plannedSet,
              plannedWeightType: "oneRepMaxPercentage",
            })
          }
        />

        <Text>plannedWeight</Text>
        <RadioButton
          value="plannedWeight"
          status={
            plannedSet.plannedWeightType === "plannedWeight"
              ? "checked"
              : "unchecked"
          }
          onPress={() =>
            setPlannedSet({ ...plannedSet, plannedWeightType: "plannedWeight" })
          }
        />
      </View>

      {plannedSet.plannedWeightType === "oneRepMaxPercentage" && (
        <TextInput
          placeholder={`oneRepMaxPercentage (required)`}
          onChangeText={(value) =>
            setPlannedSet({ ...plannedSet, oneRepMaxPercentage: value })
          }
        />
      )}

      {plannedSet.plannedWeightType === "plannedWeight" && (
        <TextInput
          placeholder={`plannedWeight (required)`}
          onChangeText={(value) =>
            setPlannedSet({ ...plannedSet, plannedWeight: value })
          }
        />
      )}

      <Text>----------------planned reps-----------------</Text>

      <TextInput
        placeholder={`plannedReps (required)`}
        value={`${plannedSet.plannedReps}`}
        onChangeText={(value) =>
          setPlannedSet({ ...plannedSet, plannedReps: value })
        }
      />

      
      <TouchableOpacity onPress={() => submitPlannedSet()}>
        <Text>ADD</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CreatePlannedSet
