import { Children } from "react"
import { View, Text, TouchableOpacity, TextInput } from "react-native"
import { Divider, Icon, Input, Button, ListItem } from "@rneui/themed"
import theme from "../../theme"
import { Swipeable } from "react-native-gesture-handler"

const ExerciseCard = ({ children }) => {
  const subComponentList = Object.keys(ExerciseCard)

  const subComponents = subComponentList.map((key) => {
    return Children.map(children, (child) =>
      child.type.name === key ? child : null
    )
  })

  return (
    <>
      <View
        style={{
          margin: 10,
          backgroundColor: theme.colors.chineseViolet,
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        {subComponents.map((component) => component)}
      </View>
    </>
  )
}

const Header = (props) => {
  return (
    <View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontSize: theme.fontSizes.heading,
            flex: 1,
            color: theme.colors.paleDogwood,
            fontWeight: theme.fontWeights.bold,
          }}
        >
          {props.children}
        </Text>
        <TouchableOpacity
          style={{
            minWidth: "20%",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
          onPress={props.onButtonPress}
        >
          <Text
            style={{
              fontSize: theme.fontSizes.subheading,
              color: theme.colors.paleDogwood,
            }}
          >
            {props.buttonTitle}
          </Text>
        </TouchableOpacity>
      </View>
      {props.divider && <Divider style={{ marginVertical: 5 }} />}
    </View>
  )
}

const Body = (props) => {
  return (
    <View>
      {props.children}
      {props.divider && <Divider style={{ marginVertical: 5 }} />}
    </View>
  )
}

const BodyHeader = (props) => {
  return (
    <View>
      {props.children}
      {props.divider && <Divider style={{ marginVertical: 5 }} />}
    </View>
  )
}

const HeaderRow = (props) => {
  return (
    <View>
      <View style={{ flexDirection: "row" }}>{props.children}</View>
      {props.divider && <Divider style={{ marginVertical: 5 }} />}
    </View>
  )
}

const HeaderColumn = (props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: theme.fontSizes.body,
          color: theme.colors.paleDogwood,
          fontWeight: theme.fontWeights.bold,
        }}
      >
        {props.children}
      </Text>
    </View>
  )
}

const Row = (props) => {
  return (
    <ListItem.Swipeable
      containerStyle={{
        backgroundColor: theme.colors.chineseViolet,
        flex: 1,
        maxHeight: 50,
      }}
      rightWidth={100}
      rightContent={(reset) => (
        <Button
          titleStyle={{ color: "white" }}
          onPress={() => {
            props.onDeletePress()
            reset()
          }}
          icon={{ name: "delete", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
        />
      )}
    >
      <View
        style={{
          flexDirection: "row",
          minHeight: 50,
          justifyContent: "space-between",
        }}
      >
        {props.children}
      </View>
    </ListItem.Swipeable>
  )
}

const Column = (props) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: props.alignItems ? props.alignItems : "center",
        flex: 1,
      }}
    >
      <Text
        style={{
          color: theme.colors.paleDogwood,
          fontSize: theme.fontSizes.subheading,
        }}
      >
        {props.children}
      </Text>
    </View>
  )
}

const IconColumn = (props) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: props.alignItems ? props.alignItems : "center",
        flex: 1,
      }}
    >
      <Icon
        containerStyle={{ justifyContent: "center", alignItems: "flex-start" }}
        name={props.name}
        type={props.type}
        color={theme.colors.paleDogwood}
      />
    </View>
  )
}

const InputColumn = (props) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: props.alignItems ? props.alignItems : "center",
        flex: 1,
      }}
    >
      <TextInput
        style={{
          width: "100%",
          flex: 1,
          textAlign: "center",
          fontSize: theme.fontSizes.heading,
          fontWeight: theme.fontWeights.bold,
          color: theme.colors.paleDogwood,
        }}
        keyboardType={props.keyboardType ? props.keyboardType : "number-pad"}
        selectTextOnFocus={true}
        placeholder={props.placeholder}
        value={props.value.replace(',', '.')}
        maxLength={6}
        placeholderTextColor={theme.colors.thistle}
        onChangeText={props.onChangeText}
      />
    </View>
  )
}

const Footer = (props) => {
  return <View>{props.children}</View>
}

ExerciseCard.Header = Header
ExerciseCard.Body = Body
ExerciseCard.BodyHeader = BodyHeader
ExerciseCard.HeaderRow = HeaderRow
ExerciseCard.HeaderColumn = HeaderColumn
ExerciseCard.Row = Row
ExerciseCard.Column = Column
ExerciseCard.IconColumn = IconColumn
ExerciseCard.InputColumn = InputColumn
ExerciseCard.Footer = Footer

export default ExerciseCard
