import { useEffect, useState } from "react"
import InputCustom from "../../components/InputCustom/InputCustom"
import "./FormAddress.css"
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom"
import { useNavigate } from "react-router-dom"
import AlertCustom from "../../components/AlertCustom/AlertCustom"
import { useDispatch, useSelector } from "react-redux"
import { CheckForm, checkAllEmpty, validator } from "../../utils/utils"
import Spinner from "../../components/Spinner/Spinner"
import { CreateAddress, GetAddress } from "../../services/addressServices"
import SelectProvince from "../../components/SelectProvince/SelectProvince"
import CardAddress from "../../components/CardAddress/CardAddress"
import ShopModal from "../../components/ShopModal/ShopModal"
import { setAddressId } from "../../redux/addressSlice"

const FormAddress = () => {
  const [address, setAddress] = useState({
    name: "",
    lastName: "",
    streetAddress: "",
    city: "",
    cp: "",
    province: "",
  })
  const [addressError, setAddressError] = useState({
    nameError: "",
    lastNameError: "",
    streetAddressError: "",
    cityError: "",
    cpError: "",
    provinceError: "",
  })
  const navigate = useNavigate()
  const [isFormComplete, setIsFormComplete] = useState(false)
  const [loading, setLoading] = useState(false)
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [alert, setAlert] = useState(false)
  const [isFormVisible, setFormVisible] = useState(false)
  const [fetchedAddress, setFetchedAddress] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState(null)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const itemId = useSelector((state) => state.item.itemId)

  const fetchAddress = async () => {
    setLoading(true)
    try {
      const userAddress = await GetAddress(token)
      if (userAddress.success) {
        setFetchedAddress(userAddress.data)
      }
    } catch (error) {
      setLoading(false)
      setAlert(true)
      setStateMessage({
        message: `${error}`,
        className: "danger",
      })
      setTimeout(() => {
        setAlert(false)
        setLoading(false)
      }, 1200)
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchAddress()
  }, [])

  useEffect(() => {
    const isErrorClean = checkAllEmpty(addressError)
    const isaddressComplete = CheckForm(address)
    if (isErrorClean && isaddressComplete) {
      setIsFormComplete(true)
    } else {
      setIsFormComplete(false)
    }
  }, [address, addressError])

  useEffect(() => {
    if (fetchedAddress.length === 0) {
      setFormVisible(true)
    } else {
      setFormVisible(false)
    }
  }, [fetchedAddress])

  const toggleForm = () => {
    setFormVisible(!isFormVisible)
  }

  const handleChange = ({ target }) => {
    setAddress((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
    const error = validator(target.value, target.name)
    setAddressError((prevState) => ({
      ...prevState,
      [target.name + "Error"]: error,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const userAddress = await CreateAddress(address, token)
      if (userAddress.success) {
        setFetchedAddress([...fetchedAddress, userAddress.data])
        setAlert(true)
        setStateMessage({
          message: userAddress.message,
          className: "success",
        })
        setTimeout(() => {
          setAlert(false)
        }, 1200)
      }
    } catch (error) {
      setLoading(false)
      setAlert(true)
      setStateMessage({
        message: `${error}`,
        className: "danger",
      })
      setTimeout(() => {
        setAlert(false)
        navigate(`/login`)
      }, 1200)
      console.log(error)
    }
    setLoading(false)
  }

  const handleSelectAddress = (id) => {
    setSelectedAddressId(id)
    setIsModalOpen(true)
  }

  const handleEditAddress = (id) => {
    navigate(`/edit/address/${id}`)
  }

  const handleConfirm = () => {
    dispatch(
      setAddressId({
        addressId: selectedAddressId,
      })
    )
    setTimeout(() => {
      navigate(`/confirm`)
    }, 500)
  }
  const handleModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  return (
    <>
      <div className="container mb-5">
        {loading ? (
          <Spinner />
        ) : alert ? (
          <div className="centered-container">
            <AlertCustom
              className={stateMessage.className}
              message={stateMessage.message}
            />
          </div>
        ) : (
          <>
            {fetchedAddress.length > 0 ? (
              <div className="card-grid mt-3">
                {fetchedAddress.map((address) => {
                  return (
                    <div className="card-container card p-3" key={address._id}>
                      <CardAddress
                        key={address._id}
                        name={address.name}
                        lastName={address.lastName}
                        streetAddress={address.streetAddress}
                        city={address.city}
                        cp={address.cp}
                        province={address.province}
                      />
                      <div className="centered">
                        {itemId && (
                          <button
                            className="btn btn-outline-warning my-button me-3"
                            onClick={() => handleSelectAddress(address._id)}
                          >
                            Seleccionar
                            <span className="material-symbols-outlined">
                              done
                            </span>
                          </button>
                        )}
                        <button
                          className="btn btn-outline-warning my-button"
                          onClick={() => handleEditAddress(address._id)}
                        >
                          Editar
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : null}
            <ShopModal
              isModalOpen={isModalOpen}
              handleModal={handleModal}
              handleSelectAddress={handleSelectAddress}
              handleConfirm={handleConfirm}
              text={"¿Quieres confirmar esta dirección?"}
              textButton={"Confirmar dirección"}
            />
            <div className="card container mt-5 p-3">
              <div className="col-12">
                <div
                  className="header-container clickable"
                  onClick={toggleForm}
                >
                  <h5>Introduce una nueva dirección</h5>
                  {isFormVisible ? (
                    <span className="btn btn-warning material-symbols-outlined">
                      expand_more
                    </span>
                  ) : (
                    <span className="btn btn-warning material-symbols-outlined">
                      expand_less
                    </span>
                  )}
                </div>

                {isFormVisible && (
                  <>
                    {" "}
                    <div className="input-container">
                      <InputCustom
                        label={"Nombre"}
                        type={"text"}
                        name={"name"}
                        handleChange={handleChange}
                        placeholder={"Introduce tu nombre"}
                      />
                      <div className="error">{addressError.nameError}</div>{" "}
                    </div>
                    <div className="input-container">
                      <InputCustom
                        label={"Apellidos"}
                        type={"text"}
                        name={"lastName"}
                        handleChange={handleChange}
                        placeholder={"Introduce tus apellidos"}
                      />
                      <div className="error">{addressError.lastNameError}</div>{" "}
                    </div>
                    <div className="input-container">
                      <InputCustom
                        label={"Dirección postal"}
                        type={"text"}
                        name={"streetAddress"}
                        handleChange={handleChange}
                        placeholder={
                          "Introduce tu calle, número, piso y puerta"
                        }
                      />
                      <div className="error">
                        {addressError.streetAddressError}
                      </div>{" "}
                    </div>
                    <div className="input-container">
                      <InputCustom
                        label={"Ciudad"}
                        type={"text"}
                        name={"city"}
                        handleChange={handleChange}
                        placeholder={"Introduce tu ciudad"}
                      />
                      <div className="error">{addressError.cityError}</div>{" "}
                    </div>
                    <SelectProvince onProvinceChange={handleChange} />
                    <div className="input-container">
                      <InputCustom
                        label={"Código postal"}
                        type={"number"}
                        name={"cp"}
                        handleChange={handleChange}
                        placeholder={"Introduce tu código postal"}
                      />
                      <div className="error">{addressError.cpError}</div>{" "}
                    </div>
                    {alert && (
                      <div className="center-flex mt-3">
                        <AlertCustom
                          className={stateMessage.className}
                          message={stateMessage.message}
                        />
                      </div>
                    )}
                    <ButtonCustom
                      text={"Enviar"}
                      handleSubmit={handleSubmit}
                      isFormComplete={isFormComplete}
                    />
                    <div className="login-question mt-2">
                      <AlertCustom
                        className={"light text-center"}
                        message={
                          <>
                            La dirección de envío será mandada al comprador para
                            que te envíe el juego.
                          </>
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default FormAddress
