import Card from "../../Utils/Card"
import { useSelector } from "react-redux"
import { selectWorkouts } from "../../../redux/reducers/workoutReducer"
import { selectSets } from "../../../redux/reducers/setReducer"

const Overview = () => {
  const workouts = useSelector(selectWorkouts)
  const sets = useSelector(selectSets)

  return (
    <Card>
      <Card.Header divider>Overview</Card.Header>
      <Card.Body divider>
        <Card.Row disableSwipe>
          <Card.Column alignItems="flex-start">
            Workouts: {workouts.length}
          </Card.Column>
          <Card.Column alignItems="flex-start">
            Volume:{" "}
            {sets
              .map((set) => set.weight * set.reps)
              .reduce((a, b) => a + b, 0)}{" "}
            kg
          </Card.Column>
        </Card.Row>
        <Card.Row disableSwipe>
          <Card.Column alignItems="flex-start">Sets: {sets.length}</Card.Column>
          <Card.Column alignItems="flex-start">
            Reps: {sets.map((set) => set.reps).reduce((a, b) => a + b, 0)}
          </Card.Column>
        </Card.Row>
        <Card.Row disableSwipe>
          <Card.Column alignItems="flex-start">
            Minutes:{" "}
            {workouts
              .map((workout) => workout.duration)
              .reduce((a, b) => a + b, 0)}
          </Card.Column>
        </Card.Row>
      </Card.Body>
    </Card>
  )
}

export default Overview
