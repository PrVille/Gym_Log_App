import { Children } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Divider, Icon } from "@rneui/themed"
import theme from "../../theme"

const Section = ({ children }) => {
  const subComponentList = Object.keys(Section)

  const subComponents = subComponentList.map((key) => {
    return Children.map(children, (child) =>
      child.type.name === key ? child : null
    )
  })

  return (
    <>
      <View style={{ marginStart: 20, marginVertical: 10 }}>
        {subComponents.map((component) => component)}
      </View>
    </>
  )
}

const Title = (props) => {
  return (
    <View
      style={{
        marginBottom: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        marginEnd: 20,
      }}
    >
      <Text
        style={{
          fontSize: theme.fontSizes.heading,
          flex: 1,
          color: theme.colors.primary,
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
            color: theme.colors.primary,
          }}
        >
          {props.buttonTitle}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const SubSection = (props) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginTop: props.divider ? 0 : 10,
          marginEnd: 20,
        }}
      >
        {props.children}
      </View>
      {props.divider && (
        <Divider style={{ marginVertical: 10, marginEnd: 20 }} />
      )}
    </View>
  )
}

const SubSectionTitle = (props) => {
  return (
    <Text
      style={{
        fontSize: theme.fontSizes.body,
        color: theme.colors.primary,
        fontWeight: theme.fontWeights.bold,
      }}
    >
      {props.children}
    </Text>
  )
}

const SubSectionItem = (props) => {
  return <View style={{ flex: 1 }}>{props.children}</View>
}

const SubSectionItemTitle = (props) => {
  return (
    <Text
      style={{
        fontSize: theme.fontSizes.body,
        color: theme.colors.primary,
        fontWeight: theme.fontWeights.bold,
      }}
    >
      {props.children}
    </Text>
  )
}

const SubSectionItemBody = (props) => {
  return (
    <Text
      style={{ fontSize: theme.fontSizes.heading, color: theme.colors.primary }}
    >
      {props.children}
    </Text>
  )
}
Section.Title = Title
Section.SubSection = SubSection
Section.SubSectionItem = SubSectionItem
Section.SubSectionTitle = SubSectionTitle
Section.SubSectionItemTitle = SubSectionItemTitle
Section.SubSectionItemBody = SubSectionItemBody

export default Section
