import React, { useState } from "react"
import { Text, View, TouchableOpacity, TextInput } from "react-native"
import { RadioButton } from "react-native-paper"
import usePlannedSetsService from "../../hooks/usePlannedSetsService"

const CreatePlannedSet = ({
  route,
  navigation,
  addPlannedSet,
  updatePlannedSet,
}) => {
  const exerciseId = route.params
  const [plannedSet, setPlannedSet] = useState({
    type: "work",
    exercise: exerciseId,
    plannedWeightType: "previousWeight",
    plannedReps: 12
  })
  const { createPlannedSet } = usePlannedSetsService()

  const submitPlannedSet = async () => {
    if (!plannedSet.plannedRepRangeMin) delete plannedSet.plannedRepRangeMin
    if (!plannedSet.plannedRepRangeMax) delete plannedSet.plannedRepRangeMax
    const newPlannedSet = await createPlannedSet(plannedSet)
    addPlannedSet(exerciseId, newPlannedSet)
    navigation.goBack()
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
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
        value={plannedSet.plannedReps}
        onChangeText={(value) =>
          setPlannedSet({ ...plannedSet, plannedReps: value })
        }
      />

      <Text>----------------optional fields-----------------</Text>

      <TextInput
        placeholder={`minReps`}
        onChangeText={(value) =>
          setPlannedSet({ ...plannedSet, plannedRepRangeMin: value })
        }
      />

      <TextInput
        placeholder={`maxReps`}
        onChangeText={(value) =>
          setPlannedSet({ ...plannedSet, plannedRepRangeMax: value })
        }
      />
      <TouchableOpacity onPress={() => submitPlannedSet()}>
        <Text>ADD</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CreatePlannedSet
