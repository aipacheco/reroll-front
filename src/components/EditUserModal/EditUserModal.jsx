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
  loading,
  stateMessage,
  alert,
  editProfile,
  editProfileError,
  avatarUrl,
  handleChange,
  handleEdit,
  setAvatarUrl,
}) => {
  return (
    <Modal
      className="center-modal modal-form"
      isOpen={isModalOpen}
      toggle={handleModal}
    >
      <div className="close-button text-end" onClick={handleModal}>
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
            <h4 className="text-center"> Edita tus datos de usuario</h4>
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
                    <div className="image-container">
                      <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="image-preview"
                      />
                      <span
                        className="material-symbols-outlined close-icon"
                        onClick={() => setAvatarUrl(null)}
                      >
                        close
                      </span>
                    </div>
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
