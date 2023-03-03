import React, { useState } from "react"
import { SafeAreaView, ScrollView, Text, View } from "react-native"
import { Button, ListItem, Icon } from "@rneui/themed"
import { useDispatch } from "react-redux"
import { signOut } from "../../redux/reducers/userReducer"
import HomeSettings from "./HomeSettings"
import theme from "../../theme"

const SettingsSection = ({
  children,
  iconName,
  iconType,
  title,
  isExpanded,
  setExpanded,
}) => (
  <ListItem.Accordion
    containerStyle={{ paddingHorizontal: 10 }}
    icon={
      <Icon
        name={"chevron-down"}
        type="material-community"
        style={{ color: theme.colors.primary }}
      />
    }
    content={
      <>
        <Icon
          name={iconName}
          type={iconType}
          size={30}
          containerStyle={{ marginEnd: 10 }}
        />
        <ListItem.Content>
          <ListItem.Title>{title}</ListItem.Title>
        </ListItem.Content>
      </>
    }
    isExpanded={isExpanded}
    onPress={() => {
      setExpanded(!isExpanded)
    }}
  >
    {children}
  </ListItem.Accordion>
)

const Settings = () => {
  const dispatch = useDispatch()
  const [homeIsExpanded, setHomeIsExpanded] = useState(false)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <SettingsSection
          iconName="home-edit"
          iconType="material-community"
          title="Home"
          isExpanded={homeIsExpanded}
          setExpanded={setHomeIsExpanded}
        >
          <HomeSettings />
        </SettingsSection>

        <Button
          containerStyle={{ marginVertical: 30 }}
          title={"Sign Out"}
          onPress={() => dispatch(signOut())}
        />
      </ScrollView>
      {/* <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>
            ALL SETTINGS HERE ? default rest timer minutes count warmup sets?
          </Text>
          <Text>Profile: name, measurements, achievements(overall)</Text>

          <Text>
            Statistics: graph linetype, secondary muscle factor, count warmup
            sets
          </Text>
          <Text>Calculators: 1rm, plates, warmup</Text>
        </View> */}
    </SafeAreaView>
  )
}

export default Settings
