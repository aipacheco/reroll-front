/* eslint-disable react/prop-types */
import CloseIcon from "@mui/icons-material/Close"
import ButtonCustom from "../ButtonCustom/ButtonCustom"
import { Modal } from "reactstrap"

const ShopModal = ({
  isModalOpen,
  handleModal,
  handleConfirm,
  text,
  cancel,
  handleCancel,
  textButton,
}) => {
  return (
    <>
      <Modal
        className="center-modal modal-form"
        isOpen={isModalOpen}
        toggle={handleModal}
      >
        <div className="close-button text-end" onClick={handleModal}>
          <CloseIcon className="clickable" />
        </div>

        <>
          <div className="container">
            <div className="p-3 text-center">{text}</div>
            <div className="d-flex justify-content-center mb-3">
              {cancel && (
                <button className="btn btn-danger m-1" onClick={handleCancel}>
                  No
                </button>
              )}
              <ButtonCustom
                text={textButton}
                isFormComplete={true}
                handleSubmit={handleConfirm}
              />
            </div>
          </div>
        </>
      </Modal>
    </>
  )
}

export default ShopModal
