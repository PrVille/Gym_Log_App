import Card from "../../Utils/Card"
import { useSelector } from "react-redux"
import { selectWorkouts } from "../../../redux/reducers/workoutReducer"
import { selectSets } from "../../../redux/reducers/setReducer"
import { selectUser } from "../../../redux/reducers/userReducer"

const Overview = () => {
  const workouts = useSelector(selectWorkouts)
  const selectedSets = useSelector(selectSets)
  const settings = useSelector(selectUser).settings.home.overview.options
  const countWarmupSets = useSelector(selectUser).settings.general.countWarmupSets
  const sets = countWarmupSets ? selectedSets : selectedSets.filter(set => set.type !== "warmup")

  return (
    <Card>
      <Card.Header divider>Overview</Card.Header>
      <Card.Body>
        {settings.workouts && <Card.Row disableSwipe compact>
          <Card.Column>Workouts</Card.Column>
          <Card.Column>{workouts.length}</Card.Column>
        </Card.Row>}

        {settings.volume && <Card.Row disableSwipe compact>
          <Card.Column>Volume</Card.Column>
          <Card.Column>
            {sets
              .map((set) => set.weight * set.reps)
              .reduce((a, b) => a + b, 0).toFixed()}{" "}
            kg
          </Card.Column>
        </Card.Row>}

        {settings.sets && <Card.Row disableSwipe compact>
          <Card.Column>Sets</Card.Column>
          <Card.Column>{sets.length}</Card.Column>
        </Card.Row>}

        {settings.reps && <Card.Row disableSwipe compact>
          <Card.Column>Reps</Card.Column>
          <Card.Column>
            {sets.map((set) => set.reps).reduce((a, b) => a + b, 0)}
          </Card.Column>
        </Card.Row>}

        {settings.duration && <Card.Row disableSwipe compact>
          <Card.Column>Duration</Card.Column>
          <Card.Column>
            {workouts
              .map((workout) => workout.duration)
              .reduce((a, b) => a + b, 0)}{" "}
            min
          </Card.Column>
        </Card.Row>}
      </Card.Body>
    </Card>
  )
}

export default Overview
