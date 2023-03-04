import React from "react"
import { Text, View, ScrollView, StyleSheet, Dimensions } from "react-native"
import { Divider } from "@rneui/themed"
import { useDispatch, useSelector } from "react-redux"
import { selectUser, updateUser } from "../../redux/reducers/userReducer"
import SwitchItem from "./SwitchItem"
import theme from "../../theme"

const GeneralSettings = ({ params }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const userCopy = JSON.parse(JSON.stringify(user))
  const countWarmupSets = user.settings.general.countWarmupSets

  const toggleCountWarmupSets = () => {
    userCopy.settings.general.countWarmupSets = !countWarmupSets
    dispatch(updateUser(userCopy))
  }

  return (
    <ScrollView contentInset={{ bottom: 50 }}>
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <SwitchItem
          bold
          showInfo
          label="Count Warmup Sets"
          onValueChange={toggleCountWarmupSets}
          value={countWarmupSets}
          infoText={"Include warmup sets in calculations"}
        />

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

export default GeneralSettings
