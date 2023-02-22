import { StatusBar } from "expo-status-bar"
import MainStack from "./MainStack"
import { View, Text } from "react-native"
import Notification from "./Utils/Notification"
import { useSelector } from "react-redux"
import { selectNotification } from "../redux/reducers/notificationReducer"

const Main = () => {
  const notification = useSelector(selectNotification)

  return (
    <>
      <StatusBar />
      <MainStack />
      <Notification notification={notification} />
    </>
  )
}

export default Main
