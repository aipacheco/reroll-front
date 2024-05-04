import { useEffect, useState } from "react"
import InputCustom from "../../components/InputCustom/InputCustom"
import "./FormAddress.css"
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom"
import { useNavigate } from "react-router-dom"
import AlertCustom from "../../components/AlertCustom/AlertCustom"
import { useSelector } from "react-redux"
import { CheckForm, checkAllEmpty, validator } from "../../utils/utils"
import Spinner from "../../components/Spinner/Spinner"
import { CreateAddress } from "../../services/addressServices"
import SelectProvince from "../../components/SelectProvince/SelectProvince"

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
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    const isErrorClean = checkAllEmpty(addressError)
    const isaddressComplete = CheckForm(address)
    if (isErrorClean && isaddressComplete) {
      setIsFormComplete(true)
    } else {
      setIsFormComplete(false)
    }
  }, [address, addressError])

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
        setAlert(true)
        setStateMessage({
          message: userAddress.message,
          className: "success",
        })
        setTimeout(() => {
          setAlert(false)
          navigate("/login")
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

  return (
    <>
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
          <div className="card card-register container">
            <div className="col-12 mb-5 mt-3">
              <h2 className="text-center"> Introduce tu dirección </h2>
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
                  placeholder={"Introduce tu calle, número, piso y puerta"}
                />
                <div className="error">{addressError.streetAddressError}</div>{" "}
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
                      La dirección de envío será mandada al comprador para que
                      te envíe el juego.
                    </>
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default FormAddress
