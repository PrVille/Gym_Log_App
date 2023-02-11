import React, { createRef, useState } from "react"
import { View, FlatList, Keyboard, TouchableWithoutFeedback } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { useSelector } from "react-redux"
import { selectExercisesByQuery } from "../../redux/reducers/exerciseReducer"
import { ListItem, Icon, Button, SearchBar, FAB, Chip } from "@rneui/themed"
import theme from "../../theme"

const Stack = createStackNavigator()

const ExerciseListItem = ({ exercise, navigation }) => {
  
  return (
    <ListItem.Swipeable
      onPress={() => navigation.navigate("ExerciseDetails", exercise._id)}
      leftContent={(reset) => (
        <Button
          title="Edit"
          titleStyle={{ color: "white" }}
          onPress={() => reset()}
          icon={{ name: "edit", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "blue" }}
        />
      )}
      rightContent={(reset) => (
        <Button
          title="Delete"
          titleStyle={{ color: "white" }}
          onPress={() => reset()}
          icon={{ name: "delete", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
        />
      )}
    >
      <Icon name="image" size={50} />
      <ListItem.Content>
        <ListItem.Title>{exercise.name}</ListItem.Title>
        <ListItem.Subtitle>
          Sets: {exercise.sets.length} | Volume:{" "}
          {exercise.sets.map((set) => set.weight).reduce((a, b) => a + b, 0)} kg
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  )
}

const ItemSeparator = () => <View style={{ height: 5 }} />

const ExerciseList = ({ navigation, searchQuery }) => {
  const exercises = useSelector((state) =>
    selectExercisesByQuery(state, searchQuery)
  )

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
      <FlatList
        data={exercises}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <ExerciseListItem exercise={item} navigation={navigation} />
        )}
      />
      <FAB
        icon={{ name: "add", color: theme.colors.paleDogwood }}
        onPress={() => navigation.navigate("CreateExercise")}
      />
      </>
    </TouchableWithoutFeedback>
  )
}

const Exercises = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const onChangeSearch = (query) => setSearchQuery(query)
  let searchRef = createRef()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExerciseList"
        options={({ navigation }) => ({
          header: (props) => (
            <>
              <SearchBar
                onChangeText={onChangeSearch}
                value={searchQuery}
                searchIcon={<Icon name="search" />}
                ref={(search) => (searchRef = search)}
                clearIcon={
                  <Icon name="clear" onPress={() => searchRef.clear()} />
                }
              />
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 5,
                  marginBottom: 5,
                }}
              >
                <Chip
                  title="Sort"
                  icon={{
                    name: "sort-alpha-asc",
                    type: "font-awesome",
                    size: 20,
                    color: theme.colors.chineseViolet,
                  }}
                  onPress={() => console.log("Sort ascending!")}
                  type="outline"
                  containerStyle={{ marginEnd: 5 }}
                />
                <Chip
                  title="Filter"
                  icon={{
                    name: "arm-flex",
                    type: "material-community",
                    size: 20,
                    color: theme.colors.chineseViolet,
                  }}
                  onPress={() => console.log("Filter by muscle!")}
                  type="outline"
                  containerStyle={{ marginEnd: 5 }}
                />
              </View>
            </>
          ),
        })}
      >
        {(props) => <ExerciseList searchQuery={searchQuery} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default Exercises
