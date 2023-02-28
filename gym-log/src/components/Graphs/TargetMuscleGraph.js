import { useState } from "react"
import { useSelector } from "react-redux"
import { ButtonGroup } from "@rneui/themed"
import { Text, View, StyleSheet, Dimensions } from "react-native"
import { isWithinInterval, parseISO, getMonth, getWeek } from "date-fns"
import LineGraph from "./LineGraph"
import {
  selectExercisesByPrimaryMuscle,
  selectExercisesBySecondaryMuscle,
} from "../../redux/reducers/exerciseReducer"
import useDates from "../../hooks/useDates"
import GraphOptions from "./GraphOptions"
import theme from "../../theme"

const TargetMuscleGraph = ({ targetMuscle }) => {
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

  const [selectedSecondaryMuscleFactor, setSelectedSecondaryMuscleFactor] =
    useState({
      index: 1,
      factor: 0.5,
    })

  const [startDate, endDate, datesOfInterval, map] = useDates(
    selectedInterval.months,
    selectedGrouping.grouped
  )

  const primaryExercises = useSelector((state) =>
    selectExercisesByPrimaryMuscle(state, targetMuscle)
  )
  const secondaryExercises = useSelector((state) =>
    selectExercisesBySecondaryMuscle(state, targetMuscle)
  )

  const primarySets = primaryExercises
    .map((e) => e.sets)
    .flat()
    .map((set) => ({ ...set, createdAt: parseISO(set.createdAt) }))
  const secondarySets = secondaryExercises
    .map((e) => e.sets)
    .flat()
    .map((set) => ({ ...set, createdAt: parseISO(set.createdAt) }))

  const primarySetsOfInterval = primarySets.filter((set) =>
    isWithinInterval(set.createdAt, {
      start: startDate,
      end: endDate,
    })
  )

  const secondarySetsOfInterval = secondarySets.filter((set) =>
    isWithinInterval(set.createdAt, {
      start: startDate,
      end: endDate,
    })
  )

  for (let i = 0; i < primarySetsOfInterval.length; i++) {
    const set = primarySetsOfInterval[i]
    const key =
      selectedGrouping.grouped === "weekly"
        ? getWeek(set.createdAt, {
            weekStartsOn: 1,
          })
        : getMonth(set.createdAt)

    if (selectedData.data === "Sets") map[key] += 1
    else if (selectedData.data === "Reps") map[key] += set.reps
    else if (selectedData.data === "Volume")
      map[key] += (set.reps * set.weight) / 1000
  }

  for (let i = 0; i < secondarySetsOfInterval.length; i++) {
    const set = secondarySetsOfInterval[i]
    const key =
      selectedGrouping.grouped === "weekly"
        ? getWeek(set.createdAt, {
            weekStartsOn: 1,
          })
        : getMonth(set.createdAt)

    if (selectedData.data === "Sets")
      map[key] += selectedSecondaryMuscleFactor.factor
    else if (selectedData.data === "Reps")
      map[key] += set.reps * selectedSecondaryMuscleFactor.factor
    else if (selectedData.data === "Volume")
      map[key] +=
        ((set.reps * set.weight) / 1000) * selectedSecondaryMuscleFactor.factor
  }

  const data = datesOfInterval.map((date) => ({
    x: date,
    y: +map[
      selectedGrouping.grouped === "weekly"
        ? getWeek(date, {
            weekStartsOn: 1,
          })
        : getMonth(date)
    ].toFixed(1),
  }))

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
            buttons={["Sets", "Reps", "Volume"]}
            selectedIndex={selectedData.index}
            onPress={(value) => {
              setSelectedData({
                index: value,
                data: value === 0 ? "Sets" : value === 1 ? "Reps" : "Volume",
              })
            }}
          />
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Count Secondary</Text>
        </View>
        <View style={{ flex: 1 }}>
          <ButtonGroup
            buttons={["0", "0.5", "1"]}
            selectedIndex={selectedSecondaryMuscleFactor.index}
            onPress={(value) => {
              setSelectedSecondaryMuscleFactor({
                index: value,
                factor: value === 0 ? 0 : value === 1 ? 0.5 : 1,
              })
            }}
          />
        </View>
      </View>

      <LineGraph data={data} type={selectedData.data} />
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

export default TargetMuscleGraph
