import { useEffect, useState, useMemo } from "react"
import { StatusBar } from "expo-status-bar"
import MainStack from "./MainStack"
import AuthStack from "./AuthStack"
import Notification from "./Utils/Notification"
import { useSelector, useDispatch } from "react-redux"
import { selectNotification } from "../redux/reducers/notificationReducer"
import {
  initUser,
  selectUser,
} from "../redux/reducers/userReducer"

const Main = () => {
  const dispatch = useDispatch()
  const notification = useSelector(selectNotification)
  const user = useSelector(selectUser)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(initUser()).then(() => setLoading(false))
  }, [dispatch])
  
  if (!loading && !user) {
    return (
      <>
        <StatusBar />
        <AuthStack />
        <Notification notification={notification} />
      </>
    )
  }

  return (
    <>
      <StatusBar />
      <MainStack />
      <Notification notification={notification} />
    </>
  )
}

export default Main
