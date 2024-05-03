/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react"
import { getSingleGame } from "../../services/gameServices"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import SingleGame from "../../components/SingleGame/SingleGame"

const GameDetail = () => {
  const [loading, setLoading] = useState(false)
  const [singleGame, setSingleGame] = useState({})
  const { id } = useParams()

  const fetchSingleGame = async () => {
    setLoading(true)
    try {
      const data = await getSingleGame(id)
      setSingleGame(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSingleGame()
  }, [])

  console.log(singleGame)

  const { image1, image2, image3 } = singleGame

  return (
    <>
      <SingleGame
        images={[
          { label: "Imagen 1", imgPath: image1 },
          { label: "Imagen 2", imgPath: image2 },
          { label: "Imagen 3", imgPath: image3 },
        ]}
      />
    </>
  )
}

export default GameDetail
