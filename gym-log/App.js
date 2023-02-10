import "react-native-gesture-handler"
import { NavigationContainer } from "@react-navigation/native"
import Main from "./src/components/Main"
import { Provider } from "react-redux"
import store from "./src/redux/store"

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  )
}

export default App
