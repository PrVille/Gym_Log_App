import workoutsService from "../services/workouts"

const useWorkoutsService = () => {
  const createWorkout = async (workout) => {
    console.log("CREATING WORKOUT")
    const res = await workoutsService.create(workout)
    return res
  }

  return { createWorkout }
}

export default useWorkoutsService
