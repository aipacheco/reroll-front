import "./ConfirmSale.css"
import { useDispatch, useSelector } from "react-redux"
import { getSingleGame } from "../../services/gameServices"
import { GetAddressById } from "../../services/addressServices"
import { useEffect, useState } from "react"
import CardGame from "../../components/CardGame/CardGame"
import CardAddress from "../../components/CardAddress/CardAddress"
import { useNavigate } from "react-router-dom"
import AlertCustom from "../../components/AlertCustom/AlertCustom"
import Spinner from "../../components/Spinner/Spinner"
import ShopModal from "../../components/ShopModal/ShopModal"
import { clearItemId } from "../../redux/itemSlice"
import { clearAddressId } from "../../redux/addressSlice"
import { CreateTransaction } from "../../services/transactionServices"

const ConfirmSale = () => {
  const [item, setItem] = useState({})
  const [address, setAddress] = useState({})
  const [loading, setLoading] = useState(false)
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [alert, setAlert] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const addressId = useSelector((state) => state.address.addressId)
  const itemId = useSelector((state) => state.item.itemId)
  const token = useSelector((state) => state.auth.token)

  const fetchAddressAndItem = async () => {
    setLoading(true)
    try {
      const item = await getSingleGame(itemId)
      setItem(item.data)
      const address = await GetAddressById(addressId, token)
      setAddress(address.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setAlert(true)
      setStateMessage({
        message: error.message,
        className: "alert-danger",
      })
      setTimeout(() => {
        setAlert(false)
        navigate("/games")
      }, 1200)
      console.log("Error fetching address and item:", error)
    }
  }

  const handleTransaction = async () => {
    setLoading(true)
    try {
      const data = await CreateTransaction(itemId, addressId, token)
      if (data.success) {
        setAlert(true)
        setStateMessage({
          message:
            "Venta realizada con éxito. El vendedor recibirá un email con los datos de envío. Gracias por tu compra!",
          className: "success",
        })
        setTimeout(() => {
          setAlert(false)
          navigate("/games")
        }, 2000)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setAlert(true)
      setStateMessage({
        message: error.message,
        className: "danger",
      })
      setTimeout(() => {
        setAlert(false)
        navigate("/games")
      }, 1200)
      console.log("Error transaccion", error)
    }
  }

  const handleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleConfirm = () => {
    dispatch(clearItemId())
    dispatch(clearAddressId())
    setAlert(true)
    setStateMessage({
      message: "Venta cancelada",
      className: "danger",
    })
    setTimeout(() => {
      setAlert(false)
      navigate("/games")
    }, 1200)
  }

  const handleCancel = () => {
    setIsModalOpen(!isModalOpen)
  }

  useEffect(() => {
    if (addressId && itemId) {
      fetchAddressAndItem()
    } else {
      navigate("/games")
    }
  }, [])

  const { name, price, image1, description } = item
  const { name: addressName, lastName, city, province, streetAddress } = address

  return (
    <>
      <ShopModal
        isModalOpen={isModalOpen}
        handleModal={handleModal}
        handleConfirm={handleConfirm}
        text={"¿Quieres cancelar la venta? Los datos de la venta se perderán."}
        textButton={"Cancelar la venta"}
        cancel={true}
        handleCancel={handleCancel}
      />
      <div className="centered-container">
        {loading ? (
          <Spinner />
        ) : alert ? (
          <div className="d-flex justify-content-center mt-3">
            <AlertCustom
              className={stateMessage.className}
              message={stateMessage.message}
            />
          </div>
        ) : (
          <div className="confirm-card">
            <div className="">
              <h5 className="centered p-3">
                Comprueba que estos son los datos correctos
              </h5>
              <div className="container-sale">
                <CardGame
                  name={name}
                  price={price}
                  image1={image1}
                  description={description}
                  _id={itemId}
                />
              </div>
              <div className="card address-card">
                <CardAddress
                  name={addressName}
                  lastName={lastName}
                  city={city}
                  province={province}
                  streetAddress={streetAddress}
                />
              </div>
              <div className="container container-confirm mt-3 p-3">
                <AlertCustom
                  className="light"
                  message="Por favor, comprueba que los datos son correctos. No se podrá modificar la dirección una vez confirmada la venta."
                />
              </div>
              <div className="container centered mt-3 pb-5">
                <button
                  className="btn btn-outline-danger m-1"
                  onClick={handleModal}
                >
                  Cancelar
                </button>
                <button className="btn btn-warning" onClick={handleTransaction}>
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ConfirmSale
