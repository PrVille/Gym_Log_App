import React from "react"
import { Text, View } from "react-native"
import { useTheme } from '@react-navigation/native';

const Overview = ({ params }) => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: colors.text, fontSize: 50, fontStyle: "bold" }}>Overview</Text>
    </View>
  )
}

export default Overview
