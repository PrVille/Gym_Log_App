import { Button, Input } from "@rneui/themed"
import { useRef, useState } from "react"
import { View, Text, ScrollView, StyleSheet, Icon } from "react-native"
import { useDispatch } from "react-redux"
import { setNotification } from "../../redux/reducers/notificationReducer"
import { signUp } from "../../redux/reducers/userReducer"
import theme from "../../theme"

const SignUp = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [usernameBlur, setUsernameBlur] = useState(false)
  const [name, setName] = useState("")
  const [nameBlur, setNameBlur] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordBlur, setPasswordBlur] = useState(false)
  const [secure, setSecure] = useState(true)

  const nameRef = useRef()
  const passwordRef = useRef()

  const validUsername = username.length >= 3
  const validName = name.length > 0
  const validPassword = password.length >= 5

  const usernameError =
    usernameBlur && !username
      ? "Username is required!"
      : usernameBlur && username.length < 3
      ? "Username must be at least 3 characters!"
      : ""
  const nameError = nameBlur && !name ? "Name is required!" : ""
  const passwordError =
    passwordBlur && !password
      ? "Password is required!"
      : passwordBlur && password.length < 5
      ? "Password must be at least 5 characters!"
      : ""

  const notify = (message, type = "info") => {
    dispatch(setNotification({ message, type }, 5))
  }

  const submit = () => {
    dispatch(signUp({ username, name, password })).catch((err) =>
      notify(err.response.data.error)
    )
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Input
          inputContainerStyle={styles.inputContainerStyle}
          onBlur={() => setUsernameBlur(true)}
          label="Username"
          maxLength={50}
          selectTextOnFocus={true}
          value={username}
          placeholder="Username"
          textContentType={"username"}
          onChangeText={(value) => setUsername(value)}
          errorStyle={{ color: "red" }}
          errorMessage={usernameError}
          onSubmitEditing={() => nameRef.current.focus()}
        />

        <Input
          inputContainerStyle={styles.inputContainerStyle}
          onBlur={() => setNameBlur(true)}
          label="Name"
          maxLength={50}
          selectTextOnFocus={true}
          value={name}
          placeholder="Name"
          textContentType={"name"}
          onChangeText={(value) => setName(value)}
          errorStyle={{ color: "red" }}
          errorMessage={nameError}
          ref={nameRef}
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
          onBlur={() => setPasswordBlur(true)}
          maxLength={50}
          selectTextOnFocus={true}
          value={password}
          placeholder="Password"
          onChangeText={(value) => setPassword(value)}
          autoCorrect={false}
          textContentType={"password"}
          secureTextEntry={secure}
          errorStyle={{ color: "red" }}
          errorMessage={passwordError}
          ref={passwordRef}
        />

        <Button
          disabled={!validUsername || !validName || !validPassword}
          disabledStyle={{ backgroundColor: theme.colors.secondary }}
          disabledTitleStyle={{ color: theme.colors.background }}
          containerStyle={{ margin: 10 }}
          title="Sign Up"
          onPress={submit}
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

export default SignUp
