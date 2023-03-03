import { Divider, ButtonGroup } from "@rneui/themed"
import { useDispatch, useSelector } from "react-redux"
import { Text, View, Switch, StyleSheet, Dimensions } from "react-native"
import GraphOptions from "../Graphs/GraphOptions"
import theme from "../../theme"
import { selectUser, updateUser } from "../../redux/reducers/userReducer"

const SwitchItem = ({ onValueChange, value, label, bold }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Text
      style={{
        fontSize: theme.fontSizes.subheading,
        color: theme.colors.primary,
        fontWeight: bold ? theme.fontWeights.bold : theme.fontWeights.normal,
      }}
    >
      {label}
    </Text>
    <Switch
      trackColor={{
        false: theme.colors.primaryVariant,
        true: theme.colors.primary,
      }}
      thumbColor={theme.colors.background}
      ios_backgroundColor={theme.colors.primaryVariant}
      onValueChange={onValueChange}
      value={value}
    />
  </View>
)

const OverviewFields = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const userCopy = JSON.parse(JSON.stringify(user))
  const workoutsActive = user.settings.home.overview.options.workouts
  const volumeActive = user.settings.home.overview.options.volume
  const setsActive = user.settings.home.overview.options.sets
  const repsActive = user.settings.home.overview.options.reps
  const durationActive = user.settings.home.overview.options.duration

  const toggleWorkoutsActive = () => {
    userCopy.settings.home.overview.options.workouts = !workoutsActive
    dispatch(updateUser(userCopy))
  }

  const toggleVolumeActive = () => {
    userCopy.settings.home.overview.options.volume = !volumeActive
    dispatch(updateUser(userCopy))
  }

  const toggleSetsActive = () => {
    userCopy.settings.home.overview.options.sets = !setsActive
    dispatch(updateUser(userCopy))
  }

  const toggleRepsActive = () => {
    userCopy.settings.home.overview.options.reps = !repsActive
    dispatch(updateUser(userCopy))
  }

  const toggleDurationActive = () => {
    userCopy.settings.home.overview.options.duration = !durationActive
    dispatch(updateUser(userCopy))
  }

  return (
    <View
      style={{ marginTop: 15, marginEnd: 0, marginStart: 20, marginBottom: 10 }}
    >
      <SwitchItem
        label="Workouts"
        onValueChange={toggleWorkoutsActive}
        value={workoutsActive}
      />

      <Divider style={styles.divider} />

      <SwitchItem
        label="Volume"
        onValueChange={toggleVolumeActive}
        value={volumeActive}
      />

      <Divider style={styles.divider} />

      <SwitchItem
        label="Sets"
        onValueChange={toggleSetsActive}
        value={setsActive}
      />

      <Divider style={styles.divider} />

      <SwitchItem
        label="Reps"
        onValueChange={toggleRepsActive}
        value={repsActive}
      />

      <Divider style={styles.divider} />

      <SwitchItem
        label="Duration"
        onValueChange={toggleDurationActive}
        value={durationActive}
      />
    </View>
  )
}

const OverviewSettings = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const userCopy = JSON.parse(JSON.stringify(user))
  const showOverview = user.settings.home.overview.active

  const toggleShowOverview = () => {
    userCopy.settings.home.overview.active = !showOverview
    dispatch(updateUser(userCopy))
  }
  return (
    <View style={{}}>
      <SwitchItem
        bold
        label="Show Overview"
        onValueChange={toggleShowOverview}
        value={showOverview}
      />

      {showOverview && <OverviewFields />}

      <Divider style={styles.divider} />
    </View>
  )
}

const FollowedRoutineSettings = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const userCopy = JSON.parse(JSON.stringify(user))
  const showFollowedRoutine = user.settings.home.followedRoutine.active

  const toggleShowFollowedRoutine = () => {
    userCopy.settings.home.followedRoutine.active = !showFollowedRoutine
    dispatch(updateUser(userCopy))
  }

  return (
    <View style={{}}>
      <SwitchItem
        bold
        label="Show Followed Routine"
        onValueChange={toggleShowFollowedRoutine}
        value={showFollowedRoutine}
      />

      <Divider style={styles.divider} />
    </View>
  )
}

