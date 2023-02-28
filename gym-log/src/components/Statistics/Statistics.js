import { Divider, ListItem, Icon } from "@rneui/themed"
import { SafeAreaView } from "react-native"
import { ScrollView, View, Text, StyleSheet } from "react-native"
import theme from "../../theme"
import { useSelector } from "react-redux"
import { selectExercisesSortedByName } from "../../redux/reducers/exerciseReducer"
import { getTestData } from "../Graphs/helpers"

const ExerciseStatsList = ({ searchQuery, navigation }) => {
  const exercises = useSelector((state) =>
    selectExercisesSortedByName(state, "asc")
  ).filter((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <View style={{ marginHorizontal: 5 }}>
      {exercises.map((exercise) => (
        <View key={exercise._id}>
          <ListItem
            onPress={() =>
              navigation.navigate("GraphScreen", {
                category: "Exercise",
                type: exercise._id,
              })
            }
          >
            <Icon name="weight-lifter" type="material-community" />
            <ListItem.Content>
              <ListItem.Title>{exercise.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <Divider style={styles.divider} />
        </View>
      ))}
    </View>
  )
}

const TargetMuscleStatsList = ({ searchQuery, navigation }) => {
  const items = [
    "Abs",
    "Biceps",
    "Calves",
    "Deltoids",
    "Forearms",
    "Gluteals",
    "Hamstrings",
    "Lats",
    "Pectoralis",
    "Traps",
    "Triceps",
    "Quadriceps",
  ].filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <View style={{ marginHorizontal: 5 }}>
      {items.map((item) => (
        <View key={item}>
          <ListItem
            onPress={() =>
              navigation.navigate("GraphScreen", {
                category: "TargetMuscle",
                type: item,
              })
            }
          >
            <Icon name="arm-flex" type="material-community" />
            <ListItem.Content>
              <ListItem.Title>{item}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <Divider style={styles.divider} />
        </View>
      ))}
    </View>
  )
}

const OverallStatsList = ({ searchQuery, navigation }) => {
  const items = ["Duration", "Reps", "Sets", "Volume", "Workouts"].filter(
    (item) => item.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <View style={{ marginHorizontal: 5 }}>
      {items.map((item) => (
        <View key={item}>
          <ListItem
            onPress={() =>
              navigation.navigate("GraphScreen", {
                category: "Overall",
                type: item,
              })
            }
          >
            <Icon name="dumbbell" type="material-community" />
            <ListItem.Content>
              <ListItem.Title>{item}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <Divider style={styles.divider} />
        </View>
      ))}
    </View>
  )
}

const Title = ({ children }) => {
  return (
    <View style={styles.titleView}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  )
}

const Statistics = ({ searchQuery, navigation }) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <Title>Overall</Title>
        <OverallStatsList searchQuery={searchQuery} navigation={navigation} />

        <Title>Target Muscle</Title>
        <TargetMuscleStatsList
          searchQuery={searchQuery}
          navigation={navigation}
        />

        <Title>Exercises</Title>
        <ExerciseStatsList searchQuery={searchQuery} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  titleView: {
    marginStart: 10,
    marginTop: 30,
    marginBottom: 10,
  },
  titleText: {
    fontSize: theme.fontSizes.heading,
    flex: 1,
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  },
  divider: {
    marginHorizontal: 15,
  },
})

export default Statistics
