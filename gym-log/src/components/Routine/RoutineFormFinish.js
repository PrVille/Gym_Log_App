import { Input, Divider } from "@rneui/themed"
import { View } from "react-native"

const RoutineFormFinish = ({ setRoutine, routine }) => {
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <Input
        label={"Name"}
        value={routine.name}
        placeholder={`Name`}
        onChangeText={(value) => setRoutine({ ...routine, name: value })}
      />

      <Input
        label={"Notes"}
        value={routine.notes}
        placeholder={`Notes`}
        onChangeText={(value) => setRoutine({ ...routine, notes: value })}
      />

      <Divider style={{ marginVertical: 20 }} />
    </View>
  )
}

export default RoutineFormFinish
