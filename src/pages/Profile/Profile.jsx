/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { GetProfile, UpdateProfile } from "../../services/userServices"
import CardProfile from "../../components/CardProfile/CardProfile"
import CardGame from "../../components/CardGame/CardGame"
import AlertCustom from "../../components/AlertCustom/AlertCustom"
import EditUserModal from "../../components/EditUserModal/EditUserModal"
import { validator } from "../../utils/utils"

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
  const [avatarFile, setAvatarFile] = useState()
  const [editProfile, setEditProfile] = useState({
    description: null,
  })
  const [editProfileError, setEditProfileError] = useState({
    descriptionError: "",
  })
  const [avatarUrl, setAvatarUrl] = useState(null)
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

  const handleChange = ({ target }) => {
    //si es un archivo
    if (target.files) {
      setAvatarFile((prevState) => ({
        ...prevState,
        [target.name]: target.files[0],
      }))
      const fileUrl = URL.createObjectURL(target.files[0])
      setAvatarUrl(fileUrl)
    } else {
      setEditProfile((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }))
      const error = validator(target.value, target.name)
      setEditProfileError((prevState) => ({
        ...prevState,
        [target.name + "Error"]: error,
      }))
    }
  }
  const handleEdit = async () => {
    // setLoading(true)
    try {
      const profile = {
        avatar: avatarFile?.avatar,
      }
      if (editProfile.description !== null) {
        profile.description = editProfile.description
      } else {
        profile.description = profile.description
      }
      const updated = await UpdateProfile(username, profile, token)
      setProfile(updated.data)
      handleModal()
      // setLoading(false)
    } catch (error) {
      console.log("Error updatinging profile:", error)
      setLoading(false)
      setAlert(true)
      setStateMessage({
        message: `${error}`,
        className: "danger",
      })
    }
  }

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
          <div className="d-flex justify-content-end p-1">
            {" "}
            <button className="btn btn-warning" onClick={handleModal}>
              <span className="material-symbols-outlined">edit_note</span>
            </button>
          </div>
        )}
      </div>
      <EditUserModal
        loading={loading}
        stateMessage={stateMessage}
        alert={alert}
        avatarFile={avatarFile}
        editProfile={editProfile}
        editProfileError={editProfileError}
        avatarUrl={avatarUrl}
        handleChange={handleChange}
        handleEdit={handleEdit}
        setAvatarUrl={setAvatarUrl}
        isModalOpen={isModalOpen}
        handleModal={handleModal}
        // placeholderDescription={description}
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
