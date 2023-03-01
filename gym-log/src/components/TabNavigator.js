import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import Constants from "expo-constants"

import StatisticsStack from "./Statistics/StatisticsStack"
import SettingsStack from "./Settings/SettingsStack"
import DirectoryNavigator from "./Directory/DirectoryNavigator"
import HomeStack from "./Home/HomeStack"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useTheme } from "@react-navigation/native"
import CloseButton from "./Buttons/CloseButton"

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
})

const Tab = createBottomTabNavigator()

const MockComponent = () => <View style={{ backgroundColor: "red" }}></View>

const TabNavigator = () => {
  const { colors } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "HomeStack") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "StatisticsStack") {
            iconName = focused ? "bar-chart" : "bar-chart-outline"
          } else if (route.name === "LoggerOptions") {
            iconName = "add-circle-outline"
          } else if (route.name === "DirectoryNavigator") {
            iconName = focused ? "list-circle" : "list-circle-outline"
          } else if (route.name === "SettingsStack") {
            iconName = focused ? "settings" : "settings-outline"
          }

          return (
            <Ionicons
              name={iconName}
              size={focused ? size : size}
              color={color}
            />
          )
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        headerShown: false,
        tabBarStyle: { borderTopWidth: 0 },
      })}
      sceneContainerStyle={styles.container}
      initialRouteName={"HomeStack"}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="StatisticsStack" component={StatisticsStack} />
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
      <Tab.Screen name="DirectoryNavigator" component={DirectoryNavigator} />
      <Tab.Screen name="SettingsStack" component={SettingsStack} />
    </Tab.Navigator>
  )
}

export default TabNavigator
