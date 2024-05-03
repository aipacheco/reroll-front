/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react"
import { getSingleGame } from "../../services/gameServices"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import SingleGame from "../../components/SingleGame/SingleGame"
import Spinner from "../../components/Spinner/Spinner"

const GameDetail = () => {
  const [loading, setLoading] = useState(false)
  const [singleGame, setSingleGame] = useState({})
  const [authorName, setAuthorName] = useState("")
  const { id } = useParams()

  const fetchSingleGame = async () => {
    setLoading(true)
    try {
      const data = await getSingleGame(id)
      setSingleGame(data.data)
      setAuthorName(data.data.author.username)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSingleGame()
  }, [])

  console.log(singleGame)

  const {
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
      ) : (
        <>
          {" "}
          <SingleGame
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
