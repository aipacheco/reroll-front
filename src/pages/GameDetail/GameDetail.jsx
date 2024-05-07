/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react"
import { getSingleGame } from "../../services/gameServices"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import SingleGame from "../../components/SingleGame/SingleGame"
import Spinner from "../../components/Spinner/Spinner"
import AlertCustom from "../../components/AlertCustom/AlertCustom"

const GameDetail = () => {
  const [loading, setLoading] = useState(false)
  const [singleGame, setSingleGame] = useState({})
  const [authorName, setAuthorName] = useState("")
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [alert, setAlert] = useState(false)
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
  } = singleGame

  return (
    <>
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
          />{" "}
        </>
      )}
    </>
  )
}

export default GameDetail
