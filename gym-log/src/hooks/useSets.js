import { useState, useEffect } from "react"
import setsService from "../services/sets"

const useSets = () => {
  const [sets, setSets] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSets()
  }, [])

  const fetchSets = async () => {
    console.log("FETCHING SETS");
    setLoading(true)
    const fetchedSets = await setsService.getAll()
    setSets(fetchedSets)
    setLoading(false)
    
  }

  const createSet = async (set) => {
    console.log("CREATING SET")
    const res = await setsService.create(set)
    //await fetchSets()
    return res
  }

  const updateSet = async (set) => {
    console.log("UPDATING SET")
    const res = await setsService.update(set._id, set)
    console.log(res);
    return res
  }

  const updateSets = async (sets) => {
    console.log("UPDATING SETS")
    for (let i = 0; i < sets.length; i++) {
      const res = await setsService.update(sets[i]._id, sets[i])
      console.log(res);
    }
    return
  }
    
  if (loading) return {}
  return { sets, loading, createSet, updateSet, updateSets }
}

export default useSets
