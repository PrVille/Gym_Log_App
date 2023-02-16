import React from "react"
import { Text, View, TouchableOpacity } from "react-native"
import { useTheme } from "@react-navigation/native"
import { Input, Button, ListItem, Divider } from "@rneui/themed"


const Overview = ({ params, navigation }) => {
  const { colors } = useTheme()

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
          containerStyle={{ marginVertical: 50 }}
          onPress={() => navigation.navigate("WorkoutHistory")}
          title="Workout history"
        />
      <Text style={{ color: colors.text, fontSize: 50, fontStyle: "bold" }}>
        Overview
      </Text>
    </View>
  )
}

export default Overview
