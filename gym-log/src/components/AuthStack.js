import { useSelector } from "react-redux"
import { createStackNavigator } from "@react-navigation/stack"
import SignUp from "./Auth/SignUp"
import SignIn from "./Auth/SignIn"
import BackButton from "./Buttons/BackButton"

const Stack = createStackNavigator()

const AuthStack = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Sign In",
            headerShadowVisible: false,
          })}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Sign Up",
            headerShadowVisible: false,
            headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
          })}
        />
      </Stack.Navigator>
    </>
  )
}

export default AuthStack
