import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { GetProfile, UpdateProfile } from "../../services/userServices"
import CardProfile from "../../components/CardProfile/CardProfile"
import CardGame from "../../components/CardGame/CardGame"
import AlertCustom from "../../components/AlertCustom/AlertCustom"
import EditUserModal from "../../components/EditUserModal/EditUserModal"

const Profile = () => {
  const [alert, setAlert] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState([])
  const [userGames, setUserGames] = useState([])
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [edit, setEdit] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
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
    const canEdit = decode.username === username
    if (canEdit) {
      setEdit(true)
    }
  }, [decode.username, username])

  const handleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  //   const updateProfile = async () => {
  //   setLoading(true)
  //   try {
  //     const updated = await UpdateProfile(username, profile, token)
  //     // setProfile(myProfile.data)
  //     // setUserGames(myProfile.data.games)
  //   } catch (error) {
  //     console.log("Error updatinging profile:", error)
  //     setLoading(false)
  //     setAlert(true)
  //     setStateMessage({
  //       message: `${error}`,
  //       className: "danger",
  //     })
  //   }
  // }
  useEffect(() => {
    fetchProfile()
  }, [username])

  // console.log(profile)
  const { avatar, description } = profile

  return (
    <div className="container mt-5">
      <div className="card mb-3">
        <CardProfile
          avatar={avatar}
          username={username}
          description={description}
        />
        {edit && (
          <div className="d-flex justify-content-center mt-3">
            {" "}
            <button
              className="btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              Editar perfil
            </button>
          </div>
        )}
      </div>

      <EditUserModal
        isModalOpen={isModalOpen}
        handleModal={handleModal}
        avatar={avatar}
        description={description}
      />

      <div className="row">
        {userGames.length > 0 ? (
          userGames.map((game) => {
            return (
              <div className="col-12 col-md-6 col-lg-4" key={game._id}>
                <CardGame
                _id={game._id}
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
