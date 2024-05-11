import { useEffect, useState } from "react"
import InputCustom from "../../components/InputCustom/InputCustom"
import { CheckForm, checkAllEmpty, validator } from "../../utils/utils"
import SelectProvince from "../../components/SelectProvince/SelectProvince"
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom"
import { useNavigate, useParams } from "react-router-dom"
import { GetAddressById, UpdateAddress } from "../../services/addressServices"
import { useSelector } from "react-redux"
import Spinner from "../../components/Spinner/Spinner"
import AlertCustom from "../../components/AlertCustom/AlertCustom"

const AddressEdit = () => {
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
  const [isFormComplete, setIsFormComplete] = useState(false)
  const [loading, setLoading] = useState(false)
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [alert, setAlert] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)
  const decode = useSelector((state) => state.auth.decode)

  const fetchAddress = async () => {
    setLoading(true)
    try {
      const userAddress = await GetAddressById(id, token)
      setAddress(userAddress.data)
    } catch (error) {
      setLoading(false)
      setAlert(true)
      setStateMessage({
        message: `${error}`,
        className: "danger",
      })
      setTimeout(() => {
        setAlert(false)
        // navigate(`/login`)
      }, 1200)
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchAddress()
  }, [])

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
      const userAddress = await UpdateAddress(id, address, token)
      if (userAddress.success) {
        setAlert(true)
        setStateMessage({
          message: userAddress.message,
          className: "success",
        })
        setTimeout(() => {
          setAlert(false)
          navigate(`/user/${decode.username}`)
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
        navigate(`/`)
      }, 1200)
      console.log(error)
    }
    setLoading(false)
  }
  useEffect(() => {
    const isErrorClean = checkAllEmpty(addressError)
    const isaddressComplete = CheckForm(address)
    if (isErrorClean && isaddressComplete) {
      setIsFormComplete(true)
    } else {
      setIsFormComplete(false)
    }
  }, [address, addressError])

  const handleCancel = () => {
    navigate(`/address`)
  }

  const { name, lastName, streetAddress, city, cp, province } = address

  return (
    <>
      <div className="centered-container p-3">
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
          <div className="card container p-3">
            <h5 className="text-center">Editar dirección</h5>
            <div className="input-container">
              <InputCustom
                label={"Nombre"}
                type={"text"}
                name={"name"}
                value={name}
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
                value={lastName}
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
                value={streetAddress}
                handleChange={handleChange}
                placeholder={"Introduce tu calle, número, piso y puerta"}
              />
              <div className="error">{addressError.streetAddressError}</div>{" "}
            </div>
            <div className="input-container">
              <InputCustom
                label={"Ciudad"}
                type={"text"}
                name={"city"}
                value={city}
                handleChange={handleChange}
                placeholder={"Introduce tu ciudad"}
              />
              <div className="error">{addressError.cityError}</div>{" "}
            </div>
            <SelectProvince
              userProvince={province}
              onProvinceChange={handleChange}
            />
            <div className="input-container">
              <InputCustom
                label={"Código postal"}
                type={"number"}
                name={"cp"}
                value={cp}
                handleChange={handleChange}
                placeholder={"Introduce tu código postal"}
              />
              <div className="error">{addressError.cpError}</div>{" "}
            </div>
            <div className="container d-flex justify-content-center mb-3">
            <button className="btn btn-outline-danger me-3" onClick={handleCancel}>
                Volver
              </button>
              <ButtonCustom
                text={"Enviar"}
                handleSubmit={handleSubmit}
                isFormComplete={isFormComplete}
              
              />
           
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default AddressEdit
