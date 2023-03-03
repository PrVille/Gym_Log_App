import { createStackNavigator } from "@react-navigation/stack"
import Settings from "./Settings"

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
      </Stack.Navigator>
    </>
  )
}

export default SettingsStack
