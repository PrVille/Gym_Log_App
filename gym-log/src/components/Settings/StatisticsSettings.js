import { useState } from "react"
import { Text, View, ScrollView, StyleSheet, Dimensions } from "react-native"
import { Divider, ButtonGroup } from "@rneui/themed"
import { useDispatch, useSelector } from "react-redux"
import { selectUser, updateUser } from "../../redux/reducers/userReducer"
import SwitchItem from "./SwitchItem"
import theme from "../../theme"

const StatisticsSettings = ({ params }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const userCopy = JSON.parse(JSON.stringify(user))
  const selectedSecondaryMuscleFactor =
    user.settings.statistics.secondaryMuscleWeight
  const selectedGraphLineType = user.settings.statistics.graphLineType

  const updateSelectedSecondaryMuscleFactor = (value) => {
    userCopy.settings.statistics.secondaryMuscleWeight = value
    dispatch(updateUser(userCopy))
  }

  const updateSelectedGraphLineType = (value) => {
    userCopy.settings.statistics.graphLineType = value
    dispatch(updateUser(userCopy))
  }

  return (
    <ScrollView contentInset={{ bottom: 50 }}>
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <View
          style={{
            marginTop: 15,
            marginEnd: -10,
            marginStart: -10,
            marginBottom: 10,
          }}
        >
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Secondary Muscle Weight</Text>
            </View>
            <View style={{ flex: 1 }}>
              <ButtonGroup
                buttons={["0", "0.5", "1"]}
                selectedIndex={
                  selectedSecondaryMuscleFactor === 0
                    ? 0
                    : selectedSecondaryMuscleFactor === 0.5
                    ? 1
                    : 2
                }
                onPress={(value) => {
                  updateSelectedSecondaryMuscleFactor(
                    value === 0 ? 0 : value === 1 ? 0.5 : 1
                  )
                }}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 5,
              marginBottom: 10,
              marginStart: 10,
            }}
          >
            <Text
              style={{
                fontSize: theme.fontSizes.body,
                color: theme.colors.primary,
                fontWeight: theme.fontWeights.normal,
              }}
            >
              Factor for secondary muscle calculations in target muscle graphs.
              Primary muscles have weight of 1.
            </Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        <View
          style={{
            marginTop: 15,
            marginEnd: -10,
            marginStart: -10,
            marginBottom: 15,
          }}
        >
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Graph Line Type</Text>
            </View>
            <View style={{ flex: 1 }}>
              <ButtonGroup
                buttons={["Linear", "Monotone", "Step"]}
                selectedIndex={selectedGraphLineType === "linear" ? 0 : selectedGraphLineType === "monotoneX" ? 1 : 2}
                onPress={(value) => {
                  updateSelectedGraphLineType(
                    value === 0 ? "linear" : value === 1 ? "monotoneX" : "step"
                  )
                }}
              />
            </View>
          </View>
        </View>

        <Divider style={styles.divider} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    width: Dimensions.get("window").width / 3,
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

export default StatisticsSettings
