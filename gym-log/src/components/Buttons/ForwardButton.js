import { Icon } from "@rneui/themed"
import theme from "../../theme"

const ForwardButton = ({ onPress, disabled }) => {
  
  return (
    <Icon
      disabled={disabled}
      color={disabled ? theme.colors.secondary: theme.colors.primary}
      style={{ marginEnd: 5 }}
      onPress={onPress}
      name="chevron-forward"
      type="ionicon"
      size={30}
    />
  )
}

export default ForwardButton
