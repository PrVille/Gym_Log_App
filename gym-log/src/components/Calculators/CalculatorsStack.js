import { createStackNavigator } from "@react-navigation/stack"
import theme from "../../theme"
import Calculators from "./Calculators"

const Stack = createStackNavigator()

const CalculatorsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calculators"
        component={Calculators}
        options={({ navigation, route }) => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  )
}

export default CalculatorsStack
