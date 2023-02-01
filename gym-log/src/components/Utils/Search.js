import { View, TextInput } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"

const Search = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        marginStart: 10,
        marginVertical: 10,
        borderRadius: 5,
        borderWidth: 2,
        overflow: "hidden",
        borderColor: "grey",
      }}
    >
      <Ionicons style={{ marginStart: 5 }} name="search-outline" size={20} />
      <TextInput
        style={{
          marginStart: 5,
          flex: 1,
        }}
        placeholder="Search"
      />
    </View>
  )
}

export default Search
