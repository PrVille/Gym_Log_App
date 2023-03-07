import { View, Text, TouchableOpacity } from "react-native"
import { Divider, Icon } from "@rneui/themed"
import theme from "../../theme"

const Section = ({ children }) => {
  return (
    <>
      <View style={{ marginStart: 20, marginVertical: 10 }}>
        {children}
      </View>
    </>
  )
}

const Title = (props) => {
  const size = props.lg ? theme.fontSizes.heading + 10 : props.md ? theme.fontSizes.heading : props.sm ? theme.fontSizes.subheading : theme.fontSizes.heading
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
          fontSize: size,
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

const Subtitle = (props) => {
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
          fontSize: theme.fontSizes.subheading,
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
Section.Subtitle = Subtitle
Section.SubSection = SubSection
Section.SubSectionItem = SubSectionItem
Section.SubSectionTitle = SubSectionTitle
Section.SubSectionItemTitle = SubSectionItemTitle
Section.SubSectionItemBody = SubSectionItemBody

export default Section
