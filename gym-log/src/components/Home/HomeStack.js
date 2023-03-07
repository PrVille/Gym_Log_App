import { createStackNavigator } from "@react-navigation/stack"
import { Icon } from "@rneui/themed"
import Home from "./Home"
import CloseButton from "../Buttons/CloseButton"
import Account from "./Account"
import theme from "../../theme"

const Stack = createStackNavigator()

const HomeStack = ({ params, navigation }) => {
  return (
    <>
      <Stack.Navigator initialRouteName="">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
            headerStatusBarHeight: 0,
            headerShadowVisible: false,
            headerTitle: "Home",
            headerLeft: (props) => (
              <Icon
                style={{ marginStart: 10 }}
                onPress={() => navigation.navigate("Account")}
                name="account"
                type="material-community"
                size={30}
              />
            ),
            headerRight: (props) => (
              <Icon
                style={{ marginEnd: 10 }}
                onPress={() => navigation.navigate("CalculatorsStack")}
                name="calculator"
                type="material-community"
                size={30}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{
            headerShown: true,
            headerStatusBarHeight: 0,
            headerShadowVisible: false,
            headerTitle: "Account",
            presentation: "transparentModal",
            cardStyle: {
              flex: 1,
              backgroundColor: theme.colors.background,
            },
            headerLeft: (props) => (
              <CloseButton onPress={() => navigation.goBack()} />
            ),
          }}
        />
      </Stack.Navigator>
    </>
  )
}

export default HomeStack
