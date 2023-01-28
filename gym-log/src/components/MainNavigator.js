import { StyleSheet, Text, View } from "react-native"

import { createStackNavigator } from "@react-navigation/stack"
import TabNavigator from "./TabNavigator"
import LoggerOptions from "./Logger/LoggerOptions"
import Logger from "./Logger/Logger"

const Stack = createStackNavigator()

const MainNavigator = () => {
  return (
    <Stack.Navigator>
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
      <Stack.Screen name="Logger" component={Logger} />
    </Stack.Navigator>
  )
}

export default MainNavigator
