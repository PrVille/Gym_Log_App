import { ButtonGroup } from "@rneui/themed"
import { StyleSheet, View, Text, Dimensions } from "react-native"
import theme from "../../theme"

const GraphOptions = ({
  selectedInterval,
  setSelectedInterval,
  selectedGrouping,
  setSelectedGrouping,
  bold = true,
}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text
            style={{
              fontSize: theme.fontSizes.subheading,
              color: theme.colors.primary,
              fontWeight: bold ? theme.fontWeights.bold : theme.fontWeights.normal,
            }}
          >
            Period
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <ButtonGroup
            buttons={["Month", "3 Months", "6 Months"]}
            selectedIndex={selectedInterval}
            onPress={(value) => {
              setSelectedInterval({
                index: value,
                months: value === 0 ? 1 : value === 1 ? 3 : 6,
              })
            }}
          />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text
            style={{
              fontSize: theme.fontSizes.subheading,
              color: theme.colors.primary,
              fontWeight: bold ? theme.fontWeights.bold : theme.fontWeights.normal,
            }}
          >
            Group By
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <ButtonGroup
            buttons={["Week", "Month"]}
            selectedIndex={selectedGrouping}
            onPress={(value) => {
              setSelectedGrouping({
                index: value,
                grouped: value === 0 ? "weekly" : "monthly",
              })
            }}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    width: Dimensions.get("window").width / 4,
    marginStart: 10,
    justifyContent: "center",
  },
})

export default GraphOptions
