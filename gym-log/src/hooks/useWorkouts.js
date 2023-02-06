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

  //seperate to its own hook
  const createWorkout = async (workout) => {
    console.log("CREATING WORKOUT")
    const res = await workoutsService.create(workout)
    console.log(res);
    
    //await fetchWorkouts()
    return res
  }
    
  useEffect(() => {
    fetchWorkouts()
  }, [])

  return { workouts, loading, createWorkout }
}

export default useWorkouts
