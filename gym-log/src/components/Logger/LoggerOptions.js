import React from "react"
import { Text, TouchableWithoutFeedback, View, Pressable } from "react-native"
import { BlurView } from "expo-blur"
import { ListItem, Icon, Button, SearchBar, FAB, Chip } from "@rneui/themed"
import theme from "../../theme"

const LoggerOptions = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <BlurView
        intensity={40}
        tint="light"
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "stretch",
          }}
        >
          <Button
            title="Plan a workout"
            buttonStyle={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.primary,
            }}
            titleStyle={{
              color: theme.colors.primary,
            }}
            containerStyle={{
              marginBottom: 30,
              marginHorizontal: 20,
            }}
            onPress={() => {
              navigation.goBack()
              navigation.navigate("CreatePlannedWorkout")
            }}
          />

          <Button
            title="Log an improvised workout"
            containerStyle={{
              marginBottom: 100,
              marginHorizontal: 20,
            }}
            onPress={() => {
              navigation.goBack()
              navigation.navigate("LoggerStack", { mode: "logImprovised" })
            }}
          />
        </View>
      </BlurView>
    </TouchableWithoutFeedback>
  )
}

export default LoggerOptions
