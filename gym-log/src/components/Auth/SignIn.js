import { Button } from "@rneui/themed"
import { View, Text } from "react-native"
import { useDispatch } from "react-redux"
import { setNotification } from "../../redux/reducers/notificationReducer"
import { signIn } from "../../redux/reducers/userReducer"

const SignIn = () => {
  const dispatch = useDispatch()

  const notify = (message, type = "info") => {
    dispatch(setNotification({ message, type }, 5))
  }

  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text>Sign In</Text>
      <Button
        title={"Sign in - Admin"}
        onPress={() => dispatch(signIn("Admin", "password"))}
      />
      <Button
        title={"Sign in - User"}
        onPress={() => dispatch(signIn("User9", "password")).catch(err => notify(err.response.data.error))}
      />
    </View>
  )
}

export default SignIn
