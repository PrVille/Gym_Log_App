import { createStackNavigator } from "@react-navigation/stack"
import { useState, useEffect } from "react"

import PlannedWorkoutPicker from "./PlannedWorkoutPicker"
import RoutineForm from "./RoutineForm"
import CloseButton from "../Buttons/CloseButton"
import ForwardButton from "../Buttons/ForwardButton"
import BackButton from "../Buttons/BackButton"
import DoneButton from "../Buttons/DoneButton"

import theme from "../../theme"
import RoutineFormFinish from "./RoutineFormFinish"
import { useDispatch, useSelector } from "react-redux"
import {
  createRoutine,
  selectRoutineById,
  updateRoutine,
} from "../../redux/reducers/routineReducer"

const Stack = createStackNavigator()

const RoutineFormStack = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [routine, setRoutine] = useState({
    name: "",
    notes: "",
    weeks: [[]],
  })
  const routineToEdit = route.params
    ? useSelector((state) => selectRoutineById(state, route.params))
    : null

  useEffect(() => {
    if (routineToEdit) {
      setRoutine({
        name: routineToEdit.name,
        notes: routineToEdit.notes,
        weeks: routineToEdit.weeks.map((week) => week.plannedWorkouts),
      })
    }
  }, [])

  const addWeek = () => {
    const copyOfRoutine = JSON.parse(JSON.stringify(routine))
    copyOfRoutine.weeks.push([])
    return setRoutine(copyOfRoutine)
  }

  const removeWeek = (index) => {
    const copyOfRoutine = JSON.parse(JSON.stringify(routine))
    copyOfRoutine.weeks.splice(index, 1)
    return setRoutine(copyOfRoutine)
  }

  const addPlannedWorkout = (index, selection) => {
    const copyOfRoutine = JSON.parse(JSON.stringify(routine))
    copyOfRoutine.weeks[index].push(selection)
    return setRoutine(copyOfRoutine)
  }

  const removePlannedWorkout = (weekIndex, index) => {
    const copyOfRoutine = JSON.parse(JSON.stringify(routine))
    copyOfRoutine.weeks[weekIndex].splice(index, 1)
    return setRoutine(copyOfRoutine)
  }

  const submitRoutine = () => {
    try {
      if (routineToEdit) {
        dispatch(
          updateRoutine({
            ...routine,
            _id: routineToEdit._id,
            weeks: routine.weeks.map((week, i) => ({
              week: i + 1,
              plannedWorkouts: week,
            })),
          })
        )
        return
      }

      dispatch(
        createRoutine({
          ...routine,
          weeks: routine.weeks.map((week, i) => ({
            week: i + 1,
            plannedWorkouts: week,
          })),
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RoutineForm"
        options={({ navigation }) => ({
          presentation: "transparentModal",
          headerTitle: "Create Routine",
          headerShadowVisible: false,
          cardStyle: {
            flex: 1,
            backgroundColor: theme.colors.background,
          },
          headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
          headerRight: () => (
            <ForwardButton
              onPress={() => {
                navigation.navigate("RoutineFormFinish")
              }}
            />
          ),
        })}
      >
        {(props) => (
          <RoutineForm
            routine={routine}
            addWeek={addWeek}
            removeWeek={removeWeek}
            removePlannedWorkout={removePlannedWorkout}
            {...props}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="RoutineFormFinish"
        options={({ navigation }) => ({
          presentation: "transparentModal",
          headerTitle: "Finish",
          headerShadowVisible: false,
          cardStyle: {
            flex: 1,
            backgroundColor: theme.colors.background,
          },
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
          headerRight: () => (
            <DoneButton
              onPress={() => {
                submitRoutine()
                navigation.goBack()
                navigation.goBack()
              }}
            />
          ),
        })}
      >
        {(props) => (
          <RoutineFormFinish
            routine={routine}
            setRoutine={setRoutine}
            {...props}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="PlannedWorkoutPicker"
        options={({ navigation }) => ({
          presentation: "transparentModal",
          headerTitle: "Choose Workout",
          headerShadowVisible: false,
          cardStyle: {
            flex: 1,
            backgroundColor: theme.colors.background,
          },
          headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
        })}
      >
        {(props) => (
          <PlannedWorkoutPicker onSelection={addPlannedWorkout} {...props} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default RoutineFormStack
