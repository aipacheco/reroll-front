import { Link, useNavigate } from "react-router-dom"
import InputCustom from "../../components/InputCustom/InputCustom"
import { RegisterUser } from "../../services/authServices"
import "./Register.css"
import { useEffect, useState } from "react"
import Spinner from "../../components/Spinner/Spinner"
import AlertCustom from "../../components/AlertCustom/AlertCustom"
import { CheckForm, checkAllEmpty, validator } from "../../utils/utils"
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom"

const Register = () => {
  const [isFormComplete, setIsFormComplete] = useState(false)
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  })
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [alert, setAlert] = useState(false)
  const [userError, setUserError] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
  })

  useEffect(() => {
    const isErrorClean = checkAllEmpty(userError)
    const isUserComplete = CheckForm(user)
    if (isErrorClean && isUserComplete) {
      setIsFormComplete(true)
    } else {
      setIsFormComplete(false)
    }
  }, [user, userError])

  const handleChange = ({ target }) => {
    setUser((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
    const error = validator(target.value, target.name)
    setUserError((prevState) => ({
      ...prevState,
      [target.name + "Error"]: error,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const userRegister = await RegisterUser(user)
      if (userRegister.success) {
        setAlert(true)
        setStateMessage({
          message: userRegister.message,
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
        navigate("/register")
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
          <div className="container">
            <div className="col-12 mb-5 mt-3">
              <div className="input-container">
                <InputCustom
                  label={"Nombre de usuario"}
                  type={"text"}
                  name={"username"}
                  handleChange={handleChange}
                />
                <div className="error">{userError.usernameError}</div>
              </div>
              <div className="input-container">
                <InputCustom
                  label={"Email"}
                  type={"email"}
                  name={"email"}
                  handleChange={handleChange}
                />
                <div className="error">{userError.emailError}</div>
              </div>
              <div className="input-container">
                <InputCustom
                  label={"Contraseña"}
                  type={"password"}
                  name={"password"}
                  handleChange={handleChange}
                />
                <div className="error">{userError.passwordError}</div>
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
                text={"Registrarse"}
                handleSubmit={handleSubmit}
                isFormComplete={isFormComplete}
              />
              <div className="login-question mt-2">
                <AlertCustom
                  className={"light text-center"}
                  message={
                    <>
                      ¿Ya tienes cuenta?{" "}
                      <Link id="register-link" to="/login">
                        Inicia sesión
                      </Link>
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

export default Register
