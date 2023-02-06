import { useState, useEffect } from "react"
import exercisesService from "../services/exercises"

const useExercise = (id) => {
  const [exercise, setExercise] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchExercise = async (id) => {
    console.log("FETCHING EXERCISE");
    setLoading(true)

    const fetchedExercise = await exercisesService.getById(id)
    setExercise(fetchedExercise)
    //console.log(fetchedExercise);
    
    setLoading(false)
  }


  useEffect(() => {
    
    fetchExercise(id)
  }, [])

  return { exercise, loading }
}

export default useExercise
