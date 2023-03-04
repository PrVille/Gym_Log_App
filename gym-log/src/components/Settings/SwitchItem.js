import { Text, View, Switch } from "react-native"
import theme from "../../theme"

const SwitchItem = ({ onValueChange, value, label, bold, showInfo, infoText }) => (
  <View>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: theme.fontSizes.subheading,
          color: theme.colors.primary,
          fontWeight: bold ? theme.fontWeights.bold : theme.fontWeights.normal,
        }}
      >
        {label}
      </Text>
      <Switch
        trackColor={{
          false: theme.colors.primaryVariant,
          true: theme.colors.primary,
        }}
        thumbColor={theme.colors.background}
        ios_backgroundColor={theme.colors.primaryVariant}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
    {showInfo && <View style={{
        marginTop: 5,
        marginBottom: 10
      }}>
      <Text
        style={{
          fontSize: theme.fontSizes.body,
          color: theme.colors.primary,
          fontWeight: theme.fontWeights.normal,
        }}
      >
        {infoText}
      </Text>
    </View>}
  </View>
)

export default SwitchItem
