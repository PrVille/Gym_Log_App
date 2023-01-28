import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import Constants from "expo-constants"

import Statistics from "./Statistics/Statistics"
import Settings from "./Settings/Settings"
import ProgramsNavigator from "./Programs/ProgramsNavigator"
import Overview from "./Overview/Overview"
import Ionicons from "react-native-vector-icons/Ionicons"

import theme from "../theme"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight,
  },
})

const Tab = createBottomTabNavigator()

const MockComponent = () => <View style={{ backgroundColor: "red" }}></View>

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {          
          let iconName

          if (route.name === "Overview") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Statistics") {
            iconName = focused ? "bar-chart" : "bar-chart-outline"
          } else if (route.name === "LoggerOptions") {
            iconName = "add-circle-outline"
          } else if (route.name === "ProgramsNavigator") {
            iconName = focused ? "list-circle" : "list-circle-outline"
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline"
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
        headerShown: false,
      })}
      sceneContainerStyle={styles.container}
      initialRouteName={"ProgramsNavigator"}
    >
      <Tab.Screen name="Overview" component={Overview} />
      <Tab.Screen name="Statistics" component={Statistics} />
      <Tab.Screen
        name="LoggerOptions"
        component={MockComponent}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault()
            navigation.navigate("LoggerOptionsModal")
          },
        })}
      />
      <Tab.Screen name="ProgramsNavigator" component={ProgramsNavigator} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  )
}

export default TabNavigator
