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
  const [statsIsExpanded, setStatsIsExpanded] = useState(false)
  const [generalIsExpanded, setGeneralIsExpanded] = useState(false)
  const [accountIsExpanded, setAccountIsExpanded] = useState(false)
  const [calculatorsIsExpanded, setCalculatorsIsExpanded] = useState(false)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <SettingsSection
          iconName="cog"
          iconType="material-community"
          title="General"
          isExpanded={generalIsExpanded}
          setExpanded={setGeneralIsExpanded}
        >
          <Text>default rest timer minutes, timer add/sub increment, disable timer vibrate/sound/notification, count warmup sets, round to nearest</Text>
        </SettingsSection>

        <SettingsSection
          iconName="account"
          iconType="material-community"
          title="Account"
          isExpanded={accountIsExpanded}
          setExpanded={setAccountIsExpanded}
        >
          <Text>name, measurements, achievements(overall), signout, delete account && data</Text>
        </SettingsSection>

        <SettingsSection
          iconName="home"
          iconType="material-community"
          title="Home"
          isExpanded={homeIsExpanded}
          setExpanded={setHomeIsExpanded}
        >
          <HomeSettings />
        </SettingsSection>

        <SettingsSection
          iconName="chart-bar"
          iconType="material-community"
          title="Statistics"
          isExpanded={statsIsExpanded}
          setExpanded={setStatsIsExpanded}
        >
          <Text>
            graph linetype, secondary muscle factor, count warmup sets
          </Text>
        </SettingsSection>

        <SettingsSection
          iconName="calculator"
          iconType="material-community"
          title="Calculators"
          isExpanded={calculatorsIsExpanded}
          setExpanded={setCalculatorsIsExpanded}
        >
          <Text>1rm, plates, warmup</Text>
        </SettingsSection>

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
