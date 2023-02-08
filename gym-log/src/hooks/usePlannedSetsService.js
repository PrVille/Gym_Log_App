import plannedSetsService from "../services/plannedSets"

const usePlannedSetsService = () => {

  const createPlannedSet = async (plannedSet) => {
    console.log("CREATING PLANNED SET")
    const res = await plannedSetsService.create(plannedSet)
    
    return res
  }

  return { createPlannedSet }
}

export default usePlannedSetsService
