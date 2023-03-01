import React, { useState } from "react"
import { Text, View, ScrollView, FlatList } from "react-native"
import { Input, Button, ListItem, Divider } from "@rneui/themed"
import theme from "../../theme"
import Overview from "./Widgets/Overview"
import ActiveRoutine from "./Widgets/ActiveRoutine"
import FavouriteExercises from "./Widgets/FavouriteExercises"
import { WorkoutsGraph } from "../Statistics/GraphScreen"
import { useHeaderHeight } from "@react-navigation/elements"

const ItemSeparator = () => <View style={{ height: 5 }} />

const Home = ({navigation, route}) => {
    const headerHeight = useHeaderHeight()
    console.log(headerHeight)
  
    const widgets = {
      Overview: <Overview />,
      ActiveRoutine: <ActiveRoutine navigation={navigation} />,
      FavouriteExercises: <FavouriteExercises navigation={navigation} />,
    }
  
    const [selecetedWidgets, setSelectedWidgets] = useState([
      "Overview",
      "ActiveRoutine",
      "FavouriteExercises",
    ])
  
    return (
      <>
        <FlatList
          data={selecetedWidgets}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => {
            return <View>{widgets[item]}</View>
          }}
        />
      </>
    )
}

export default Home