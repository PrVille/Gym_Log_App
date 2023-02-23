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

  return (
    <Card>
      <Card.Header divider>Favourite Exercises</Card.Header>
      <Card.Body>
        {exercises.map((exercise) => (
          <Card.Row key={exercise._id} disableSwipe>
            <Card.Column>{exercise.name}</Card.Column>
          </Card.Row>
        ))}
      </Card.Body>
    </Card>
  )
}

export default FavouriteExercises
