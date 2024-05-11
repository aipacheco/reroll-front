/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react"
import {
  ReserveGame,
  SellGame,
  getSingleGame,
} from "../../services/gameServices"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import SingleGame from "../../components/SingleGame/SingleGame"
import Spinner from "../../components/Spinner/Spinner"
import AlertCustom from "../../components/AlertCustom/AlertCustom"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setItemId } from "../../redux/itemSlice"

const GameDetail = () => {
  const [loading, setLoading] = useState(false)
  const [singleGame, setSingleGame] = useState({})
  const [authorName, setAuthorName] = useState("")
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [alert, setAlert] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const decode = useSelector((state) => state.auth.decode)
  const token = useSelector((state) => state.auth.token)

  const { id } = useParams()

  const fetchSingleGame = async () => {
    setLoading(true)
    try {
      const data = await getSingleGame(id)
      setSingleGame(data.data)
      setAuthorName(data.data.author.username)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setAlert(true)
      setStateMessage({
        message: error.message,
        className: "alert-danger",
      })
      console.log(error)
    }
    setLoading(false)
  }
  const handleShop = () => {
    dispatch(
      setItemId({
        itemId: _id,
      })
    )
    navigate(`/address`)
  }
  const handleEdit = () => {
    navigate(`/game/edit/${_id}`)
  }

  const handleAuthor = () => {
    navigate(`/user/${authorName}`)
  }

  const handleReserve = async () => {
    console.log(id)
    setLoading(true)
    try {
      const reserved = await ReserveGame(id, token)
      if (reserved.success) {
        setStateMessage({
          message: "Juego reservado",
          className: "success",
        })
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
          navigate("/games")
        }, 1200)
      }
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

  const handleSold = async () => {
    setLoading(true)
    try {
      const selled = await SellGame(id, token)
      if (selled.success) {
        setStateMessage({
          message: "Juego reservado",
          className: "success",
        })
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
          navigate("/games")
        }, 1200)
      }
    } catch (error) {
      setLoading(false)
      setAlert(true)
      setStateMessage({
        message: error.message,
        className: "alert-danger",
      })
      setTimeout(() => {
        setAlert(false)
      }, 1200)
      console.log("Error fetching address and item:", error)
    }
  }

  useEffect(() => {
    fetchSingleGame()
  }, [])

  const {
    _id,
    image1,
    image2,
    image3,
    name,
    description,
    playersMin,
    playersMax,
    price,
    status
  } = singleGame

  return (
    <>
      {loading ? (
        <div className="centered-container">
          <Spinner />
        </div>
      ) : alert ? (
        <div className="d-flex justify-content-center mt-3">
          <AlertCustom
            className={stateMessage.className}
            message={stateMessage.message}
          />
        </div>
      ) : (
        <>
          {" "}
          <SingleGame
            _id={_id}
            images={[
              { label: "Imagen 1", imgPath: image1 },
              { label: "Imagen 2", imgPath: image2 },
              { label: "Imagen 3", imgPath: image3 },
            ]}
            name={name}
            description={description}
            playersMin={playersMin}
            playersMax={playersMax}
            price={price}
            author={authorName}
            handleAuthor={handleAuthor}
            handleShop={
              decode?.username === authorName ? handleEdit : handleShop
            }
            buttonText={decode?.username === authorName ? "Editar" : "Comprar"}
            symbol={decode?.username === authorName ? "edit" : "shopping_cart"}
            showButtons={decode?.username === authorName}
            handleReserve={() => handleReserve(_id)}
            handleSold={() => handleSold(_id)}
            status={status}
          />
        </>
      )}
    </>
  )
}

export default GameDetail
