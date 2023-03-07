import React from "react"
import { TouchableWithoutFeedback, View } from "react-native"
import { BlurView } from "expo-blur"
import { Button } from "@rneui/themed"
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
            title="New Routine"
            buttonStyle={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.primary,
            }}
            titleStyle={{
              color: theme.colors.primary,
            }}
            containerStyle={{
              marginBottom: 10,
              marginHorizontal: 20,
            }}
            onPress={() => {
              navigation.goBack()
              navigation.navigate("RoutineFormStack")
            }}
          />

          <Button
            title="New Exercise"
            buttonStyle={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.primary,
            }}
            titleStyle={{
              color: theme.colors.primary,
            }}
            containerStyle={{
              marginBottom: 10,
              marginHorizontal: 20,
            }}
            onPress={() => {
              navigation.goBack()
              navigation.navigate("CreateExercise")
            }}
          />

          <Button
            title="New Workout"
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
            title="New Improvised Workout"
            containerStyle={{
              marginBottom: 100,
              marginHorizontal: 20,
            }}
            onPress={() => {
              navigation.goBack()
              navigation.navigate("LoggerStack")
            }}
          />
        </View>
      </BlurView>
    </TouchableWithoutFeedback>
  )
}

export default LoggerOptions
