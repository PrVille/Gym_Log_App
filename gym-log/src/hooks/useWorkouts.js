import { useState, useEffect } from "react"
import workoutsService from "../services/workouts"

const useWorkouts = () => {
  const [workouts, setWorkouts] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchWorkouts = async () => {
    console.log("FETCHING WORKOUTS");
    setLoading(true)
    const fetchedWorkouts = await workoutsService.getAll()
    setWorkouts(fetchedWorkouts)
    setLoading(false)
  }
    
  useEffect(() => {
    fetchWorkouts()
  }, [])

  return { workouts, loading }
}

export default useWorkouts
