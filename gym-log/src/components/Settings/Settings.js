import React from "react"
import { Text, View } from "react-native"
import { Button } from "@rneui/themed"
import { useDispatch } from "react-redux"
import { signOut } from "../../redux/reducers/userReducer"

const Settings = ({ params }) => {
  const dispatch = useDispatch()
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings</Text>
      <Text>Home: Widget settings, graph period and grouping, fav exercise stats to show</Text>
      <Text>Statistics: graph linetype, secondary muscle factor</Text>

      <Button
        title={"Sign Out"}
        onPress={() => dispatch(signOut())}
      />
    </View>
  )
}

export default Settings
