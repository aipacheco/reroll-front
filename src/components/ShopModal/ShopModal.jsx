/* eslint-disable react/prop-types */
import CloseIcon from "@mui/icons-material/Close"
import ButtonCustom from "../ButtonCustom/ButtonCustom"
import { Modal } from "reactstrap"

const ShopModal = ({ isModalOpen, handleModal, handleConfirm }) => {
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
            <div className="mb-2">
              ¿Deseas seleccionar esta dirección?
              <ButtonCustom
                text={"seleccionar dirección"}
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
