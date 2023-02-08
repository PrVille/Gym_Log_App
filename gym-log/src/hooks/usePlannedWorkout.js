import { useState, useEffect } from "react"
import plannedWorkoutsService from "../services/plannedWorkouts"

const usePlannedWorkout = (id) => {
  const [plannedWorkout, setPlannedWorkout] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchPlannedWorkout = async (id) => {
    console.log("FETCHING PLANNED WORKOUT")
    setLoading(true)
    const fetchedPlannedWorkout = await plannedWorkoutsService.getById(id)
    setPlannedWorkout(fetchedPlannedWorkout)
    setLoading(false)
  }

  useEffect(() => {
    fetchPlannedWorkout(id)
  }, [])

  return { plannedWorkout, loading }
}

export default usePlannedWorkout
