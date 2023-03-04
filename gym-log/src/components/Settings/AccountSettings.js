import React from "react"
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native"
import { Divider, Button } from "@rneui/themed"
import { useDispatch, useSelector } from "react-redux"
import {
  selectUser,
  updateUser,
  signOut,
  deleteUser,
} from "../../redux/reducers/userReducer"
import { setNotification } from "../../redux/reducers/notificationReducer"
import SwitchItem from "./SwitchItem"
import theme from "../../theme"

const AccountSettings = ({ params }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const userCopy = JSON.parse(JSON.stringify(user))

  const confirmDeletion = () => {
    Alert.alert(
      `Delete account?`,
      "This will delete your account and all related data!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Delete", onPress: () => removeUser() },
      ]
    )
  }

  const notify = (message, type = "info") => {
    dispatch(setNotification({ message, type }, 5))
  }

  const removeUser = () => {
    console.log("deleting account and all related data")
    dispatch(deleteUser(user._id))
    notify("Account deleted!")
  }

  return (
    <ScrollView contentInset={{ bottom: 50 }}>
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <Button
          containerStyle={{ marginVertical: 30 }}
          title="Sign Out"
          onPress={() => dispatch(signOut())}
        />
        <Button
          containerStyle={{ marginVertical: 30 }}
          buttonStyle={{
            backgroundColor: "red",
            borderColor: "red",
          }}
          title="Delete Account"
          onPress={confirmDeletion}
        />
      </View>
    </ScrollView>
  )
}

export default AccountSettings
