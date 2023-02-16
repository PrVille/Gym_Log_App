import { Icon } from "@rneui/themed"

const CloseButton = ({ onPress }) => {
  return (
    <Icon
      style={{ marginStart: 5 }}
      onPress={onPress}
      name="close"
      size={30}
    />
  )
}

export default CloseButton
