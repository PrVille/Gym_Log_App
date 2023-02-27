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
      <Button
        title={"Sign Out"}
        onPress={() => dispatch(signOut())}
      />
    </View>
  )
}

export default Settings
