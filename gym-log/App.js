import "react-native-gesture-handler"
import { useColorScheme } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import Main from "./src/components/Main"
import { Provider } from "react-redux"
import store from "./src/redux/store"
import { ThemeProvider } from "@rneui/themed"
import { defaultRNETheme, darkNavigationTheme, defaultNavigationTheme } from "./src/theme"

const App = () => {
  const scheme = useColorScheme()

  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultRNETheme}>
        <NavigationContainer
          theme={
            scheme === "dark" ? darkNavigationTheme : defaultNavigationTheme
          }
        >
          <Main />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  )
}

export default App
