import "./GameEdit.css"
import { useEffect, useState } from "react"
import InputCustom from "../../components/InputCustom/InputCustom"
import Select from "../../components/Select/Select"
import { CheckForm, checkAllEmpty, validator } from "../../utils/utils"
import InputFile from "../../components/InputFile/InputFile"
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Spinner from "../../components/Spinner/Spinner"
import AlertCustom from "../../components/AlertCustom/AlertCustom"
import { UpdateGame, getSingleGame } from "../../services/gameServices"

const GameEdit = () => {
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
  const { id } = useParams()

  const fetchGame = async () => {
    try {
      const game = await getSingleGame(id)
      setGame(game.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchGame()
  }, [])

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

  const handleDelete = (imageName) => {
    setGame({
      ...game,
      [imageName]: null,
    })
  }

  const {
    name,
    playersMin,
    playersMax,
    description,
    price,
    image1,
    image2,
    image3,
    category,
  } = game

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const newGame = await UpdateGame(id, game, token)
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
        <>
          <div className="container centered-container mt-3 mb-3">
            <div className="card p-3">
              <h2 className="center-flex mb-3 mt-3">
                Puedes editar tu juego aquí
              </h2>
              <div className="container container-preview mb-3">
                {image1 ? (
                  <>
                    <div className="image-container">
                      <img
                        src={image1}
                        alt="Image1"
                        className="image-preview"
                      />
                      <span
                        className="material-symbols-outlined close-icon"
                        onClick={() => handleDelete("image1")}
                      >
                        close
                      </span>
                    </div>
                  </>
                ) : (
                  <InputFile
                    buttonText={"imagen 1"}
                    name={"image1"}
                    handleChange={handleChange}
                  />
                )}

                {image2 ? (
                  <>
                    <div className="image-container">
                      <img
                        src={image2}
                        alt="Image2"
                        className="image-preview"
                      />
                      <span
                        className="material-symbols-outlined close-icon"
                        onClick={() => handleDelete("image2")}
                      >
                        close
                      </span>
                    </div>
                  </>
                ) : (
                  <InputFile
                    buttonText={"imagen 2"}
                    name={"image2"}
                    handleChange={handleChange}
                  />
                )}

                {image3 ? (
                  <>
                    <div className="image-container">
                      <img
                        src={image3}
                        alt="Image3"
                        className="image-preview"
                      />
                      <span
                        className="material-symbols-outlined close-icon"
                        onClick={() => handleDelete("image3")}
                      >
                        close
                      </span>
                    </div>
                  </>
                ) : (
                  <InputFile
                    buttonText={"imagen 3"}
                    name={"image3"}
                    handleChange={handleChange}
                  />
                )}
              </div>
              <div className="container mb-3">
                <InputCustom
                  label={"Nombre del juego"}
                  name={"name"}
                  type={"text"}
                  value={name}
                  handleChange={handleChange}
                />
                <div className="error">{gameError.nameError}</div>
                <InputCustom
                  label={"Jugadores mínimos"}
                  name={"playersMin"}
                  type={"number"}
                  value={playersMin}
                  handleChange={handleChange}
                />
                <div className="error">{gameError.playersMinError}</div>
                <InputCustom
                  label={"Jugadores máximos"}
                  name={"playersMax"}
                  type={"number"}
                  value={playersMax}
                  handleChange={handleChange}
                />
                <div className="error">{gameError.playersMaxError}</div>
                <Select
                  onCategoryChange={handleCategoryChange}
                  gameCategory={category}
                />
                <InputCustom
                  label={"Descripción del juego"}
                  name={"description"}
                  type={"textarea"}
                  value={description}
                  handleChange={handleChange}
                />
                <div className="error">{gameError.descriptionError}</div>
                <InputCustom
                  label={"Precio"}
                  name={"price"}
                  type={"number"}
                  value={price}
                  handleChange={handleChange}
                />
                <div className="error">{gameError.priceError}</div>
              </div>
              {isFormComplete ? (
                <ButtonCustom
                  text={"Editar"}
                  isFormComplete={isFormComplete}
                  handleSubmit={handleSubmit}
                />
              ) : (
                <ButtonCustom
                  text={"Debes rellenar todos los campos"}
                  isFormComplete={isFormComplete}
                  handleSubmit={handleSubmit}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default GameEdit
