// import Spinner from "../../components/Spinner/Spinner"
import { useEffect, useState } from "react"
import "./Home.css"
import { GetGames } from "../../services/gameServices"
import CardGame from "../../components/CardGame/CardGame"
import InputSearch from "../../components/InputSearch/InputSearch"

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [games, setGames] = useState([])
  const [search, setSearch] = useState("")

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  )

  const fetchGames = async () => {
    setLoading(true)
    try {
      const games = await GetGames()
      setGames(games.data)
    } catch (error) {
      console.log("Error fetching games:", error)
      setLoading(false)
      setAlert(true)
      setStateMessage({
        message: `${error}`,
        className: "danger",
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchGames()
  }, [])

  return (
    <div className="container center-flex pb-5">
      <div className="container">
        <InputSearch
          type="text"
          value={search}
          handleChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="row mb-5">
        {" "}
        {filteredGames.map((game) => (
          <div className="col-12 col-md-6 col-lg-4 p-3 centered" key={game._id}>
            <CardGame
              _id={game._id}
              key={game._id}
              name={game.name}
              image1={game.image1}
              description={game.description}
              price={game.price}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
