import React, { useEffect } from "react"
import { Text, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import { Input, Divider } from "@rneui/themed"

const FinishPlanning = ({ plannedWorkout, setPlannedWorkout, exercises }) => {

  useEffect(() => {
    setPlannedWorkout({...plannedWorkout, estimatedDuration: exercises.map(e => e.sets).flat().length * 3})
  }, [])
  
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <Input
        label={"Name"}
        value={plannedWorkout.name}
        placeholder={`Name`}
        onChangeText={(value) =>
          setPlannedWorkout({ ...plannedWorkout, name: value })
        }
      />

      <Input
        label={"Notes"}
        value={plannedWorkout.notes}
        placeholder={`Notes`}
        onChangeText={(value) =>
          setPlannedWorkout({ ...plannedWorkout, notes: value })
        }
      />

      <Input
        keyboardType="number-pad"
        label={"Estimated duration"}
        value={`${plannedWorkout.estimatedDuration}`}
        placeholder={`Duration`}
        onChangeText={(value) =>
          setPlannedWorkout({ ...plannedWorkout, estimatedDuration: value })
        }
      />

      <Divider style={{ marginVertical: 20 }} />
    </View>
  )
}

export default FinishPlanning
