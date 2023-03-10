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
import { selectUser } from "../../redux/reducers/userReducer"

const TargetMuscleGraph = ({ targetMuscle, widget }) => {
  const user = useSelector(selectUser)
  const settings = user.settings.home.favouriteGraphs.options
  const countWarmupSets = user.settings.general.countWarmupSets

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
  const dataType = widget ? settings.targetMuscleData : selectedData.data
  const secondaryMuscleWeight = user.settings.statistics.secondaryMuscleWeight

  const [startDate, endDate, datesOfInterval, map] = useDates(months, grouping)

  const primaryExercises = useSelector((state) =>
    selectExercisesByPrimaryMuscle(state, targetMuscle)
  )
  const secondaryExercises = useSelector((state) =>
    selectExercisesBySecondaryMuscle(state, targetMuscle)
  )

  const rawPrimarySets = primaryExercises
    .map((e) => e.sets)
    .flat()
    .map((set) => ({ ...set, createdAt: parseISO(set.createdAt) }))
  const rawSecondarySets = secondaryExercises
    .map((e) => e.sets)
    .flat()
    .map((set) => ({ ...set, createdAt: parseISO(set.createdAt) }))

  const primarySets = countWarmupSets ? rawPrimarySets : rawPrimarySets.filter(set => set.type !== "warmup")
  const secondarySets = countWarmupSets ? rawSecondarySets : rawSecondarySets.filter(set => set.type !== "warmup")

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
      grouping === "weekly"
        ? getWeek(set.createdAt, {
            weekStartsOn: 1,
          })
        : getMonth(set.createdAt)

    if (dataType === "Sets") map[key] += 1
    else if (dataType === "Reps") map[key] += set.reps
    else if (dataType === "Volume")
      map[key] += (set.reps * set.weight) / 1000
  }

  for (let i = 0; i < secondarySetsOfInterval.length; i++) {
    const set = secondarySetsOfInterval[i]
    const key =
      grouping === "weekly"
        ? getWeek(set.createdAt, {
            weekStartsOn: 1,
          })
        : getMonth(set.createdAt)

    if (dataType === "Sets")
      map[key] += secondaryMuscleWeight
    else if (dataType === "Reps")
      map[key] += set.reps * secondaryMuscleWeight
    else if (dataType === "Volume")
      map[key] +=
        ((set.reps * set.weight) / 1000) * secondaryMuscleWeight
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

export default TargetMuscleGraph
