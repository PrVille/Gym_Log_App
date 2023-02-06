import { useState, useEffect } from "react"
import exercisesService from "../services/exercises"

const useExercises = ({ fields }) => {
  const [exercises, setExercises] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchExercises = async (fields) => {
    console.log("FETCHING EXERCISES");
    setLoading(true)

    if (fields) {
        const fetchedExercisesWithFields = await exercisesService.getAllWithFields(fields)
        setExercises(fetchedExercisesWithFields)
        setLoading(false)
        return
    }

    const fetchedExercises = await exercisesService.getAll()
    setExercises(fetchedExercises)
    setLoading(false)
  }

  useEffect(() => {
    fetchExercises(fields)
  }, [])

  return { exercises, loading }
}

export default useExercises
