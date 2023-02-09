import { useState, useEffect } from "react"
import plannedWorkoutsService from "../services/plannedWorkouts"

const usePlannedWorkouts = () => {
  const [plannedWorkouts, setPlannedWorkouts] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchPlannedWorkouts = async () => {
    console.log("FETCHING PLANNED WORKOUTS");
    setLoading(true)
    const fetchedPlannedWorkouts = await plannedWorkoutsService.getAll()
    setPlannedWorkouts(fetchedPlannedWorkouts)
    //console.log(JSON.stringify(fetchedPlannedWorkouts))
    setLoading(false)
  }
    
  useEffect(() => {
    fetchPlannedWorkouts()
  }, [])

  return { plannedWorkouts, loading }
}

export default usePlannedWorkouts