const FavouriteAchievementsSettings = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const userCopy = JSON.parse(JSON.stringify(user))
  const showFavouriteAchievements =
    user.settings.home.favouriteAchievements.active

  const toggleShowFavouriteAchievements = () => {
    userCopy.settings.home.favouriteAchievements.active =
      !showFavouriteAchievements
    dispatch(updateUser(userCopy))
  }

  return (
    <View style={{}}>
      <SwitchItem
        bold
        label="Show Favourite Achievements"
        onValueChange={toggleShowFavouriteAchievements}
        value={showFavouriteAchievements}
      />

      <Divider style={styles.divider} />
    </View>
  )
}

const FavouriteExerciseFields = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const userCopy = JSON.parse(JSON.stringify(user))
  const oneRepMaxActive =
    user.settings.home.favouriteExercises.options.oneRepMax
  const oneRepMaxGoalActive =
    user.settings.home.favouriteExercises.options.oneRepMaxGoal
  const volumeActive = user.settings.home.favouriteExercises.options.volume
  const setsActive = user.settings.home.favouriteExercises.options.sets
  const repsActive = user.settings.home.favouriteExercises.options.reps
  const weightRecordActive =
    user.settings.home.favouriteExercises.options.weightRecord
  const volumeRecordActive =
    user.settings.home.favouriteExercises.options.volumeRecord

  const toggleOneRepMaxActive = () => {
    userCopy.settings.home.favouriteExercises.options.oneRepMax =
      !oneRepMaxActive
    dispatch(updateUser(userCopy))
  }

  const toggleOneRepMaxGoalActive = () => {
    userCopy.settings.home.favouriteExercises.options.oneRepMaxGoal =
      !oneRepMaxGoalActive
    dispatch(updateUser(userCopy))
  }

  const toggleVolumeActive = () => {
    userCopy.settings.home.favouriteExercises.options.volume = !volumeActive
    dispatch(updateUser(userCopy))
  }

  const toggleSetsActive = () => {
    userCopy.settings.home.favouriteExercises.options.sets = !setsActive
    dispatch(updateUser(userCopy))
  }

  const toggleRepsActive = () => {
    userCopy.settings.home.favouriteExercises.options.reps = !repsActive
    dispatch(updateUser(userCopy))
  }

  const toggleWeightRecordActive = () => {
    userCopy.settings.home.favouriteExercises.options.weightRecord =
      !weightRecordActive
    dispatch(updateUser(userCopy))
  }

  const toggleVolumeRecordActive = () => {
    userCopy.settings.home.favouriteExercises.options.volumeRecord =
      !volumeRecordActive
    dispatch(updateUser(userCopy))
  }

  return (
    <View
      style={{ marginTop: 15, marginEnd: 0, marginStart: 20, marginBottom: 10 }}
    >
      <SwitchItem
        label="1RM"
        onValueChange={toggleOneRepMaxActive}
        value={oneRepMaxActive}
      />

      <Divider style={styles.divider} />

      <SwitchItem
        label="1RM Goal"
        onValueChange={toggleOneRepMaxGoalActive}
        value={oneRepMaxGoalActive}
      />

      <Divider style={styles.divider} />

      <SwitchItem
        label="Volume"
        onValueChange={toggleVolumeActive}
        value={volumeActive}
      />

      <Divider style={styles.divider} />

      <SwitchItem
        label="Sets"
        onValueChange={toggleSetsActive}
        value={setsActive}
      />

      <Divider style={styles.divider} />

      <SwitchItem
        label="Reps"
        onValueChange={toggleRepsActive}
        value={repsActive}
      />

      <Divider style={styles.divider} />

      <SwitchItem
        label="Weight Record"
        onValueChange={toggleWeightRecordActive}
        value={weightRecordActive}
      />

      <Divider style={styles.divider} />

      <SwitchItem
        label="Volume Record"
        onValueChange={toggleVolumeRecordActive}
        value={volumeRecordActive}
      />
    </View>
  )
}

const FavouriteExercisesSettings = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const userCopy = JSON.parse(JSON.stringify(user))
  const showFavouriteExercises = user.settings.home.favouriteExercises.active

  const toggleShowFavouriteExercises = () => {
    userCopy.settings.home.favouriteExercises.active = !showFavouriteExercises
    dispatch(updateUser(userCopy))
  }

  return (
    <View style={{}}>
      <SwitchItem
        bold
        label="Show Favourite Exercises"
        onValueChange={toggleShowFavouriteExercises}
        value={showFavouriteExercises}
      />

      {showFavouriteExercises && <FavouriteExerciseFields />}

      <Divider style={styles.divider} />
    </View>
  )
}

