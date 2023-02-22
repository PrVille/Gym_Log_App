import { Button, ListItem, Icon, Chip } from "@rneui/themed"
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native"
import theme from "../../theme"

const RoutineForm = ({
  navigation,
  routine,
  addWeek,
  removeWeek,
  removePlannedWorkout,
}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {routine.weeks.map((week, weekIndex) => (
          <View key={weekIndex}>
            <View
              style={{
                marginVertical: 15,
                marginHorizontal: 10,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: theme.fontSizes.heading,
                  color: theme.colors.primary,
                  fontWeight: theme.fontWeights.bold,
                }}
              >
                {routine.weeks.length === 1
                  ? "Weekly"
                  : "Week " + (weekIndex + 1)}
              </Text>
              {(weekIndex != 0 || routine.weeks.length !== 1) && (
                <TouchableOpacity
                  style={{
                    minWidth: "20%",
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                  onPress={() => removeWeek(weekIndex)}
                >
                  <Text
                    style={{
                      fontSize: theme.fontSizes.subheading,
                      color: theme.colors.primaryVariant,
                    }}
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {week.map((plannedWorkout, i) => (
              <ListItem.Swipeable
                key={i}
                onPress={() =>
                  navigation.navigate(
                    "PlannedWorkoutDetails",
                    plannedWorkout._id
                  )
                }
                rightContent={(reset) => (
                  <Button
                    title="Remove"
                    titleStyle={{ color: "white" }}
                    onPress={() => {
                      removePlannedWorkout(weekIndex, i)
                      reset()
                    }}
                    icon={{ name: "delete", color: "white" }}
                    buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
                  />
                )}
              >
                <Icon name="dumbbell" type="material-community" size={50} />
                <ListItem.Content>
                  <ListItem.Title>
                    {"Day " + (i + 1) + ": "} {plannedWorkout.name}
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    Exercises: {plannedWorkout.plannedExercises.length} |
                    Duration: {plannedWorkout.estimatedDuration}{" "}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem.Swipeable>
            ))}
            <Chip
              containerStyle={{
                marginVertical: 5,
                alignItems: "flex-start",
                marginStart: 10,
              }}
              buttonStyle={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.primary,
                borderWidth: 1,
              }}
              titleStyle={{
                color: theme.colors.primary,
              }}
              title="Add Workout"
              icon={{
                name: "playlist-add",
                type: "material-icon",
                color: theme.colors.primary,
              }}
              iconLeft
              onPress={() =>
                navigation.navigate("PlannedWorkoutPicker", weekIndex)
              }
            />
          </View>
        ))}

        <Button
          title="Add Week"
          containerStyle={{ marginHorizontal: 10, marginVertical: 20 }}
          onPress={addWeek}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default RoutineForm
