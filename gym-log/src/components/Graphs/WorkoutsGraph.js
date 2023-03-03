import { useState } from "react"
import { Text } from "react-native"
import { useSelector } from "react-redux"
import { selectWorkouts } from "../../redux/reducers/workoutReducer"
import { isWithinInterval, parseISO, getMonth, getWeek } from "date-fns"
import LineGraph from "./LineGraph"
import { getWorkoutsTestData } from "./helpers"
import useDates from "../../hooks/useDates"
import GraphOptions from "./GraphOptions"
import { selectUser } from "../../redux/reducers/userReducer"

const WorkoutsGraph = ({ type, widget }) => {
  const workouts = useSelector(selectWorkouts).map((w) => ({
    ...w,
    createdAt: parseISO(w.createdAt),
  })) //getWorkoutsTestData(100)
  const settings = useSelector(selectUser).settings.home.favouriteGraphs.options

  const [selectedInterval, setSelectedInterval] = useState({
    index: 0,
    months: 1,
  })
  const [selectedGrouping, setSelectedGrouping] = useState({
    index: 0,
    grouped: "weekly",
  })

  const grouping = widget ? settings.grouping : selectedGrouping.grouped
  const months = widget ? settings.period : selectedInterval.months

  const [startDate, endDate, datesOfInterval, map] = useDates(months, grouping)

  const workoutsOfInterval = workouts.filter((workout) =>
    isWithinInterval(workout.createdAt, {
      start: startDate,
      end: endDate,
    })
  )

  for (let i = 0; i < workoutsOfInterval.length; i++) {
    const workout = workoutsOfInterval[i]
    const sets = workout.exercises.map((e) => e.sets).flat()
    const key =
      grouping === "weekly"
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
        .map((set) => (set.reps * set.weight) / 1000)
        .reduce((a, b) => a + b, 0)
    } else if (type === "Workouts") {
      map[key] += 1
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

  if (widget) return <LineGraph data={data} type={type} widget />

  return (
    <>
      <GraphOptions
        selectedInterval={selectedInterval.index}
        setSelectedInterval={setSelectedInterval}
        selectedGrouping={selectedGrouping.index}
        setSelectedGrouping={setSelectedGrouping}
      />
      <LineGraph data={data} type={type} />
    </>
  )
}

export default WorkoutsGraph
