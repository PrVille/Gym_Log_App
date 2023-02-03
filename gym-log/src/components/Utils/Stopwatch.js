import React, { useState, useEffect } from "react"
import { Text, View } from "react-native"

{/** FORMAT TIME TO HH:MM:SS */}
const Stopwatch = ({ startTime }) => {
  const [time, setTime] = useState(Math.floor( (Date.now() - startTime) / 1000 ))

  useEffect(() => {
    let interval = null

    interval = setInterval(() => {
      setTime(Math.floor( (Date.now() - startTime) / 1000 ))
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
