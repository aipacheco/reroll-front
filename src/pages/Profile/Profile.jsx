import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { GetProfile } from "../../services/userServices"
import CardProfile from "../../components/CardProfile/CardProfile"
import CardGame from "../../components/CardGame/CardGame"
import AlertCustom from "../../components/AlertCustom/AlertCustom"

const Profile = () => {
  const [alert, setAlert] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState([])
  const [userGames, setUserGames] = useState([])
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const token = useSelector((state) => state.auth.token)
  const decode = useSelector((state) => state.auth.decode)

  //hay que sacar el username de los params (la barra de navegación) para pasarlo a GetProfile
  const { username } = useParams()

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const myProfile = await GetProfile(username)
      setProfile(myProfile.data)
      setUserGames(myProfile.data.games)
    } catch (error) {
      console.log("Error fetching profile:", error)
      setLoading(false)
      setAlert(true)
      setStateMessage({
        message: `${error}`,
        className: "danger",
      })
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchProfile()
  }, [username])
  console.log(profile)
  const { avatar, description } = profile

  return (
    <div className="container mt-5">
      <CardProfile
        avatar={avatar}
        username={username}
        description={description}
      />
      <div className="row">
        {userGames.length >0 ? (
          userGames.map((game) => {
            return (
              <div className="col-12 col-md-6 col-lg-4" key={game._id}>
                <CardGame
                  key={game._id}
                  name={game.name}
                  image1={game.image1}
                  description={game.description}
                  price={game.price}
                />
              </div>
            )
          })
        ) : (
          <AlertCustom
          className={"light text-center"}
          message={`El usuario ${username} no tiene juegos para vender.`}
        />
        )}
      </div>
    </div>
  )
}

export default Profile
