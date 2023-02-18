import "react-native-gesture-handler"
import { NavigationContainer } from "@react-navigation/native"
import Main from "./src/components/Main"
import { Provider } from "react-redux"
import store from "./src/redux/store"
import { ThemeProvider } from "@rneui/themed"
import { defaultRNETheme, defaultNavigationTheme } from "./src/theme"

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultRNETheme}>
        <NavigationContainer theme={defaultNavigationTheme}>
          <Main />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  )
}

export default App
