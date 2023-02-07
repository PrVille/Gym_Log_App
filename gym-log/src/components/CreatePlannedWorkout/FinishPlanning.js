import React from "react"
import { Text, View } from "react-native"

const FinishPlanning = ({ startTime, finishTime }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>{new Date(startTime).toUTCString()}</Text>
    <Text>{new Date(finishTime).toUTCString()}</Text>
  </View>
)

export default FinishPlanning