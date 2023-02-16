import { Icon } from "@rneui/themed"

const ForwardButton = ({ onPress }) => {
  return (
    <Icon
      style={{ marginEnd: 5 }}
      onPress={onPress}
      name="chevron-forward"
      type="ionicon"
      size={30}
    />
  )
}

export default ForwardButton