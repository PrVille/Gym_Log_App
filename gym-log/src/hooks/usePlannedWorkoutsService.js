import plannedWorkoutsService from "../services/plannedWorkouts"

const usePlannedWorkoutsService = () => {

  const createPlannedWorkout = async (plannedWorkout) => {
    console.log("CREATING PLANNED WORKOUT")
    const res = await plannedWorkoutsService.create(plannedWorkout)
    console.log(res);
    
    return res
  }

  return { createPlannedWorkout }
}

export default usePlannedWorkoutsService
