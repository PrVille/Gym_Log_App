import { useEffect } from "react"
import { Icon } from "@rneui/themed"
import WorkoutsGraph from "../Graphs/WorkoutsGraph"
import ExerciseGraph from "../Graphs/ExerciseGraph"
import TargetMuscleGraph from "../Graphs/TargetMuscleGraph"
import { useDispatch, useSelector } from "react-redux"
import { selectUser, updateUser } from "../../redux/reducers/userReducer"
import { selectExercises } from "../../redux/reducers/exerciseReducer"

const GraphScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const category = route.params.category
  const type = route.params.type
  const user = useSelector(selectUser)
  const exercises = useSelector(selectExercises)
  const favourite =
    category === "Overall"
      ? user.favouriteGraphs.overall.includes(type)
      : category === "TargetMuscle"
      ? user.favouriteGraphs.targetMuscle.includes(type)
      : user.favouriteGraphs.exercise.includes(type)

  const removeFavourite = () => {
    const userCopy = JSON.parse(JSON.stringify(user))
    category === "Overall"
      ? (userCopy.favouriteGraphs.overall = user.favouriteGraphs.overall.filter(
          (graph) => graph != type
        ))
      : category === "TargetMuscle"
      ? (userCopy.favouriteGraphs.targetMuscle =
          user.favouriteGraphs.targetMuscle.filter((graph) => graph != type))
      : (userCopy.favouriteGraphs.exercise =
          user.favouriteGraphs.exercise.filter((graph) => graph != type))
    dispatch(updateUser(userCopy))
  }

  const addFavourite = () => {
    const userCopy = JSON.parse(JSON.stringify(user))
    category === "Overall"
      ? userCopy.favouriteGraphs.overall.push(type)
      : category === "TargetMuscle"
      ? userCopy.favouriteGraphs.targetMuscle.push(type)
      : userCopy.favouriteGraphs.exercise.push(type)
    dispatch(updateUser(userCopy))
  }

  useEffect(() => {
    navigation.setOptions({
      title:
        category === "Exercise"
          ? exercises.find((exercise) => exercise._id === type).name
          : type,
      headerRight: () => (
        <Icon
          style={{ marginEnd: 10 }}
          size={30}
          name={favourite ? "star" : "star-outline"}
          type="material-community"
          onPress={() => (favourite ? removeFavourite() : addFavourite())}
        />
      ),
    })
  }, [type, favourite])

  return (
    <>
      {category === "Overall" ? (
        <WorkoutsGraph type={type} />
      ) : category === "TargetMuscle" ? (
        <TargetMuscleGraph targetMuscle={type} />
      ) : (
        <ExerciseGraph exerciseId={type} />
      )}
    </>
  )
}

export default GraphScreen
