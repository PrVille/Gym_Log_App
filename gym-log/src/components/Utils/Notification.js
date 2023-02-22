import { Text, TouchableOpacity, View } from "react-native"
import theme from "../../theme"
import { useDispatch } from "react-redux"
import { clearNotification } from "../../redux/reducers/notificationReducer"

const Notification = ({ notification }) => {
  const dispatch = useDispatch()

  if (notification.message === null) {
    return null
  }

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        zIndex: 10,
        marginHorizontal: 10,
        padding: 20,
        flex: 1,
        left: 0,
        right: 0,
        top: "5%",
        alignSelf: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor:
          notification.type === "alert" ? "red" : theme.colors.primary,
        backgroundColor:
          notification.type === "alert" ? "red" : theme.colors.secondaryVariant,
      }}
      onPressIn={() => dispatch(clearNotification())}
    >
      <Text
        style={{
          textAlign: "center",
          color: notification.type === "alert" ? "white" : theme.colors.primary,
          fontWeight: theme.fontWeights.bold,
        }}
      >
        {notification.message}
      </Text>
    </TouchableOpacity>
  )
}

export default Notification
