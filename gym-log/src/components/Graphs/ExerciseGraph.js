import { useState } from "react"
import { useSelector } from "react-redux"
import { ButtonGroup } from "@rneui/themed"
import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native"
import { isWithinInterval, parseISO, getMonth, getWeek } from "date-fns"
import LineGraph from "./LineGraph"
import {
  selectExerciseById,
} from "../../redux/reducers/exerciseReducer"
import useDates from "../../hooks/useDates"
import GraphOptions from "./GraphOptions"
import theme from "../../theme"
import { selectUser } from "../../redux/reducers/userReducer"

const ExerciseGraph = ({ exerciseId, widget }) => {
  const settings = useSelector(selectUser).settings.home.favouriteGraphs.options

  const [selectedInterval, setSelectedInterval] = useState({
    index: 0,
    months: 1,
  })

  const [selectedGrouping, setSelectedGrouping] = useState({
    index: 0,
    grouped: "weekly",
  })

  const [selectedData, setSelectedData] = useState({
    index: 0,
    data: "Sets",
  })

  const grouping = widget ? settings.grouping : selectedGrouping.grouped
  const months = widget ? settings.period : selectedInterval.months
  const dataType = widget ? settings.exerciseData : selectedData.data

  const [startDate, endDate, datesOfInterval, map] = useDates(months, grouping)

  const exercise = useSelector((state) => selectExerciseById(state, exerciseId))

  const sets = exercise.sets.map((set) => ({
    ...set,
    createdAt: parseISO(set.createdAt),
  }))

  const setsOfInterval = sets.filter((set) =>
    isWithinInterval(set.createdAt, {
      start: startDate,
      end: endDate,
    })
  )

  const Brzycki1RM = (w, r) => {
    return w / (1.0278 - 0.0278 * r)
  }

  const Epley1RM = (w, r) => {
    return w * (1 + 0.0333 * r)
  }

  for (let i = 0; i < setsOfInterval.length; i++) {
    const set = setsOfInterval[i]
    const key =
    grouping === "weekly"
        ? getWeek(set.createdAt, {
            weekStartsOn: 1,
          })
        : getMonth(set.createdAt)

    if (dataType === "Sets") map[key] += 1
    else if (dataType === "Reps") map[key] += set.reps
    else if (dataType === "Volume")
      map[key] += (set.reps * set.weight) / 1000
    else if (dataType === "1RM") {
      const current1RM = map[key]
      const new1RM =
        set.reps <= 10
          ? Brzycki1RM(set.weight, set.reps)
          : Epley1RM(set.weight, set.reps)
      if (new1RM > current1RM) {
        map[key] = new1RM
      }
    }
  }

  const data = datesOfInterval.map((date) => ({
    x: date,
    y: +map[
      grouping === "weekly"
        ? getWeek(date, {
            weekStartsOn: 1,
          })
        : getMonth(date)
    ].toFixed(1),
  }))

  if (widget) return <LineGraph data={data} type={dataType} widget />

  return (
    <>
      <GraphOptions
        selectedInterval={selectedInterval.index}
        setSelectedInterval={setSelectedInterval}
        selectedGrouping={selectedGrouping.index}
        setSelectedGrouping={setSelectedGrouping}
      />

      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Data</Text>
        </View>
        <View style={{ flex: 1 }}>
          <ButtonGroup
            buttons={["Sets", "Reps", "Volume", "1RM"]}
            selectedIndex={selectedData.index}
            onPress={(value) => {
              setSelectedData({
                index: value,
                data:
                  value === 0
                    ? "Sets"
                    : value === 1
                    ? "Reps"
                    : value === 2
                    ? "Volume"
                    : "1RM",
              })
            }}
          />
        </View>
      </View>

      <LineGraph data={data} type={dataType} />

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    width: Dimensions.get("window").width / 4,
    marginStart: 10,
    justifyContent: "center",
  },
  text: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  },
})

export default ExerciseGraph
