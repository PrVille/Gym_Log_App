import Card from "../../Utils/Card"
import { useSelector } from "react-redux"
import { selectActiveRoutine } from "../../../redux/reducers/routineReducer"
import theme from "../../../theme"

const ActiveRoutine = ({ navigation }) => {
  const activeRoutine = useSelector(selectActiveRoutine)

  if (!activeRoutine)
    return (
      <Card>
        <Card.Header
          buttonTitle="Routines"
          onButtonPress={() => {
            navigation.navigate("DirectoryNavigator", { screen: "Routines"})

          }}
        >
          Follow a routine!
        </Card.Header>
      </Card>
    )

  const completedCount = activeRoutine.completedCount
  const workoutsCount = activeRoutine.weeks
    .map((week) => week.plannedWorkouts)
    .flat().length
  const nextWorkout = activeRoutine.weeks
    .map((week) => week.plannedWorkouts)
    .flat()[activeRoutine.completedCount]

  return (
    <Card>
      <Card.Header
        divider
        buttonTitle="Continue"
        onButtonPress={() => {
          navigation.navigate("LoggerStack", nextWorkout._id)
        }}
      >
        Followed Routine
      </Card.Header>

      <Card.Body>
        <Card.BodyHeader>
          <Card.HeaderRow marginVertical={10}>
            <Card.HeaderColumn alignItems="flex-start">
              {activeRoutine.name}
            </Card.HeaderColumn>
          </Card.HeaderRow>
        </Card.BodyHeader>
        <Card.Row disableSwipe compact>
          <Card.Column alignItems="flex-start">Workouts</Card.Column>
          <Card.Column>
            {completedCount} / {workoutsCount}
          </Card.Column>
          <Card.Column>
            {((completedCount / workoutsCount) * 100).toFixed(0)} %
          </Card.Column>
        </Card.Row>
        <Card.Row disableSwipe compact>
          <Card.Column alignItems="flex-start">Next Workout:</Card.Column>
        </Card.Row>
        <Card.Row disableSwipe compact>
          <Card.Column alignItems="flex-start">{nextWorkout.name}</Card.Column>
        </Card.Row>
      </Card.Body>
    </Card>
  )
}

export default ActiveRoutine
