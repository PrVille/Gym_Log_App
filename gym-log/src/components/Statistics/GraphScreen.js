import { useEffect } from "react"
import { Icon } from "@rneui/themed"
import WorkoutsGraph from "../Graphs/WorkoutsGraph"
import ExerciseGraph from "../Graphs/ExerciseGraph"
import TargetMuscleGraph from "../Graphs/TargetMuscleGraph"

const GraphScreen = ({ navigation, route }) => {
  const favourite = false
  const category = route.params.category
  const type = route.params.type

  useEffect(() => {
    navigation.setOptions({
      title: "Statistics",
      headerRight: () => (
        <Icon
          style={{ marginEnd: 10 }}
          size={30}
          name={favourite ? "star" : "star-outline"}
          type="material-community"
          onPress={() => console.log("Add to favourites/home screen")}
        />
      ),
    })
  }, [type])

  return (
    <>
      {category === "Overall" ? (
        <WorkoutsGraph type={type} />
      ) : category === "TargetMuscle" ? (
        <TargetMuscleGraph type={type} />
      ) : (
        <ExerciseGraph type={type} />
      )}
    </>
  )
}

export default GraphScreen
