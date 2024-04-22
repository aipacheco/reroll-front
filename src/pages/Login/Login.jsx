import { useEffect, useState } from "react"
import InputCustom from "../../components/InputCustom/InputCustom"
import "./Login.css"
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom"
import { Link, useNavigate } from "react-router-dom"
import AlertCustom from "../../components/AlertCustom/AlertCustom"
import { useDispatch } from "react-redux"
import { setAuthToken } from "../../redux/authSlice"
import { CheckForm, checkAllEmpty, validator } from "../../utils/utils"
import Spinner from "../../components/Spinner/Spinner"
import { LoginUser } from "../../services/authServices"
import { decodeToken } from "react-jwt"

const Login = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate()
  const [isFormComplete, setIsFormComplete] = useState(false)
  const [loading, setLoading] = useState(false)
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [alert, setAlert] = useState(false)
  const [userError, setUserError] = useState({
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
      const userLogged = await LoginUser(user)
      if (userLogged.success) {
        /* dispatch setea setAuthToken(la funcion del slicer) 
        con el token y el username que viene desde el back*/
        const decode = decodeToken(userLogged.token)
        dispatch(
          setAuthToken({
            token: userLogged.token,
            decode: decode,
          })
        )
        setAlert(true)
        setStateMessage({
          message: userLogged.message,
          className: "success",
        })
        if (decode.role === "user") {
          setTimeout(() => {
            setAlert(false)
            navigate(`/${decode.username}`)
          }, 1200)
        }
        if (decode.role === "super_admin") {
          setTimeout(() => {
            setAlert(false)
            navigate("/admin")
          }, 1200)
        }
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
        navigate("/login")
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
                  label={"Email"}
                  type={"email"}
                  name={"email"}
                  handleChange={handleChange}
                />
                <div className="error">{userError.emailError}</div>{" "}
              </div>
              <div className="input-container">
                <InputCustom
                  label={"Contraseña"}
                  type={"password"}
                  name={"password"}
                  handleChange={handleChange}
                />
                <div className="error">{userError.passwordError}</div>{" "}
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
                text={"Login"}
                handleSubmit={handleSubmit}
                isFormComplete={isFormComplete}
              />
              <div className="login-question mt-2">
                <AlertCustom
                  className={"light text-center"}
                  message={
                    <>
                      ¿No tienes cuenta?{" "}
                      <Link id="login-link" to="/register">
                        Regístrate
                      </Link>{" "}
                      para acceder.
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

export default Login
