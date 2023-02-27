import { View } from "react-native"
import { SearchBar, Icon, Chip } from "@rneui/themed"
import { useTheme } from "@react-navigation/native"

const Header = ({
  onChangeSearch,
  searchQuery,
  searchRef,
  order,
  toggleOrder,
  showSort = true,
}) => {
  const { colors } = useTheme()

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colors.background,
      }}
    >
      <SearchBar
        containerStyle={{ flex: 1 }}
        onChangeText={onChangeSearch}
        value={searchQuery}
        searchIcon={<Icon name="search" />}
        ref={(search) => (searchRef = search)}
        clearIcon={<Icon name="clear" onPress={() => searchRef.clear()} />}
      />
      {showSort && (
        <Chip
          icon={{
            name: order === "asc" ? "sort-asc" : "sort-desc",
            type: "octicon",
            size: 20,
            color: colors.primary,
          }}
          onPress={toggleOrder}
          type="outline"
          containerStyle={{ alignSelf: "center", marginEnd: 5 }}
        />
      )}
    </View>
  )
}

export default Header
