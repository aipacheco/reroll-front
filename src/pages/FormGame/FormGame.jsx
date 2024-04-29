import "./FormGame.css"
import { useEffect, useState } from "react"
import InputCustom from "../../components/InputCustom/InputCustom"
import Select from "../../components/Select/Select"
import { CheckForm, checkAllEmpty, validator } from "../../utils/utils"
import InputFile from "../../components/InputFile/InputFile"
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { CreateGame } from "../../services/gameServices"
import Spinner from "../../components/Spinner/Spinner"
import AlertCustom from "../../components/AlertCustom/AlertCustom"

const FormGame = () => {
  const navigate = useNavigate()
  const [game, setGame] = useState({
    name: "",
    playersMin: "",
    playersMax: "",
    description: "",
    price: "",
    category: "",
    image1: null,
    image2: null,
    image3: null,
  })
  const [gameError, setGameError] = useState({
    nameError: "",
    playersMinError: "",
    playersMaxError: "",
    descriptionError: "",
    priceError: "",
  })
  const [isFormComplete, setIsFormComplete] = useState(false)
  const [loading, setLoading] = useState(false)
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [alert, setAlert] = useState(false)
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [token])

  useEffect(() => {
    const isErrorClean = checkAllEmpty(gameError)
    const isGameComplete = CheckForm(game)
    if (
      isErrorClean &&
      isGameComplete &&
      game.image1 !== null &&
      game.image2 !== null &&
      game.image3 !== null
    ) {
      setIsFormComplete(true)
    } else {
      setIsFormComplete(false)
    }
  }, [game, gameError])

  const handleChange = ({ target }) => {
    //si es un archivo
    if (target.files) {
      setGame((prevState) => ({
        ...prevState,
        [target.name]: target.files[0],
      }))
    } else {
      setGame((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }))
      const error = validator(target.value, target.name)
      setGameError((prevState) => ({
        ...prevState,
        [target.name + "Error"]: error,
      }))
    }
  }
  const handleCategoryChange = (selectedCategory) => {
    setGame((prevState) => ({
      ...prevState,
      category: selectedCategory,
    }))
  }
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const newGame = await CreateGame(game, token)
      if (newGame.success) {
        setAlert(true)
        setStateMessage({
          message: newGame.message,
          className: "success",
        })
        setTimeout(() => {
          setAlert(false)
          navigate("/")
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
        navigate("/")
      }, 1200)
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <>
      <div className="container mt-5">
        <h2 className="center-flex mb-5">
          Introduce los datos del juego que quieres vender
        </h2>
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
          <>
            <InputCustom
              label={"Nombre del juego"}
              name={"name"}
              type={"text"}
              handleChange={handleChange}
            />
            <div className="error">{gameError.nameError}</div>
            <InputCustom
              label={"Jugadores mínimos"}
              name={"playersMin"}
              type={"number"}
              handleChange={handleChange}
            />
            <div className="error">{gameError.playersMinError}</div>
            <InputCustom
              label={"Jugadores máximos"}
              name={"playersMax"}
              type={"number"}
              handleChange={handleChange}
            />
            <div className="error">{gameError.playersMaxError}</div>
            <Select onCategoryChange={handleCategoryChange} />
            <InputCustom
              label={"Descripción del juego"}
              name={"description"}
              type={"textarea"}
              handleChange={handleChange}
            />
            <div className="error">{gameError.descriptionError}</div>
            <InputCustom
              label={"Precio"}
              name={"price"}
              type={"number"}
              handleChange={handleChange}
            />
            <div className="error">{gameError.priceError}</div>
            <div className="container center-flex">
              {game.image1 ? (
                <img
                  className="image-preview"
                  src={URL.createObjectURL(game.image1)}
                  alt="Vista previa"
                />
              ) : (
                <InputFile
                  buttonText={"imagen 1"}
                  name={"image1"}
                  handleChange={handleChange}
                />
              )}
              {game.image2 ? (
                <img
                  className="image-preview"
                  src={URL.createObjectURL(game.image2)}
                  alt="Vista previa"
                />
              ) : (
                <InputFile
                  buttonText={"imagen 2"}
                  name={"image2"}
                  handleChange={handleChange}
                />
              )}
              {game.image3 ? (
                <img
                  className="image-preview"
                  src={URL.createObjectURL(game.image3)}
                  alt="Vista previa"
                />
              ) : (
                <InputFile
                  buttonText={"imagen 3"}
                  name={"image3"}
                  handleChange={handleChange}
                />
              )}
            </div>

            {isFormComplete && (
              <ButtonCustom
                text={"Enviar"}
                isFormComplete={isFormComplete}
                handleSubmit={handleSubmit}
              />
            )}
          </>
        )}
      </div>
    </>
  )
}

export default FormGame
