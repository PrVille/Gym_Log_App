import { useState, useEffect } from "react"
import setsService from "../services/sets"

const useSetsService = () => {
  const createSet = async (set) => {
    console.log("CREATING SET")
    const res = await setsService.create(set)
    return res
  }

  const updateSet = async (set) => {
    console.log("UPDATING SET")
    const res = await setsService.update(set._id, set)
    return res
  }

  const updateSets = async (sets) => {
    console.log("UPDATING SETS")
    for (let i = 0; i < sets.length; i++) {
      await setsService.update(sets[i]._id, sets[i])
    }
    return
  }

  return { createSet, updateSet, updateSets }
}

export default useSetsService
