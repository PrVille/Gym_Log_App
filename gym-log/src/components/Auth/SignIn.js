import { signIn } from "../../redux/reducers/userReducer"
import { Button, Input } from "@rneui/themed"
import { useRef, useState } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import { useDispatch } from "react-redux"
import { setNotification } from "../../redux/reducers/notificationReducer"
import theme from "../../theme"

const SignIn = ({ navigation }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [secure, setSecure] = useState(true)

  const passwordRef = useRef()

  const notify = (message, type = "info") => {
    dispatch(setNotification({ message, type }, 5))
  }
  
  const submit = () => {
    dispatch(signIn(username, password)).catch((err) =>
      notify(err.response.data.error)
    )
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Input
          inputContainerStyle={styles.inputContainerStyle}
          label="Username"
          maxLength={50}
          selectTextOnFocus={true}
          value={username}
          placeholder="Username"
          textContentType={"username"}
          onChangeText={(value) => setUsername(value)}
          onSubmitEditing={() => passwordRef.current.focus()}
        />

        <Input
          inputContainerStyle={styles.inputContainerStyle}
          rightIcon={{
            name: secure ? "eye" : "eye-off",
            type: "material-community",
            color: theme.colors.primary,
            onPress: () => setSecure(!secure),
          }}
          label="Password"
          maxLength={50}
          selectTextOnFocus={true}
          value={password}
          placeholder="Password"
          onChangeText={(value) => setPassword(value)}
          autoCorrect={false}
          textContentType={"password"}
          secureTextEntry={secure}
          ref={passwordRef}
        />

        <Button
          disabled={!username || !password}
          disabledStyle={{ backgroundColor: theme.colors.secondary }}
          disabledTitleStyle={{ color: theme.colors.background }}
          containerStyle={{ margin: 10 }}
          title="Sign In"
          onPress={submit}
        />

        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: theme.fontSizes.subheading,
              fontWeight: theme.fontWeights.bold,
            }}
          >
            Or
          </Text>
        </View>

        <Button
          containerStyle={{ margin: 10 }}
          title="Create Account"
          onPress={() => navigation.navigate("SignUp")}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
})
export default SignIn
