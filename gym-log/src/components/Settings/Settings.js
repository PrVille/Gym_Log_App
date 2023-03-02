import React from "react"
import { Text, View } from "react-native"
import { Button } from "@rneui/themed"
import { useDispatch } from "react-redux"
import { signOut } from "../../redux/reducers/userReducer"

const Settings = () => {
    const dispatch = useDispatch()
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          ALL SETTINGS HERE ? 
          default rest timer minutes
          count warmup sets?
        </Text>
        <Text>
          Profile: name, measurements, achievements(overall) 
        </Text>
        
        <Text>Statistics: graph linetype, secondary muscle factor, count warmup sets</Text>
        <Text>Calculators: 1rm, plates, warmup</Text>
        <Button title={"Sign Out"} onPress={() => dispatch(signOut())} />
      </View>
    )
}

export default Settings