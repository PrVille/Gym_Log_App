import { createStackNavigator } from "@react-navigation/stack"
import HomeSettings from "./HomeSettings"
import Settings from "./Settings"
import BackButton from "../Buttons/BackButton"
import GeneralSettings from "./GeneralSettings"
import AccountSettings from "./AccountSettings"
import StatisticsSettings from "./StatisticsSettings"

const Stack = createStackNavigator()

const SettingsStack = ({ params, navigation }) => {
  return (
    <>
      <Stack.Navigator initialRouteName="Settings">
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: true,
            headerStatusBarHeight: 0,
            headerShadowVisible: false,
            headerLeft: () => null,
          }}
        />

        <Stack.Screen
          name="GeneralSettings"
          component={GeneralSettings}
          options={{
            headerShown: true,
            headerStatusBarHeight: 0,
            headerShadowVisible: false,
            headerTitle: "General Settings",
            headerLeft: () => (
              <BackButton onPress={() => navigation.navigate("Settings")} />
            ),
          }}
        />

        <Stack.Screen
          name="AccountSettings"
          component={AccountSettings}
          options={{
            headerShown: true,
            headerStatusBarHeight: 0,
            headerShadowVisible: false,
            headerTitle: "Account Settings",
            headerLeft: () => (
              <BackButton onPress={() => navigation.navigate("Settings")} />
            ),
          }}
        />

        <Stack.Screen
          name="HomeSettings"
          component={HomeSettings}
          options={{
            headerShown: true,
            headerStatusBarHeight: 0,
            headerShadowVisible: false,
            headerTitle: "Home Settings",
            headerLeft: () => (
              <BackButton onPress={() => navigation.navigate("Settings")} />
            ),
          }}
        />

        <Stack.Screen
          name="StatisticsSettings"
          component={StatisticsSettings}
          options={{
            headerShown: true,
            headerStatusBarHeight: 0,
            headerShadowVisible: false,
            headerTitle: "Statistics Settings",
            headerLeft: () => (
              <BackButton onPress={() => navigation.navigate("Settings")} />
            ),
          }}
        />
      </Stack.Navigator>
    </>
  )
}

export default SettingsStack
