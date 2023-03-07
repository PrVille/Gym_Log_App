import { SafeAreaView, ScrollView } from "react-native"
import { Button, ListItem, Icon } from "@rneui/themed"
import { useDispatch } from "react-redux"
import { signOut } from "../../redux/reducers/userReducer"

const Settings = ({ navigation }) => {
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <ListItem onPress={() => navigation.navigate("GeneralSettings")}>
          <Icon name="cog" type="material-community" size={30} />
          <ListItem.Content>
            <ListItem.Title>General</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem onPress={() => navigation.navigate("AccountSettings")}>
          <Icon name="account" type="material-community" size={30} />
          <ListItem.Content>
            <ListItem.Title>Account</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem onPress={() => navigation.navigate("HomeSettings")}>
          <Icon name="home" type="material-community" size={30} />
          <ListItem.Content>
            <ListItem.Title>Home</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem onPress={() => navigation.navigate("StatisticsSettings")}>
          <Icon name="chart-bar" type="material-community" size={30} />
          <ListItem.Content>
            <ListItem.Title>Statistics</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <Button
          containerStyle={{ marginVertical: 30, marginHorizontal: 20 }}
          title={"Sign Out"}
          onPress={() => dispatch(signOut())}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Settings
