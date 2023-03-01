import { Divider, ButtonGroup } from "@rneui/themed"
import React, { useState } from "react"

import { Text, View, Switch, StyleSheet, Dimensions } from "react-native"
import GraphOptions from "../Graphs/GraphOptions"
import theme from "../../theme"

const Fields = ({ label, fields, selectedIndexes, onPress }) => (
  <ButtonGroup
    disabled={!label}
    buttons={fields}
    selectMultiple
    selectedIndexes={selectedIndexes}
    onPress={onPress}
    containerStyle={{
      marginTop: 10,
      marginHorizontal: 10,
      borderColor: label ? theme.colors.primary : theme.colors.primaryVariant,
    }}
  />
)

const SwitchItem = ({ onValueChange, value, label }) => (
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
        fontWeight: theme.fontWeights.bold,
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

const HomeSettings = ({ params }) => {
  const [overview, setOverview] = useState(true)
  const [followedRoutine, setFollowedRoutine] = useState(true)
  const [favouriteExercises, setFavouriteExercises] = useState(true)
  const [favouriteAchievements, setFavouriteAchievements] = useState(false)
  const [favouriteGraphs, setFavouriteGraphs] = useState(false)

  const overviewFields = ["Workouts", "Volume", "Sets", "Reps", "Duration"]
  const [selectedOverviewFields, setSelectedOverviewFields] = useState([
    0, 1, 2, 3, 4,
  ])

  const favouriteExerciseFields = [
    "1RM",
    "1RM Goal",
    "Volume",
    "Sets",
    "Reps",
    "Weight Record",
    "Volume Record",
  ]
  const [selectedFavouriteExerciseFields, setSelectedFavouriteExerciseFields] =
    useState([0, 1, 2, 3, 4, 5, 6])

  const [selectedInterval, setSelectedInterval] = useState({
    index: 0,
    months: 1,
  })

  const [selectedGrouping, setSelectedGrouping] = useState({
    index: 0,
    grouped: "weekly",
  })

  const [selectedData, setSelectedData] = useState({
    index: 0,
    data: "Sets",
  })

  return (
    <View>
      <View style={{ marginHorizontal: 10 }}>
        <SwitchItem
          label="Show Overview"
          onValueChange={() => setOverview(!overview)}
          value={overview}
        />
        {overview && (
          <Fields
            label={overview}
            fields={overviewFields}
            selectedIndexes={selectedOverviewFields}
            onPress={(value) => {
              setSelectedOverviewFields(value)
            }}
          />
        )}

        <Divider style={{ marginVertical: 10 }} />

        <SwitchItem
          label="Show Followed Routine"
          onValueChange={() => setFollowedRoutine(!followedRoutine)}
          value={followedRoutine}
        />

        <Divider style={{ marginVertical: 10 }} />

        <SwitchItem
          label="Show Favourite Achievements"
          onValueChange={() => setFavouriteAchievements(!favouriteAchievements)}
          value={favouriteAchievements}
        />

        <Divider style={{ marginVertical: 10 }} />

        <SwitchItem
          label="Show Favourite Exercises"
          onValueChange={() => setFavouriteExercises(!favouriteExercises)}
          value={favouriteExercises}
        />
        {favouriteExercises && (
          <Fields
            label={favouriteExercises}
            fields={favouriteExerciseFields}
            selectedIndexes={selectedFavouriteExerciseFields}
            onPress={(value) => {
              setSelectedFavouriteExerciseFields(value)
            }}
          />
        )}

        <Divider style={{ marginVertical: 10 }} />

        <SwitchItem
          label="Show Favourite Graphs"
          onValueChange={() => setFavouriteGraphs(!favouriteGraphs)}
          value={favouriteGraphs}
        />
        {favouriteGraphs && (
          <View style={{ marginTop: 5 }}>
            <GraphOptions
              selectedInterval={selectedInterval.index}
              setSelectedInterval={setSelectedInterval}
              selectedGrouping={selectedGrouping.index}
              setSelectedGrouping={setSelectedGrouping}
            />

            <View style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Exercise Data</Text>
              </View>
              <View style={{ flex: 1 }}>
                <ButtonGroup
                  buttons={["Sets", "Reps", "Volume", "1RM"]}
                  selectedIndex={selectedData.index}
                  onPress={(value) => {
                    setSelectedData({
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

        <Divider style={{ marginVertical: 10 }} />
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
})

export default HomeSettings
