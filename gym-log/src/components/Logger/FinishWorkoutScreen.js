import React, { useEffect } from "react"
import { View } from "react-native"
import { Input, Divider } from "@rneui/themed"

const FinishWorkoutScreen = ({
  startTime,
  finishTime,
  workout,
  setWorkout,
}) => {
  useEffect(() => {
    setWorkout({
      ...workout,
      duration: Math.ceil((finishTime - startTime) / 1000 / 60),
    })
  }, [])

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <Input
        label={"Name"}
        value={workout.name}
        placeholder={`Name`}
        onChangeText={(value) => setWorkout({ ...workout, name: value })}
      />

      <Input
        label={"Notes"}
        value={workout.notes}
        placeholder={`Notes`}
        onChangeText={(value) => setWorkout({ ...workout, notes: value })}
      />

      <Input
        keyboardType="number-pad"
        label={"Duration"}
        value={`${workout.duration}`}
        placeholder={`Duration`}
        onChangeText={(value) => setWorkout({ ...workout, duration: value })}
      />

      <Divider style={{ marginVertical: 20 }} />
    </View>
  )
}

export default FinishWorkoutScreen
