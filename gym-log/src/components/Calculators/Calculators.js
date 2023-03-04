import React from "react"
import { Text, ScrollView, SafeAreaView } from "react-native"
import { ListItem, Icon } from "@rneui/themed"

const Calculators = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView>
        <ListItem onPress={() => navigation.navigate("OneRepMaxCalculator")}>
          <Icon name="weight-lifter" type="material-community" size={50} />
          <ListItem.Content>
            <ListItem.Title>1RM Calculator</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem onPress={() => navigation.navigate("WarmupCalculator")}>
          <Icon name="fitness" type="ionicon" size={50} />
          <ListItem.Content>
            <ListItem.Title>Warmup Calculator</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Calculators
