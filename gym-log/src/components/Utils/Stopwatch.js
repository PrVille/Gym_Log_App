import React, { useState, useEffect } from "react"
import { Text, View } from "react-native"

const Stopwatch = ({ startTime }) => {
  const [time, setTime] = useState(Math.floor(Date.now() - startTime))

  useEffect(() => {
    let interval = null

    interval = setInterval(() => {
      setTime(Math.floor(Date.now() - startTime))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <View>
      <Text>{new Date(time).toISOString().slice(11, -5)}</Text>
    </View>
  )
}

export default Stopwatch
