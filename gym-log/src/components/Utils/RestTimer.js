import { View, Text, Vibration } from "react-native"
import React, { useState, useEffect } from "react"
import { Icon } from "@rneui/themed"
import theme from "../../theme"

const RestTimer = ({ defaulRestMinutes = 2 }) => {
  const [restMinutes, setRestMinutes] = useState(defaulRestMinutes)
  const [duration, setDuration] = useState(
    new Date().getTime() + restMinutes * 60 * 1000
  )
  const [active, setActive] = useState(false)
  const [countDown, setCountDown] = useState(duration - new Date().getTime())

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        const newCountDown = duration - new Date().getTime()
        if (newCountDown <= 0) {
          toggleActive()
          Vibration.vibrate()
        } else setCountDown(newCountDown)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [duration, active])

  const toggleActive = () => {
    setActive(!active)
    setDuration(new Date().getTime() + restMinutes * 60 * 1000)
    setCountDown(
      new Date().getTime() + restMinutes * 60 * 1000 - new Date().getTime()
    )
  }

  const updateRestMinutes = (value) => {
    if (restMinutes <= 0.5 && value < 0) return
    setRestMinutes(restMinutes + value)
    setDuration(new Date().getTime() + (restMinutes + value) * 60 * 1000)
    setCountDown(
      new Date().getTime() +
        (restMinutes + value) * 60 * 1000 -
        new Date().getTime()
    )
  }

  return (
    <View
      style={{
        height: 50,
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {!active && (
          <>
            <Icon
              name={"minus"}
              type="material-community"
              size={30}
              onPress={() => updateRestMinutes(-0.5)}
            />
            <Icon
              name={"plus"}
              type="material-community"
              size={30}
              onPress={() => updateRestMinutes(0.5)}
            />
          </>
        )}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Text style={{fontSize: theme.fontSizes.heading, color: theme.colors.primary}}>{new Date(countDown).toISOString().slice(14, -5)}</Text>
        <Icon
          name={active ? "stop" : "play"}
          type="material-community"
          size={30}
          onPress={toggleActive}
        />
      </View>
    </View>
  )
}

export default RestTimer
