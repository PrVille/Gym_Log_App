import React, { useState } from "react"
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { useSelector, useDispatch } from "react-redux"
import {
  selectExercisesByQuery,
  createExercise,
} from "../../redux/reducers/exerciseReducer"
import Ionicons from "react-native-vector-icons/Ionicons"
import { FAB, Searchbar, Chip } from "react-native-paper"
import theme from "../../theme"

const Stack = createStackNavigator()

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: 0,
    marginHorizontal: 5,
    flexDirection: "row",
  },
  pressable: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
  },
  subheading: {
    flex: 0,
    flexDirection: "row",
    backgroundColor: "white",
  },
  subheadingItem: {
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    color: "grey",
  },
  ellipsisContainer: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
  },
})

const ExerciseCard = ({ item, navigation }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={{ flex: 0 }}>
        <Ionicons
          style={{ backgroundColor: "white" }}
          name={"image-sharp"}
          size={100}
        />
      </View>
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate("ExerciseDetails", item._id)}
      >
        <Text style={styles.heading}>{item.name}</Text>
        <View style={styles.subheading}>
          <Text style={styles.subheadingItem}>Sets: {item.sets.length}</Text>
          <View style={{ paddingHorizontal: 5 }}>
            <Text>|</Text>
          </View>
          <Text style={styles.subheadingItem}>
            Volume:{" "}
            {item.sets.map((set) => set.weight).reduce((a, b) => a + b, 0)} kg
          </Text>
        </View>
      </Pressable>
      <View style={styles.ellipsisContainer}>
        <Ionicons
          style={{ backgroundColor: "white", flex: 0 }}
          name={"ellipsis-vertical"}
          size={30}
        />
      </View>
    </View>
  )
}

const ItemSeparator = () => <View style={{ height: 5 }} />

const ExerciseListHeader = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: 2,
        marginTop: 10,
      }}
    >
      <Chip
        style={{ margin: 3 }}
        icon="arm-flex"
        onPress={() => console.log("Pressed")}
      >
        All
      </Chip>
      <Chip
        style={{ margin: 3 }}
        icon="arm-flex"
        onPress={() => console.log("Pressed")}
      >
        Chest
      </Chip>
      <Chip
        style={{ margin: 3 }}
        icon="arm-flex"
        onPress={() => console.log("Pressed")}
      >
        Back
      </Chip>
      <Chip
        style={{ margin: 3 }}
        onPress={() => console.log("Pressed")}
      >
        Legs
      </Chip>
      <Chip
        style={{ margin: 3 }}
        onPress={() => console.log("Pressed")}
      >
        Core
      </Chip>
      
      <Chip
        style={{ margin: 3 }}
        icon="sort-alphabetical-variant"
        onPress={() => console.log("Pressed")}
      >
        Sort
      </Chip>
      
    </View>
  )
}

const ExerciseList = ({ navigation, searchQuery }) => {
  const exercises = useSelector((state) =>
    selectExercisesByQuery(state, searchQuery)
  )

  return (
    <>
      <FlatList
        ListHeaderComponent={<ExerciseListHeader />}
        data={exercises}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <ExerciseCard item={item} navigation={navigation} />
        )}
      />
      <FAB
        icon="plus"
        color="white"
        style={styles.fab}
        onPress={() => navigation.navigate("CreateExercise")}
      />
    </>
  )
}

const Exercises = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const onChangeSearch = (query) => setSearchQuery(query)

  return (
    <Stack.Navigator
      screenOptions={{
        headerStatusBarHeight: 0,
        headerStyle: {
          backgroundColor: "white",
          height: 60,
        },
        cardStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen
        name="ExerciseList"
        options={({ navigation }) => ({
          header: (props) => (
            <Searchbar
              style={{ backgroundColor: "white" }}
              elevation={1}
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
            />
          ),
        })}
      >
        {(props) => <ExerciseList searchQuery={searchQuery} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default Exercises
