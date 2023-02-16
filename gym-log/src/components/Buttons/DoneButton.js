import { Icon } from "@rneui/themed"

const DoneButton = ({ onPress }) => {
  return (
    <Icon
      style={{ marginEnd: 5 }}
      onPress={onPress}
      name="checkmark-sharp"
      type="ionicon"
      size={30}
    />
  )
}

export default DoneButton
