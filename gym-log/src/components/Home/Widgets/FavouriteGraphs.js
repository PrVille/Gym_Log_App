import { Text, View, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux"
import { selectUser } from "../../../redux/reducers/userReducer"
import WorkoutsGraph from "../../Graphs/WorkoutsGraph"
import theme from "../../../theme"
import Card from "../../Utils/Card"
import TargetMuscleGraph from "../../Graphs/TargetMuscleGraph"
import ExerciseGraph from "../../Graphs/ExerciseGraph"
import { selectExercises } from "../../../redux/reducers/exerciseReducer"

const GraphTitle = ({ title, showButton, onPress }) => {
  return (
    <View
      style={{
        marginStart: 10,
        marginEnd: 10,
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <Text
        style={{
          fontSize: theme.fontSizes.subheading,
          flex: 1,
          color: theme.colors.primary,
          fontWeight: theme.fontWeights.bold,
        }}
      >
        {title}
      </Text>
      {showButton && (
        <TouchableOpacity
          style={{
            minWidth: "20%",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
          onPress={onPress}
        >
          <Text
            style={{
              fontSize: theme.fontSizes.subheading,
              color: theme.colors.primary,
            }}
          >
            Graph Details
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const FavouriteGraphs = ({ navigation }) => {
  const user = useSelector(selectUser)
  const exercises = useSelector(selectExercises)
  const favouriteGraphs = user.favouriteGraphs
  const targetMuscleDataType =
    user.settings.home.favouriteGraphs.options.targetMuscleData
  const exerciseDataType =
    user.settings.home.favouriteGraphs.options.exerciseData

  if (
    favouriteGraphs.overall.length === 0 &&
    favouriteGraphs.targetMuscle.length === 0 &&
    favouriteGraphs.exercise.length === 0
  )
    return (
      <Card>
        <Card.Header
          buttonTitle="Statistics"
          onButtonPress={() => {
            navigation.navigate("StatisticsStack")
          }}
        >
          Select Favourite Graphs!
        </Card.Header>
      </Card>
    )

  return (
    <View>
      <View style={{ marginTop: 10 }}>
        {favouriteGraphs.overall.map((type) => (
          <View key={type}>
            <GraphTitle
              title={`Overall ${type}`}
              showButton
              onPress={() =>
                navigation.navigate("GraphScreen", {
                  category: "Overall",
                  type,
                })
              }
            />
            <WorkoutsGraph type={type} widget />
          </View>
        ))}

        {favouriteGraphs.targetMuscle.map((type) => (
          <View key={type}>
            <GraphTitle
              title={`${type} ${targetMuscleDataType}`}
              showButton
              onPress={() =>
                navigation.navigate("GraphScreen", {
                  category: "TargetMuscle",
                  type,
                })
              }
            />
            <TargetMuscleGraph targetMuscle={type} widget />
          </View>
        ))}

        {favouriteGraphs.exercise.map((type) => (
          <View key={type}>
            <GraphTitle
              title={`${
                exercises.find((exercise) => exercise._id === type).name
              } ${exerciseDataType}`}
              showButton
              onPress={() =>
                navigation.navigate("GraphScreen", {
                  category: "Exercise",
                  type,
                })
              }
            />
            <ExerciseGraph exerciseId={type} widget />
          </View>
        ))}
      </View>
    </View>
  )
}

export default FavouriteGraphs
