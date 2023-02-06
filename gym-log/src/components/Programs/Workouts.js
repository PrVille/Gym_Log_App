import React, { useState } from "react"
import {
  Text,
  View,
  Button,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import Search from "../Utils/Search"
import theme from "../../theme"
import uuid from "react-native-uuid"
import useWorkouts from "../../hooks/useWorkouts"
import CreatePlannedWorkout from "../Screens/CreatePlannedWorkout"

const Stack = createStackNavigator()

const workouts = [
  {
    id: 0,
    name: "Upper Body #1",
    description:
      "Chest focused upper body workout. Complementary to Upper Body #2 workout.",
    exercises: [
      //ref exercises
      {
        id: "62a1e16b37de7e6752ff7194",
        name: "bench press",
        instructions:
          "Set your feet at a stable position and lie on a flat bench with the racked bar above your face. Place your hands slightly wider than shoulder width on the bar, ensuring the grip is even on both sides and the width is comfortable. Leverage yourself against the bar to retract and depress your scapula, and push with your legs to reinforce your lower back arch. Unrack the bar and bring it forward over your chest with straight arms. Lower the bar in a controlled manner until it touches your lower chest before pressing it back to its starting position, all while maintaining the same scapula position and lower back arch.",
        equipment: "barbell",
        primaryMuscleGroups: ["arms", "chest"],
        secondaryMuscleGroups: ["shoulders"],
        primaryMuscles: ["lower chest", "triceps"],
        secondaryMuscles: ["anterior deltoid", "upper chest"],
        force: "push",
        movement: "dynamic",
        type: "compound",
        tags: [],
        sets: [
          {
            id: uuid.v4(),
            type: "warmup",
            reps: 12,
            weight: 20,
          },
          {
            id: uuid.v4(),
            type: "warmup",
            reps: 5,
            weight: 35,
          },
          {
            id: uuid.v4(),
            type: "working",
            reps: 8,
            weight: 45,
          },
          {
            id: uuid.v4(),
            type: "working",
            reps: 8,
            weight: 45,
          },
          {
            id: uuid.v4(),
            type: "working",
            reps: 8,
            weight: 45,
          },
        ],
      },
      {
        id: "62a1e16b37de7e6752ff7184",
        name: "lat pulldown",
        instructions:
          "Sit on the seat with thighs directly underneath the supports. Grip the cable attachment with the desired grip with elevated shoulders. Pull the bar down towards your body by driving your elbows down, depressing your shoulders until you touch your upper chest. Control the cable attachment back up until the arms and shoulders are extended.",
        equipment: "cable",
        primaryMuscleGroups: ["back"],
        secondaryMuscleGroups: ["arms"],
        primaryMuscles: ["latissimus dorsi"],
        secondaryMuscles: ["biceps", "brachioradialis", "trapezius"],
        force: "pull",
        movement: "dynamic",
        type: "compound",
        tags: [],
        sets: [
          {
            id: uuid.v4(),
            type: "warmup",
            reps: 12,
            weight: 20,
          },
          {
            id: uuid.v4(),
            type: "working",
            reps: 12,
            weight: 40,
          },
          {
            id: uuid.v4(),
            type: "working",
            reps: 12,
            weight: 40,
          },
          {
            id: uuid.v4(),
            type: "working",
            reps: 12,
            weight: 40,
          },
        ],
      },
    ],
  },
  {
    id: 1,
    name: "Lower Body #1",
    exercises: [
      //ref exercises
      {
        id: "62a1e16b37de7e6752ff7265",
        name: "paused barbell squat",
        instructions:
          "Perform a squat with a barbell on your back. Pause at the bottom of the range of motion momentarily, ensuring your core is braced and your back is straight. Complete the movement by extending the knees and hips to stand back up with the barbell.",
        equipment: "barbell",
        primaryMuscleGroups: ["legs", "back"],
        secondaryMuscleGroups: ["core"],
        primaryMuscles: ["quadriceps", "gluteal muscles", "erector spinae"],
        secondaryMuscles: [
          "adductors",
          "hamstrings",
          "obliques",
          "transverse abdominis",
        ],
        force: "push",
        movement: "dynamic",
        type: "compound",
        tags: ["powerlifting"],
        sets: [
          {
            id: uuid.v4(),
            type: "warmup",
            reps: 12,
            weight: 20,
          },
          {
            id: uuid.v4(),
            type: "warmup",
            reps: 5,
            weight: 35,
          },
          {
            id: uuid.v4(),
            type: "working",
            reps: 8,
            weight: 45,
          },
          {
            id: uuid.v4(),
            type: "working",
            reps: 8,
            weight: 45,
          },
          {
            id: uuid.v4(),
            type: "working",
            reps: 8,
            weight: 45,
          },
        ],
      },
      {
        id: "62a1e16b37de7e6752ff7176",
        name: "conventional deadlift",
        instructions:
          "Set up with your shins approximately an inch away from the barbell, at a width slightly narrower than shoulder width apart. Your feet should be pointing straight forwards or very slightly outwards. Grip the bar outside of your knees with straight arms. Set your hips to a comfortable height and push your knees outwards. Brace your back by depressing and retracting your scapula, and brace your core after breathing in. Push with your legs while maintaining your torso angle to lift the bar, staying braced and finish the lift by pushing your hips through and flexing the glutes to stand up straight.",
        equipment: "barbell",
        primaryMuscleGroups: ["legs", "back"],
        secondaryMuscleGroups: ["core"],
        primaryMuscles: [
          "gluteal muscles",
          "quadriceps",
          "latissimus dorsi",
          "erector spinae",
          "trapezius",
          "hamstrings",
        ],
        secondaryMuscles: ["transverse abdominis", "adductors"],
        force: "pull",
        movement: "dynamic",
        type: "compound",
        tags: ["powerlifting"],
        sets: [
          {
            id: uuid.v4(),
            type: "warmup",
            reps: 12,
            weight: 20,
          },
          {
            id: uuid.v4(),
            type: "working",
            reps: 12,
            weight: 40,
          },
          {
            id: uuid.v4(),
            type: "working",
            reps: 12,
            weight: 40,
          },
          {
            id: uuid.v4(),
            type: "working",
            reps: 12,
            weight: 40,
          },
        ],
      },
    ],
  },
]


const WorkoutExerciseCard = ({ item }) => {
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
          {item.name}
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
        {item.sets.map((set, i) => {
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
              <Text>{set.reps}</Text>
              <Text>{set.weight}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const WorkoutExerciseList = ({ exercises }) => {
  return (
    <FlatList
      data={exercises}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <WorkoutExerciseCard item={item} />}
    />
  )
}

const WorkoutDetails = ({ route, navigation }) => {
  const workout = route.params
  const primaryMuscleGroups = route.params.exercises
    .map((e) => e.primaryMuscleGroups)
    .flat()
  const secondaryMuscleGroups = route.params.exercises
    .map((e) => e.secondaryMuscleGroups)
    .flat()

  return (
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
          <Text>{workout.name}</Text>
          <Text>{workout.description}</Text>
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
            {primaryMuscleGroups.map((muscleGroup, i) => (
              <Text key={i}>{muscleGroup}</Text>
            ))}
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
            {secondaryMuscleGroups.map((muscleGroup, i) => (
              <Text key={i}>{muscleGroup}</Text>
            ))}
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
          onPress={() => navigation.navigate("LoggerStack", workout)}
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
        <WorkoutExerciseList exercises={workout.exercises} />
      </View>
    </View>
  )
}

const WorkoutCard = ({ item }) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        alignItems: "stretch",
        borderRadius: 5,
        borderWidth: 2,
        overflow: "hidden",
        borderColor: "grey",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {item.name}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            flex: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Exercises</Text>
          <Text>6</Text>
        </View>
        <View
          style={{
            flex: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Total Sets</Text>
          <Text>20</Text>
        </View>
        <View
          style={{
            flex: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Estimated duration</Text>
          <Text>60 min</Text>
        </View>
      </View>
    </View>
  )
}

const ItemSeparator = () => <View style={{ height: 5 }} />

const WorkoutList = ({ navigation }) => {
  return (
    <FlatList
      data={workouts}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigation.navigate("WorkoutDetails", item)}>
          <WorkoutCard item={item} />
        </Pressable>
      )}
    />
  )
}

const Workouts = ({ params }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStatusBarHeight: 0,
        headerStyle: {
          backgroundColor: "white",
          height: 60,
        },
        cardStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen
        name="WorkoutList"
        component={WorkoutList}
        options={({ navigation }) => ({
          headerTitle: "",
          headerLeft: (props) => <Search {...props} />,
          headerRight: () => (
            <View style={{flex: 1, flexDirection: "row", backgroundColor: "red"}}>
              <TouchableOpacity
                style={{
                  marginEnd: 10,
                  paddingEnd: 10,
                  paddingStart: 10,
                  flex: 0,
                  alignContent: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("WorkoutHistory")}
              >
                <Text style={{ fontSize: 30 }}>H</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginEnd: 10,
                  paddingEnd: 10,
                  paddingStart: 10,
                  flex: 0,
                  alignContent: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("CreatePlannedWorkout")}
              >
                <Text style={{ fontSize: 30 }}>+</Text>
              </TouchableOpacity>
              
            </View>
          ),
        })}
      />
      <Stack.Screen name="WorkoutDetails" component={WorkoutDetails} />
    </Stack.Navigator>
  )
}

export default Workouts
