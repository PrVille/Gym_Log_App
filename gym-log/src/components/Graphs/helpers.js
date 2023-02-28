export const selectEvenly = (n, a) => {
  if (a.length <= n) return a
  const step = (a.length - 1) / (n - 1)
  const res = []
  for (let i = 0; i < n; i++) res.push(a[Math.round(step * i)])
  return res
}

export const groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  )

const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

const selectRandom = (items) => items[Math.floor(Math.random() * items.length)]

const getRandomWeight = (n = 10) => {
  const weights = Array(n)
    .fill()
    .map((_, i) => (i + 1) * 10)
  return selectRandom(weights)
}

const getRandomReps = (n = 10) => {
  const reps = Array(n)
    .fill()
    .map((_, i) => i + 5)
  return selectRandom(reps)
}

const getRandomDuration = (n = 10) => {
  const durations = Array(n)
    .fill()
    .map((_, i) => (i + 15) * 5)
  return selectRandom(durations)
}

const getRandomSets = (n) => {
  const sets = Array(n)
    .fill()
    .map((_) => ({ reps: getRandomReps(), weight: getRandomWeight() }))
  return sets
}

const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getWorkoutsTestData = (n) => {
  const arr = Array(n)
    .fill()
    .map((_) => ({
      createdAt: randomDate(new Date(2022, 7, 1), new Date()),
      duration: getRandomDuration(),
      exercises: Array(randomIntFromInterval(1, 8))
        .fill()
        .map((_) => ({ sets: getRandomSets(randomIntFromInterval(1, 6)) })),
    }))

  return arr
}
