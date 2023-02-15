import { useDispatch } from "react-redux"
import { initializeExercises } from "../redux/reducers/exerciseReducer"
import { initializeWorkouts } from "../redux/reducers/workoutReducer"
import { initializeSets } from "../redux/reducers/setReducer"
import { initializePlannedSets } from "../redux/reducers/plannedSetReducer"
import { initializePlannedWorkouts } from "../redux/reducers/plannedWorkoutReducer"

const useInitialization = () => {
  const dispatch = useDispatch()

  return () => {
    dispatch(initializeSets())
    dispatch(initializePlannedSets())
    dispatch(initializeExercises())
    dispatch(initializeWorkouts())
    dispatch(initializePlannedWorkouts())
  }
}

export default useInitialization
