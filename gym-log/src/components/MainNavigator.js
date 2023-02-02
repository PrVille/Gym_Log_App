import { StyleSheet, Text, View, Button } from "react-native"

import { createStackNavigator } from "@react-navigation/stack"
import TabNavigator from "./TabNavigator"
import LoggerOptions from "./Logger/LoggerOptions"
import LoggerStack from "./Logger/Logger"
import Stopwatch from "./Utils/Stopwatch"

const Stack = createStackNavigator()

const MainNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoggerOptionsModal"
        component={LoggerOptions}
        options={{
          presentation: "transparentModal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoggerStack"
        component={LoggerStack}
        options={{
          presentation: "transparentModal",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default MainNavigator
