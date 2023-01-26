import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StyleSheet } from "react-native"
import Constants from "expo-constants"

import Statistics from "./Statistics/Statistics"
import Settings from "./Settings/Settings"
import ProgramsNavigator from "./Programs/ProgramsNavigator"
import Overview from "./Overview/Overview"
import Logger from "./Logger/Logger"

import theme from "../theme"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight,
  },
})

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      sceneContainerStyle={styles.container}
      initialRouteName={"ProgramsNavigator"}
    >
      <Tab.Screen name="Overview" component={Overview} />
      <Tab.Screen name="Statistics" component={Statistics} />
      <Tab.Screen name="Logger" component={Logger} />
      <Tab.Screen name="ProgramsNavigator" component={ProgramsNavigator} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  )
}

export default TabNavigator
