/* eslint-disable react/prop-types */
import "./EditUserModal.css"
import { Modal } from "reactstrap"
import CloseIcon from "@mui/icons-material/Close"
import Spinner from "../Spinner/Spinner"
import AlertCustom from "../AlertCustom/AlertCustom"
import InputCustom from "../InputCustom/InputCustom"
import ButtonCustom from "../ButtonCustom/ButtonCustom"
import { useState } from "react"
import InputFile from "../InputFile/InputFile"
import { validator } from "../../utils/utils"
import { UpdateProfile } from "../../services/userServices"

const EditUserModal = ({
  isModalOpen,
  handleModal,
  avatar,
  description,
  username,
  token,
}) => {
  const [loading, setLoading] = useState(false)
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [alert, setAlert] = useState(false)
  const [avatarFile, setAvatarFile] = useState(avatar)
  const [editProfile, setEditProfile] = useState({
    description,
  })
  const [editProfileError, setEditProfileError] = useState({
    descriptionError: "",
  })
  const [avatarUrl, setAvatarUrl] = useState(null)

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
        description: editProfile.description,
        avatar: avatarFile?.avatar,
      }
      const updated = await UpdateProfile(username, profile, token)
      setEditProfile(updated.data)
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

  return (
    <Modal
      className="center-modal modal-form"
      isOpen={isModalOpen}
      toggle={handleModal}
    >
      <div className="close-button" onClick={handleModal}>
        <CloseIcon className="clickable" />
      </div>
      {loading ? (
        <Spinner />
      ) : alert ? (
        <AlertCustom
          className={stateMessage.className}
          message={stateMessage.message}
        />
      ) : (
        <>
          <div className="container">
            <h5>Edita tus datos de usuario</h5>
            <InputCustom
              label={"Descripción"}
              type={"text"}
              name={"description"}
              value={editProfile.description}
              handleChange={handleChange}
              placeholder={description}
            />
            <div className="error">{editProfileError.descriptionError}</div>
            <div className="mt-3">
              <div className="container centered justify-content-around mb-3">
                {avatarUrl ? (
                  <>
                    {" "}
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      className="image-preview"
                    />
                    <span
                      className="material-symbols-outlined"
                      onClick={() => setAvatarUrl(null)}
                    >
                      X
                    </span>
                  </>
                ) : (
                  <InputFile
                    buttonText={"Avatar"}
                    name={"avatar"}
                    handleChange={handleChange}
                  />
                )}
              </div>
              <div className="mb-2">
                <ButtonCustom
                  text={"Guardar cambios"}
                  isFormComplete={true}
                  handleSubmit={handleEdit}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </Modal>
  )
}

export default EditUserModal
