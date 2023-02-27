import { createRef, useState } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Statistics from "./Statistics"
import Header from "../Utils/Header"

const Stack = createStackNavigator()

const StatisticsStack = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const onChangeSearch = (query) => setSearchQuery(query)
  let searchRef = createRef()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Statistics"
        options={{
          header: (props) => (
            <Header
              onChangeSearch={onChangeSearch}
              searchQuery={searchQuery}
              searchRef={searchRef}
              showSort={false}
            />
          ),
        }}
      >
        {(props) => <Statistics searchQuery={searchQuery} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default StatisticsStack
