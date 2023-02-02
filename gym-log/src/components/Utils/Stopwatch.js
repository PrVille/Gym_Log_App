import React, { useState, useEffect } from "react"
import { Text, View } from "react-native"

const Stopwatch = ({ startTime }) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    let interval = null

    interval = setInterval(() => {
      setTime((time) => time + 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <View>
      <Text>{time}</Text>
    </View>
  )
}

export default Stopwatch
