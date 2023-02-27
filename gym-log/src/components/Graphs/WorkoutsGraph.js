import { useState } from "react"
import { ButtonGroup } from "@rneui/themed"
import { Text } from "react-native"
import { useSelector } from "react-redux"
import { selectWorkouts } from "../../redux/reducers/workoutReducer"
import {
  isWithinInterval,
  parseISO,
  sub,
  eachWeekOfInterval,
  eachMonthOfInterval,
  getMonth,
  getWeek,
} from "date-fns"
import LineGraph from "./LineGraph"
import { getTestData } from "./helpers"

const WorkoutsGraph = ({ type }) => {
  const workouts = getTestData(100) //useSelector(selectWorkouts).map(w => ({...w, createdAt: parseISO(w.createdAt)}))
  
  const [selectedInterval, setSelectedInterval] = useState({
    index: 0,
    months: 1,
  })
  const [selectedGrouping, setSelectedGrouping] = useState({
    index: 0,
    grouped: "weekly",
  })

  const startDate = sub(new Date(), {
    months: selectedInterval.months,
  })
  const endDate = new Date()

  const workoutsOfInterval = workouts.filter((workout) =>
    isWithinInterval(workout.createdAt, {
      start: startDate,
      end: endDate,
    })
  )  

  const datesOfInterval =
    selectedGrouping.grouped === "weekly"
      ? eachWeekOfInterval(
          {
            start: startDate,
            end: endDate,
          },
          { weekStartsOn: 1 }
        )
      : eachMonthOfInterval({
          start: startDate,
          end: endDate,
        })

  const map = datesOfInterval
    .map((date) =>
      selectedGrouping.grouped === "weekly"
        ? getWeek(date, { weekStartsOn: 1 })
        : getMonth(date)
    )
    .reduce((acc, curr) => ((acc[curr] = 0), acc), {})

  for (let i = 0; i < workoutsOfInterval.length; i++) {
    const workout = workoutsOfInterval[i]
    const sets = workout.exercises.map((e) => e.sets).flat()
    const key =
      selectedGrouping.grouped === "weekly"
        ? getWeek(workout.createdAt, {
            weekStartsOn: 1,
          })
        : getMonth(workout.createdAt)

    if (type === "Duration") {
      map[key] += workout.duration
    } else if (type === "Reps") {
      map[key] += sets.map((set) => set.reps).reduce((a, b) => a + b, 0)
    } else if (type === "Sets") {
      map[key] += sets.length
    } else if (type === "Volume") {
      map[key] += sets
        .map((set) => set.reps * set.weight)
        .reduce((a, b) => a + b, 0)
    } else if (type === "Workouts") {
      map[key] += 1
    }
  }

  const data = datesOfInterval.map((date) => ({
    x: date,
    y: map[
      selectedGrouping.grouped === "weekly"
        ? getWeek(date, {
            weekStartsOn: 1,
          })
        : getMonth(date)
    ],
  }))

  return (
    <>
      <ButtonGroup
        buttons={["Month", "3 Months", "6 Months"]}
        selectedIndex={selectedInterval.index}
        onPress={(value) => {
          setSelectedInterval({
            index: value,
            months: value === 0 ? 1 : value === 1 ? 3 : 6,
          })
        }}
      />
      <ButtonGroup
        buttons={["Group By Week", "Group By Month"]}
        selectedIndex={selectedGrouping.index}
        onPress={(value) => {
          setSelectedGrouping({
            index: value,
            grouped: value === 0 ? "weekly" : "monthly",
          })
        }}
      />
      <LineGraph data={data} type={type} />
      <Text>RECORDS HERE</Text>
    </>
  )
}

export default WorkoutsGraph
