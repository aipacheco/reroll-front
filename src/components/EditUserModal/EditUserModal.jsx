/* eslint-disable react/prop-types */
import "./EditUserModal.css"
import { Modal } from "reactstrap"
import CloseIcon from "@mui/icons-material/Close"
import Spinner from "../Spinner/Spinner"
import AlertCustom from "../AlertCustom/AlertCustom"
import InputCustom from "../InputCustom/InputCustom"
import ButtonCustom from "../ButtonCustom/ButtonCustom"
import InputFile from "../InputFile/InputFile"

const EditUserModal = ({
  isModalOpen,
  handleModal,
  description,
  loading,
  stateMessage,
  alert,
  editProfile,
  editProfileError,
  avatarUrl,
  handleChange,
  handleEdit,
  setAvatarUrl,
  // placeholderDescription
}) => {
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
              // placeholder={placeholderDescription}
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
