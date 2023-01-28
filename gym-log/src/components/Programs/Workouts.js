import React, { useState } from "react"
import { Text, View, Button } from "react-native"


const Workouts = ({ params }) => {
  const [components, setComponents] = useState([])

  const renderNewField = () => {
    return (
        setComponents([...components, "new component"])
    )
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Workouts</Text>
      <Button title="Add new" onPress={renderNewField} />
      {components.map((component, i) => {
        return (
            <Text key={i}>{component}</Text>
        )
      })}
    </View>
  )
}

export default Workouts
