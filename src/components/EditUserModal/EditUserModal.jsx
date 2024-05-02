/* eslint-disable react/prop-types */
import "./EditUserModal.css"
import { Modal } from "reactstrap"
import CloseIcon from "@mui/icons-material/Close"
import Spinner from "../Spinner/Spinner"
import AlertCustom from "../AlertCustom/AlertCustom"
import InputCustom from "../InputCustom/InputCustom"
import ButtonCustom from "../ButtonCustom/ButtonCustom"
import { useEffect, useState } from "react"
import InputFile from "../InputFile/InputFile"
import { CheckForm, checkAllEmpty, validator } from "../../utils/utils"

const EditUserModal = ({ isModalOpen, handleModal, avatar, description }) => {
  const [loading, setLoading] = useState(false)
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [alert, setAlert] = useState(false)
  const [avatarFile, setAvatarFile] = useState(avatar)
  const [editProfile, setEditProfile] = useState({
    description: description || "",
  })
  const [editProfileError, setEditProfileError] = useState({
    descriptionError: "",
  })
  const [isFormComplete, setIsFormComplete] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(null)

  useEffect(() => {
    const isErrorClean = checkAllEmpty(editProfileError)
    const isUserComplete = CheckForm(editProfile)
    if (isErrorClean && isUserComplete) {
      setIsFormComplete(true)
    } else {
      setIsFormComplete(false)
    }
  }, [editProfile, editProfileError])

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
  // const handleDelete = (imageName) => {
  //   setEditProfile({
  //     ...editProfile,
  //     [imageName]: null,
  //   })
  // }

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
          <InputCustom
            label={"Descripción"}
            type={"text"}
            name={"description"}
            value={editProfile.description || ""}
            handleChange={handleChange}
          />
          <div className="error">{editProfileError.descriptionError}</div>
          <div className="mt-3">
            <div className="container centered justify-content-around ">
              {avatarUrl ? (
                <>
                  {" "}
                  <img src={avatarUrl} alt="Avatar"  className="image-preview"/>
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
            <ButtonCustom
              text={"Guardar cambios"}
              isFormComplete={isFormComplete}
              // handleSubmit={handleEditSubmit}
            />
          </div>
        </>
      )}
    </Modal>
  )
}

export default EditUserModal
