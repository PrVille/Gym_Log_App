import React, { useState, useEffect } from "react"
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native"
import Stopwatch from "../Utils/Stopwatch"
import RestTimer from "../Utils/RestTimer"
import { createStackNavigator } from "@react-navigation/stack"
import FinishWorkoutScreen from "./FinishWorkoutScreen"
import theme from "../../theme"
import uuid from "react-native-uuid"
import ExercisePicker from "../Screens/ExercisePicker"
import { useDispatch, useSelector } from "react-redux"
import { createWorkout } from "../../redux/reducers/workoutReducer"
import { createMultipleSets } from "../../redux/reducers/setReducer"
import { updateExercise } from "../../redux/reducers/exerciseReducer"
import { selectPlannedWorkoutById } from "../../redux/reducers/plannedWorkoutReducer"
import { useTheme } from "@react-navigation/native"
import CloseButton from "../Buttons/CloseButton"
import BackButton from "../Buttons/BackButton"
import ForwardButton from "../Buttons/ForwardButton"
import DoneButton from "../Buttons/DoneButton"
import { Button, Chip, Icon } from "@rneui/themed"
import Card from "../Utils/Card"
import {
  selectActiveRoutine,
  updateRoutine,
  updateRoutineCompletedCount,
} from "../../redux/reducers/routineReducer"
import { useHeaderHeight } from "@react-navigation/elements"
import Section from "../Utils/Section"

const Logger = ({
  navigation,
  exercises,
  addWorkingSet,
  addWarmupSet,
  updateWeightForSet,
  updateRepsForSet,
  workout,
  removeSet,
}) => {
  const { colors } = useTheme()

  const primaryMuscles = [
    ...new Set(exercises.map((p) => p.exercise.primaryMuscles).flat()),
  ]
  const secondaryMuscles = [
    ...new Set(exercises.map((p) => p.exercise.secondaryMuscles).flat()),
  ].filter((muscle) => !primaryMuscles.includes(muscle))

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          padding: 10,
          backgroundColor: colors.background,
        }}
      >
        <View
          style={{
            alignItems: "center",
            margin: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: theme.fontSizes.heading,
              textAlign: "center",
              color: theme.colors.primary,
            }}
          >
            {workout.name}
          </Text>
        </View>

        {exercises.map((exercise, i) => (
          <Card key={exercise.exercise._id}>
            <Card.Header
              divider
              buttonTitle="Exercise Details"
              onButtonPress={() =>
                navigation.navigate("ExerciseDetails", exercise.exercise._id)
              }
            >
              {exercise.exercise.name}
            </Card.Header>
            <Card.Body divider>
              <Card.BodyHeader divider>
                <Chip
                  containerStyle={{
                    marginVertical: 5,
                    alignItems: "flex-end",
                  }}
                  buttonStyle={{ backgroundColor: theme.colors.background }}
                  titleStyle={{
                    color: theme.colors.primary,
                  }}
                  title="Add Warmup Set"
                  icon={{
                    name: "playlist-add",
                    type: "material-icon",
                    color: theme.colors.primary,
                  }}
                  iconRight
                  onPress={() => addWarmupSet(exercise.exercise._id)}
                />
              </Card.BodyHeader>
              {exercise.sets.map((set, index) => (
                <Card.Row
                  key={index}
                  onDeletePress={() =>
                    removeSet(exercise.exercise._id, set._id)
                  }
                >
                  <Card.Column alignItems="flex-start">{index + 1}</Card.Column>

                  <Card.IconColumn
                    alignItems="flex-start"
                    name={set.type === "warmup" ? "fitness" : "weight-lifter"}
                    type={
                      set.type === "warmup" ? "ionicon" : "material-community"
                    }
                  />

                  <Card.InputColumn
                    placeholder="Reps"
                    value={`${set.reps}`}
                    onChangeText={(value) =>
                      updateRepsForSet(exercise.exercise._id, set._id, value)
                    }
                  />

                  <Card.InputColumn
                    keyboardType="decimal-pad"
                    placeholder="Kg"
                    value={`${set.weight}`}
                    onChangeText={(value) =>
                      updateWeightForSet(exercise.exercise._id, set._id, value)
                    }
                  />
                </Card.Row>
              ))}
            </Card.Body>
            <Card.Footer>
              <Chip
                containerStyle={{
                  marginVertical: 5,
                  alignItems: "flex-end",
                }}
                buttonStyle={{ backgroundColor: theme.colors.background }}
                titleStyle={{
                  color: theme.colors.primary,
                }}
                title="Add Working Set"
                icon={{
                  name: "playlist-add",
                  type: "material-icon",
                  color: theme.colors.primary,
                }}
                iconRight
                onPress={() => addWorkingSet(exercise.exercise._id)}
              />
            </Card.Footer>
          </Card>
        ))}

        <Button
          title="Add Exercise"
          containerStyle={{ margin: 10 }}
          onPress={() => navigation.navigate("ExercisePicker")}
        />

        <Section>
          <Section.Title>Target muscles</Section.Title>

          <Section.SubSection divider>
            <Section.SubSectionItem>
              <Section.SubSectionItemTitle>Primary</Section.SubSectionItemTitle>
              <Section.SubSectionItemBody>
                {primaryMuscles.join(", ")}
              </Section.SubSectionItemBody>
            </Section.SubSectionItem>
          </Section.SubSection>

          <Section.SubSection divider>
            <Section.SubSectionItem>
              <Section.SubSectionItemTitle>
                Secondary
              </Section.SubSectionItemTitle>
              <Section.SubSectionItemBody>
                {secondaryMuscles.join(", ")}
              </Section.SubSectionItemBody>
            </Section.SubSectionItem>
          </Section.SubSection>
        </Section>
      </ScrollView>

      <RestTimer/>
    </SafeAreaView>
  )
}

