import {
  sub,
  eachWeekOfInterval,
  eachMonthOfInterval,
  getMonth,
  getWeek,
} from "date-fns"

const useDates = (months, grouped) => {
  const startDate = sub(new Date(), {
    months,
  })
  const endDate = new Date()

  const datesOfInterval =
    grouped === "weekly"
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
      grouped === "weekly" ? getWeek(date, { weekStartsOn: 1 }) : getMonth(date)
    )
    .reduce((acc, curr) => ((acc[curr] = 0), acc), {})

  return [startDate, endDate, datesOfInterval, map]
}

export default useDates
