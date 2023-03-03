import React, { useState } from "react"
import { Text, View, ScrollView, FlatList } from "react-native"
import { Input, Button, ListItem, Divider } from "@rneui/themed"
import theme from "../../theme"
import Overview from "./Widgets/Overview"
import ActiveRoutine from "./Widgets/ActiveRoutine"
import FavouriteExercises from "./Widgets/FavouriteExercises"
import { WorkoutsGraph } from "../Statistics/GraphScreen"
import { useHeaderHeight } from "@react-navigation/elements"
import { useSelector } from "react-redux"
import { selectUser } from "../../redux/reducers/userReducer"
import FavouriteGraphs from "./Widgets/FavouriteGraphs"
import { Achievement } from "./Account"
import FavouriteAchievements from "./Widgets/FavouriteAchievements"

const Home = ({ navigation, route }) => {
  const user = useSelector(selectUser)
  const settings = user.settings.home

  return (
    <ScrollView>
      
      {settings.overview.active && <Overview />}
      {settings.followedRoutine.active && (
        <ActiveRoutine navigation={navigation} />
      )}
      
      {settings.favouriteExercises.active && (
        <FavouriteExercises navigation={navigation} />
      )}
      
      {settings.favouriteGraphs.active && (
        <FavouriteGraphs navigation={navigation} />
      )}

      {settings.favouriteAchievements.active && (
        <FavouriteAchievements navigation={navigation} />
      )}
      
    </ScrollView>
  )
}

export default Home
