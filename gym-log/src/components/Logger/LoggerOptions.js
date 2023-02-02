import React from "react"
import { Text, TouchableWithoutFeedback, View, Pressable } from "react-native"
import { BlurView } from "expo-blur"

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
          <Pressable
            style={{
              marginBottom: 100,
              marginHorizontal: 20,
              padding: 10,
              backgroundColor: "black",
              borderRadius: 5,
              borderWidth: 2,
              overflow: "hidden",
              borderColor: "black",
              alignItems: "center",
              opacity: 1,
            }}
            onPress={() => {
              navigation.goBack()
              navigation.navigate("LoggerStack")}}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Log a workout
            </Text>
          </Pressable>
        </View>
      </BlurView>
    </TouchableWithoutFeedback>
  )
}

export default LoggerOptions
