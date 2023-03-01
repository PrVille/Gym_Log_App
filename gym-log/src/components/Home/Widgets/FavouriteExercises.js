import Card from "../../Utils/Card"
import { selectFavouriteExercises } from "../../../redux/reducers/exerciseReducer"
import { useSelector } from "react-redux"

const FavouriteExercises = ({ navigation }) => {
  const exercises = useSelector(selectFavouriteExercises)

  if (exercises.length === 0) {
    return (
      <Card>
        <Card.Header
          buttonTitle="Exercises"
          onButtonPress={() => {
            navigation.navigate("DirectoryNavigator", { screen: "Exercises" })
          }}
        >
          Select Favourite Exercises!
        </Card.Header>
      </Card>
    )
  }

  const getVolumeRecord = (sets) => {
    if (sets.length === 0) return 0
    const recordSet = sets.reduce((prev, current) =>
      prev.weight * prev.reps > current.weight * current.reps ? prev : current
    )
    return `${recordSet.weight * recordSet.reps} kg in ${recordSet.reps} reps`
  }

  return (
    <Card>
      <Card.Header divider>Favourite Exercises</Card.Header>
      {exercises.map((exercise) => (
        <Card.Body key={exercise._id} divider>
          <Card.HeaderRow marginVertical={10}>
            <Card.HeaderColumn>{exercise.name}</Card.HeaderColumn>
          </Card.HeaderRow>

          <Card.Row disableSwipe compact>
            <Card.Column>1RM</Card.Column>
            <Card.Column>{exercise.oneRepMax}</Card.Column>
          </Card.Row>

          <Card.Row disableSwipe compact>
            <Card.Column>1RM Goal</Card.Column>
            <Card.Column>{exercise.oneRepMaxGoal}</Card.Column>
          </Card.Row>

          <Card.Row disableSwipe compact>
            <Card.Column>Weight Record</Card.Column>
            <Card.Column>
              {exercise.sets.length === 0
                ? 0
                : Math.max(...exercise.sets.map((set) => set.weight))}{" "}
              kg
            </Card.Column>
          </Card.Row>

          <Card.Row disableSwipe compact>
            <Card.Column>Volume Record</Card.Column>
            <Card.Column>{getVolumeRecord(exercise.sets)}</Card.Column>
          </Card.Row>

          <Card.Row disableSwipe compact>
            <Card.Column>Total Sets</Card.Column>
            <Card.Column>{exercise.sets.length}</Card.Column>
          </Card.Row>

          <Card.Row disableSwipe compact>
            <Card.Column>Total Volume</Card.Column>
            <Card.Column>
              {exercise.sets
                .map((set) => set.weight * set.reps)
                .reduce((a, b) => a + b, 0)}{" "}
              kg
            </Card.Column>
          </Card.Row>
        </Card.Body>
      ))}
    </Card>
  )
}

export default FavouriteExercises
