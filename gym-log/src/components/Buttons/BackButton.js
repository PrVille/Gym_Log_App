import { Icon } from "@rneui/themed"

const BackButton = ({ onPress }) => {
  return (
    <Icon
      style={{ marginStart: 5 }}
      onPress={onPress}
      name="chevron-back"
      type="ionicon"
      size={30}
    />
  )
}

export default BackButton
