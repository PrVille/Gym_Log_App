import { useSelector } from "react-redux"
import { selectUser } from "../../../redux/reducers/userReducer"
import Card from "../../Utils/Card"
import { Achievements } from "../Account"

const FavouriteAchievements = ({ navigation }) => {
  const user = useSelector(selectUser)
  const favouriteAchievements = user.favouriteAchievements

  if (favouriteAchievements.length === 0)
    return (
      <Card>
        <Card.Header
          buttonTitle="Achievements"
          onButtonPress={() => {
            navigation.navigate("Account")
          }}
        >
          Select Favourite Achievements!
        </Card.Header>
      </Card>
    )

  return (
    <>
      {favouriteAchievements.map((type) => (
        <Achievements key={type} type={type} widget />
      ))}
    </>
  )
}

export default FavouriteAchievements
