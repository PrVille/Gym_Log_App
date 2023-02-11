import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import theme from "../../theme"
import { useSelector } from "react-redux"
import { selectPlannedWorkoutById } from "../../redux/reducers/plannedWorkoutReducer"
import { useTheme } from '@react-navigation/native';


const PlannedWorkoutExerciseCard = ({ item }) => {
  const { exercise, sets } = item

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        borderWidth: 2,
        overflow: "hidden",
        borderColor: "grey",
      }}
    >
      {/** HEADER */}
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 5,
          borderBottomColor: "grey",
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {exercise.name}
        </Text>
        <TouchableOpacity>
          <Text>Exercise Details</Text>
        </TouchableOpacity>
      </View>

      {/** SETS */}
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>Set</Text>
          <Text>Type</Text>
          <Text>Reps</Text>
          <Text>Weight</Text>
        </View>
        {sets.map((set, i) => {
          return (
            <View
              key={i}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>{i + 1}</Text>
              <Text>{set.type}</Text>
              <Text>{set.plannedReps}</Text>
              {set.plannedWeightType === "oneRepMaxPercentage" && (
                <Text>{set.oneRepMaxPercentage}%</Text>
              )}
              {set.plannedWeightType === "plannedWeight" && (
                <Text>{set.plannedWeight}kg</Text>
              )}
              {set.plannedWeightType === "previousWeight" && <Text>prev</Text>}
            </View>
          )
        })}
      </View>
    </View>
  )
}

const ItemSeparator = () => <View style={{ height: 5 }} />

const PlannedWorkoutExerciseList = ({ plannedExercises }) => {
  return (
    <FlatList
      data={plannedExercises}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <PlannedWorkoutExerciseCard item={item} />}
    />
  )
}

const PlannedWorkoutDetails = ({ route, navigation }) => {
  const id = route.params
  const plannedWorkout = useSelector((state) =>
    selectPlannedWorkoutById(state, id)
  )
  const { colors } = useTheme();

  const { name, notes, estimatedDuration, plannedExercises } = plannedWorkout

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          flex: 1,
          margin: 5,
        }}
      >
        <View
          style={{
            padding: 5,
            borderRadius: 5,
            borderWidth: 2,
            overflow: "hidden",
            borderColor: "grey",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text>{name}</Text>
            <Text>{notes}</Text>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                Primary muscle groups
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                Secondary muscle groups
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              paddingVertical: 10,
              borderRadius: 5,
              borderWidth: 2,
              overflow: "hidden",
              borderColor: "grey",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("LoggerStack", { plannedWorkout })
            }}
          >
            <Text
              style={{
                fontSize: theme.fontSizes.subheading,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Start this workout
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 10,
          }}
        >
          <PlannedWorkoutExerciseList plannedExercises={plannedExercises} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})

export default PlannedWorkoutDetails