const Stack = createStackNavigator()

const LoggerStack = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const [startTime] = useState(Date.now())
  const [finishTime, setFinishTime] = useState()
  const [exercises, setExercises] = useState([])
  const [workout, setWorkout] = useState({
    name: "",
    notes: "",
    duration: 0,
  })
  const plannedWorkout = route.params
    ? useSelector((state) => selectPlannedWorkoutById(state, route.params))
    : null
  const activeRoutine = useSelector(selectActiveRoutine)

  useEffect(() => {
    const selectWeight = (plannedSet, exercise) => {
      switch (plannedSet.plannedWeightType) {
        case "previousWeight":
          exercise.sets.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
          })
          const set = exercise.sets.find(
            (set) => set.reps === plannedSet.plannedReps
          )
          if (!set) return 0
          return !set.weight ? 0 : set.weight
        case "oneRepMaxPercentage":
          return (exercise.oneRepMax * plannedSet.oneRepMaxPercentage) / 100
        case "plannedWeight":
          return plannedSet.plannedWeight
        default:
          return 0
      }
    }

    if (plannedWorkout) {
      const plannedExercises = plannedWorkout.plannedExercises

      for (let i = 0; i < plannedExercises.length; i++) {
        const exercise = plannedExercises[i]
        const plannedSets = plannedExercises[i].sets
        for (let j = 0; j < plannedSets.length; j++) {
          const plannedSet = plannedSets[j]
          const set = {
            _id: uuid.v4(),
            type: plannedSet.type,
            exercise: plannedSet.exercise,
            reps: plannedSet.plannedReps,
            weight: parseFloat(
              selectWeight(plannedSet, exercise.exercise)
            ).toLocaleString("en-US", { maximumFractionDigits: 2 }),
          }

          plannedSets[j] = { ...set }
        }
      }

      setExercises(plannedExercises)
      setWorkout({
        name: plannedWorkout.name,
        notes: plannedWorkout.notes,
        duration: plannedWorkout.estimatedDuration,
      })
    }
  }, [])

  const updateExercises = (newExercise) => {
    const newSet = {
      _id: uuid.v4(),
      type: "work",
      exercise: newExercise._id,
      weight: 0,
      reps: 0,
    }

    return setExercises([
      ...exercises,
      {
        exercise: newExercise,
        sets: [newSet],
      },
    ])
  }

  const submitWorkout = async () => {
    // Brzycki 1RM formula
    // 1RM = w / [1.0278 - (0.0278 * r)]
    // accurate for <= 10 reps
    const Brzycki1RM = (w, r) => {
      return w / (1.0278 - 0.0278 * r)
    }

    // Epley 1RM formula
    // 1RM = w * (1 + (0.0333 * r))
    // Better than Brzycki for > 10 reps
    const Epley1RM = (w, r) => {
      return w * (1 + 0.0333 * r)
    }

    const getUpdated1RM = (set, exercise) => {
      const weight = set.weight
      const reps = set.reps
      const current1RM = exercise.oneRepMax
      const new1RM =
        reps <= 10 ? Brzycki1RM(weight, reps) : Epley1RM(weight, reps)

      if (new1RM > current1RM) {
        return new1RM.toFixed(2)
      }
      return current1RM
    }

    for (let i = 0; i < exercises.length; i++) {
      const sets = exercises[i].sets
      for (let j = 0; j < sets.length; j++) {
        exercises[i].exercise.oneRepMax = getUpdated1RM(
          sets[j],
          exercises[i].exercise
        )
        delete sets[j]._id
      }

      await dispatch(createMultipleSets(sets)).then((createdSets) => {
        exercises[i].sets = createdSets
        dispatch(
          updateExercise({
            ...exercises[i].exercise,
            sets: exercises[i].exercise.sets.concat(createdSets),
          })
        )
      })
    }

    if (activeRoutine && plannedWorkout) {
      const routineWorkouts = activeRoutine.weeks
        .map((week) => week.plannedWorkouts)
        .flat()
      if (
        routineWorkouts[activeRoutine.completedCount]._id === plannedWorkout._id
      )
        dispatch(updateRoutineCompletedCount(activeRoutine))
    }

    dispatch(
      createWorkout({
        ...workout,
        exercises,
      })
    )
  }

  const addWorkingSet = (id) => {
    const copyOfExercises = JSON.parse(JSON.stringify(exercises)) // deep copy
    const exercise = copyOfExercises.find((e) => e.exercise._id === id)

    const newSet = {
      _id: uuid.v4(),
      type: "work",
      exercise: id,
      weight: 0,
      reps: 0,
    }

    exercise.sets.push(newSet)
    return setExercises(copyOfExercises)
  }

  const addWarmupSet = (id) => {
    const copyOfExercises = JSON.parse(JSON.stringify(exercises)) // deep copy
    const exercise = copyOfExercises.find((e) => e.exercise._id === id)

    const newWarmupSet = {
      _id: uuid.v4(),
      type: "warmup",
      exercise: id,
      weight: 0,
      reps: 0,
    }

    const warmupSetAmount = exercise.sets.filter(
      (set) => set.type === "warmup"
    ).length

    if (warmupSetAmount === 0) {
      exercise.sets.unshift(newWarmupSet)
    } else {
      exercise.sets.splice(warmupSetAmount, 0, newWarmupSet)
    }
    return setExercises(copyOfExercises)
  }

  const updateWeightForSet = (exerciseId, setId, weight) => {
    const copyOfExercises = JSON.parse(JSON.stringify(exercises)) // deep copy
    const exercise = copyOfExercises.find((e) => e.exercise._id === exerciseId)
    const set = exercise.sets.find((set) => set._id === setId)
    set.weight = weight
    return setExercises(copyOfExercises)
  }

  const updateRepsForSet = (exerciseId, setId, reps) => {
    const copyOfExercises = JSON.parse(JSON.stringify(exercises)) // deep copy
    const exercise = copyOfExercises.find((e) => e.exercise._id === exerciseId)
    const set = exercise.sets.find((set) => set._id === setId)
    set.reps = reps
    return setExercises(copyOfExercises)
  }

  const removeSet = (exerciseId, setId) => {
    const copyOfExercises = JSON.parse(JSON.stringify(exercises)) // deep copy
    const exercise = copyOfExercises.find((e) => e.exercise._id === exerciseId)
    exercise.sets = exercise.sets.filter((set) => set._id !== setId)
    return setExercises(copyOfExercises)
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Logger"
        options={({ navigation }) => ({
          presentation: "transparentModal",
          headerShadowVisible: false,
          headerTitle: () => <Stopwatch startTime={startTime} />,
          headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
          headerRight: () => (
            <ForwardButton
              onPress={() => {
                setFinishTime(Date.now())
                navigation.navigate("FinishWorkout")
              }}
            />
          ),
        })}
      >
        {(props) => (
          <Logger
            exercises={exercises}
            addWorkingSet={addWorkingSet}
            addWarmupSet={addWarmupSet}
            updateWeightForSet={updateWeightForSet}
            updateRepsForSet={updateRepsForSet}
            workout={workout}
            removeSet={removeSet}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="ExercisePicker"
        options={({ navigation }) => ({
          presentation: "transparentModal",
          headerTitle: "Choose Exercise",
          headerShadowVisible: false,
          headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
          headerRight: null, //search button here
        })}
      >
        {(props) => (
          <ExercisePicker
            onSelection={updateExercises}
            existingExercises={exercises.map(
              (exercise) => exercise.exercise._id
            )}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="FinishWorkout"
        options={({ navigation }) => ({
          presentation: "card",
          headerTitle: "Finish workout",
          headerShadowVisible: false,
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
          headerRight: () => (
            <DoneButton
              onPress={() => {
                submitWorkout()
                navigation.navigate("TabNavigator")
                navigation.navigate("Home")
              }}
            />
          ),
        })}
      >
        {(props) => (
          <FinishWorkoutScreen
            startTime={startTime}
            finishTime={finishTime}
            workout={workout}
            setWorkout={setWorkout}
            {...props}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default LoggerStack
