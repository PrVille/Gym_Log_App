import { useMemo, useState } from "react"
import { SafeAreaView, Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import { selectUser, updateUser, signOut } from "../../redux/reducers/userReducer"
import Section from "../Utils/Section"
import getHours from "date-fns/getHours"
import { ListItem, Icon, LinearProgress, Button } from "@rneui/themed"
import theme from "../../theme"
import { selectWorkouts } from "../../redux/reducers/workoutReducer"
import { selectSets } from "../../redux/reducers/setReducer"

const Achievement = ({ tier, medalColor, action, target, data }) => {
  const completed = data >= tier

  return (
    <ListItem>
      <Icon
        name="medal"
        type="material-community"
        size={50}
        color={completed ? medalColor : theme.colors.secondary}
      />
      <ListItem.Content>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ListItem.Title style={{ flex: 1 }}>
            {action} {tier} {target}
          </ListItem.Title>
        </View>
        <ListItem.Subtitle>
          {Math.floor(completed ? tier : data)} / {tier}
        </ListItem.Subtitle>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <LinearProgress
            style={{ marginVertical: 10, marginEnd: 10, flex: 1 }}
            color={theme.colors.primary}
            trackColor={theme.colors.secondary}
            value={completed ? 1 : data / tier}
          />
          <Text
            style={{
              color: theme.colors.primary,
              textAlign: "right",
              minWidth: "12%",
            }}
          >
            {completed ? 100 : Math.floor((data / tier) * 100)} %
          </Text>
        </View>
      </ListItem.Content>
    </ListItem>
  )
}

export const Achievements = ({ type, widget }) => {
  const [isExpanded, setExpanded] = useState(false)
  const dispatch = useDispatch()
  const workouts = useSelector(selectWorkouts)
  const selectedSets = useSelector(selectSets)
  const user = useSelector(selectUser)
  const countWarmupSets = user.settings.general.countWarmupSets
  const sets = countWarmupSets ? selectedSets : selectedSets.filter(set => set.type !== "warmup")
  const favourite = user.favouriteAchievements.includes(type)

  const workoutsCount = useMemo(() => workouts.length, [workouts])
  const volumeCount = useMemo(
    () => sets.map((set) => set.weight * set.reps).reduce((a, b) => a + b, 0),
    [sets]
  )
  const setsCount = useMemo(() => sets.length, [sets])
  const repsCount = useMemo(
    () => sets.map((set) => set.reps).reduce((a, b) => a + b, 0),
    [sets]
  )
  const durationCount = useMemo(
    () =>
      workouts.map((workout) => workout.duration).reduce((a, b) => a + b, 0),
    [workouts]
  )

  const data =
    type === "Workouts"
      ? workoutsCount
      : type === "Volume"
      ? volumeCount
      : type === "Sets"
      ? setsCount
      : type === "Reps"
      ? repsCount
      : durationCount

  const factor =
    type === "Workouts"
      ? 1
      : type === "Volume"
      ? 500
      : type === "Sets"
      ? 15
      : type === "Reps"
      ? 100
      : 60

  const action =
    type === "Workouts"
      ? "Log"
      : type === "Volume"
      ? "Acquire"
      : type === "Sets"
      ? "Complete"
      : type === "Reps"
      ? "Complete"
      : "Workout for"

  const target =
    type === "Workouts"
      ? "Workouts"
      : type === "Volume"
      ? "Kg Of Volume"
      : type === "Sets"
      ? "Sets"
      : type === "Reps"
      ? "Reps"
      : "Minutes"

  const medalColors = {
    bronze: "#c07544",
    silver: "#868c92",
    gold: "#daa526",
    platinum: "#839cc1",
    diamond: "#5647ba",
  }

  const tier1 = 50 * factor
  const tier2 = 100 * factor
  const tier3 = 250 * factor
  const tier4 = 1000 * factor
  const tier5 = 2500 * factor

  const accordionMedalColor =
    data >= tier5
      ? medalColors.diamond
      : data >= tier4
      ? medalColors.platinum
      : data >= tier3
      ? medalColors.gold
      : data >= tier2
      ? medalColors.silver
      : data >= tier1
      ? medalColors.bronze
      : theme.colors.secondary

  const addFavourite = () => {
    const userCopy = JSON.parse(JSON.stringify(user))
    userCopy.favouriteAchievements.push(type)
    dispatch(updateUser(userCopy))
  }

  const removeFavourite = () => {
    const userCopy = JSON.parse(JSON.stringify(user))
    userCopy.favouriteAchievements = userCopy.favouriteAchievements.filter(
      (fav) => fav !== type
    )
    dispatch(updateUser(userCopy))
  }
  const AchievementList = () => (
    <>
      <Achievement
        tier={tier1}
        medalColor={medalColors.bronze}
        action={action}
        target={target}
        data={data}
      />
      <Achievement
        tier={tier2}
        medalColor={medalColors.silver}
        action={action}
        target={target}
        data={data}
      />
      <Achievement
        tier={tier3}
        medalColor={medalColors.gold}
        action={action}
        target={target}
        data={data}
      />
      <Achievement
        tier={tier4}
        medalColor={medalColors.platinum}
        action={action}
        target={target}
        data={data}
      />
      <Achievement
        tier={tier5}
        medalColor={medalColors.diamond}
        action={action}
        target={target}
        data={data}
      />
    </>
  )

  return (
    <View>
      <ListItem.Accordion
        containerStyle={{ paddingHorizontal: 10 }}
        icon={
          <Icon
            name={"chevron-down"}
            type="material-community"
            style={{ color: theme.colors.primary }}
          />
        }
        content={
          <>
            <Icon
              name="medal"
              type="material-community"
              size={50}
              color={accordionMedalColor}
              containerStyle={{ marginEnd: 20 }}
            />
            <ListItem.Content>
              <ListItem.Title>{type}</ListItem.Title>
            </ListItem.Content>
            {!widget && (
              <Icon
                name={favourite ? "star" : "star-outline"}
                onPress={() => (favourite ? removeFavourite() : addFavourite())}
                type="material-community"
                size={30}
                style={{ alignItems: "flex-end" }}
              />
            )}
          </>
        }
        isExpanded={isExpanded}
        onPress={() => {
          setExpanded(!isExpanded)
        }}
      >
        <AchievementList />
      </ListItem.Accordion>
    </View>
  )
}

const Account = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const hour = getHours(new Date())
  const time =
    hour < 5
      ? "Night"
      : hour < 12
      ? "Morning"
      : hour < 17
      ? "Afternoon"
      : hour < 21
      ? "Evening"
      : "Night"

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <Section>
          <Section.Title lg>
            Good {time}, {user.name}!
          </Section.Title>
          <Section.Title sm>
            @ {user.username}
          </Section.Title>
        </Section>

        <Section>
          <Section.Title md>Achievements</Section.Title>
        </Section>

        <Achievements type="Workouts" />

        <Achievements type="Volume" />

        <Achievements type="Sets" />

        <Achievements type="Reps" />

        <Achievements type="Duration" />

        <Button
          containerStyle={{ marginTop: 50, marginHorizontal: 20 }}
          title={"Sign Out"}
          onPress={() => dispatch(signOut())}
        />
      </View>
    </ScrollView>
  )
}

export default Account