const FavouriteGraphsSettings = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const userCopy = JSON.parse(JSON.stringify(user))
  const showFavouriteGraphs = user.settings.home.favouriteGraphs.active
  const selectedPeriod = user.settings.home.favouriteGraphs.options.period
  const selectedGrouping = user.settings.home.favouriteGraphs.options.grouping
  const selectedExerciseData = user.settings.home.favouriteGraphs.options.exerciseData
  const selectedTargetMuscleData = user.settings.home.favouriteGraphs.options.targetMuscleData  

  const toggleShowFavouriteGraphs = () => {
    userCopy.settings.home.favouriteGraphs.active = !showFavouriteGraphs
    dispatch(updateUser(userCopy))
  }

  const updateSelectedPeriod = (value) => {
    userCopy.settings.home.favouriteGraphs.options.period = value.months
    dispatch(updateUser(userCopy))
  }

  const updateSelectedGrouping = (value) => {
    userCopy.settings.home.favouriteGraphs.options.grouping = value.grouped
    dispatch(updateUser(userCopy))
  }

  const updateSelectedExerciseData = (value) => {
    userCopy.settings.home.favouriteGraphs.options.exerciseData = value.data
    dispatch(updateUser(userCopy))
  }

  const updateSelectedTargetMuscleData = (value) => {
    userCopy.settings.home.favouriteGraphs.options.targetMuscleData = value.data
    dispatch(updateUser(userCopy))
  }

  return (
    <View style={{}}>
      <SwitchItem
        bold
        label="Show Favourite Graphs"
        onValueChange={toggleShowFavouriteGraphs}
        value={showFavouriteGraphs}
      />

      {showFavouriteGraphs && (
        <View
          style={{
            marginTop: 15,
            marginEnd: -10,
            marginStart: 10,
            marginBottom: 10,
          }}
        >
          <GraphOptions
            bold={false}
            selectedInterval={
              selectedPeriod === 1 ? 0 : selectedPeriod === 3 ? 1 : 2
            }
            setSelectedInterval={updateSelectedPeriod}
            selectedGrouping={selectedGrouping === "weekly" ? 0 : 1}
            setSelectedGrouping={updateSelectedGrouping}
          />

          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text
                style={{
                  fontSize: theme.fontSizes.subheading,
                  color: theme.colors.primary,
                  fontWeight: theme.fontWeights.normal,
                }}
              >
                Target Muscle
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <ButtonGroup
                buttons={["Sets", "Reps", "Volume"]}
                selectedIndex={
                  selectedTargetMuscleData === "Sets"
                    ? 0
                    : selectedTargetMuscleData === "Reps"
                    ? 1
                    : 2
                }
                onPress={(value) => {
                  updateSelectedTargetMuscleData({
                    index: value,
                    data:
                      value === 0
                        ? "Sets"
                        : value === 1
                        ? "Reps"
                        : "Volume"
                  
                  })
                }}
              />
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text
                style={{
                  fontSize: theme.fontSizes.subheading,
                  color: theme.colors.primary,
                  fontWeight: theme.fontWeights.normal,
                }}
              >
                Exercise
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <ButtonGroup
                buttons={["Sets", "Reps", "Volume", "1RM"]}
                selectedIndex={
                  selectedExerciseData === "Sets"
                    ? 0
                    : selectedExerciseData === "Reps"
                    ? 1
                    : selectedExerciseData === "Volume"
                    ? 2
                    : 3
                }
                onPress={(value) => {
                  updateSelectedExerciseData({
                    index: value,
                    data:
                      value === 0
                        ? "Sets"
                        : value === 1
                        ? "Reps"
                        : value === 2
                        ? "Volume"
                        : "1RM",
                  })
                }}
              />
            </View>
          </View>
        </View>
      )}

      <Divider style={styles.divider} />
    </View>
  )
}

const HomeSettings = ({ params, settings }) => {
  return (
    <View>
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <OverviewSettings />

        <FollowedRoutineSettings />

        <FavouriteAchievementsSettings />

        <FavouriteExercisesSettings />

        <FavouriteGraphsSettings />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    width: Dimensions.get("window").width / 4,
    marginStart: 10,
    justifyContent: "center",
  },
  text: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  },
  divider: {
    marginVertical: 10,
  },
})

export default HomeSettings
