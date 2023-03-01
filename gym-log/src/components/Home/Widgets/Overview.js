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
      <Card.Body>
        <Card.Row disableSwipe compact>
          <Card.Column>Workouts</Card.Column>
          <Card.Column>{workouts.length}</Card.Column>
        </Card.Row>

        <Card.Row disableSwipe compact>
          <Card.Column>Volume</Card.Column>
          <Card.Column>
            {sets
              .map((set) => set.weight * set.reps)
              .reduce((a, b) => a + b, 0)}{" "}
            kg
          </Card.Column>
        </Card.Row>

        <Card.Row disableSwipe compact>
          <Card.Column>Sets</Card.Column>
          <Card.Column>{sets.length}</Card.Column>
        </Card.Row>

        <Card.Row disableSwipe compact>
          <Card.Column>Reps</Card.Column>
          <Card.Column>
            {sets.map((set) => set.reps).reduce((a, b) => a + b, 0)}
          </Card.Column>
        </Card.Row>

        <Card.Row disableSwipe compact>
          <Card.Column>Duration</Card.Column>
          <Card.Column>
            {workouts
              .map((workout) => workout.duration)
              .reduce((a, b) => a + b, 0)}{" "}
            min
          </Card.Column>
        </Card.Row>
      </Card.Body>
    </Card>
  )
}

export default Overview
