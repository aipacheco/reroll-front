// import Spinner from "../../components/Spinner/Spinner"
import { useEffect, useState } from "react"
import "./Home.css"
import { GetGames } from "../../services/gameServices"
import CardGame from "../../components/CardGame/CardGame"
import InputSearch from "../../components/InputSearch/InputSearch"
import AlertCustom from "../../components/AlertCustom/AlertCustom"
import Spinner from "../../components/Spinner/Spinner"
import { getCategories } from "../../services/categoryServices"
import { ThemeProvider } from "@mui/material/styles"
import Slider from "@mui/material/Slider"
import { customTheme } from "../../utils/themes"

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [games, setGames] = useState([])
  const [search, setSearch] = useState({
    name: "",
    category: "",
    playersMin: 1,
    playersMax: 100,
  })
  const [category, setCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")

  const filteredGames = games.filter(
    (game) =>
      game.name.toLowerCase().includes(search.name.toLowerCase()) &&
      game.category.toLowerCase().includes(search.category.toLowerCase())
    &&
    game.playersMin >= search.playersMin &&
    game.playersMax <= search.playersMax
  )

  const handleCategoryChange = (selectedCategoryId, selectedCategoryName) => {
    setSearch((prevState) => ({
      ...prevState,
      category: selectedCategoryId,
    }))
    setSelectedCategory(selectedCategoryName)
  }

  const handleSort = (order) => {
    let sortedProducts = [...games]

    if (order === "ascending") {
      sortedProducts.sort((a, b) => a.price - b.price)
    } else if (order === "descending") {
      sortedProducts.sort((a, b) => b.price - a.price)
    }
    // console.log(order)
    setGames(sortedProducts)
  }

  const handleDelete = () => {
    setSearch((prevState) => ({
      ...prevState,
      category: "",
    }))
  }

  const handleRange = (event, newValue) => {
    setSearch({ ...search, playersMin: newValue[0], playersMax: newValue[1] })
    // console.log(search.playersMin, search.playersMax)
  }

  const fetchGames = async () => {
    setLoading(true)
    try {
      const games = await GetGames()
      setGames(games.data)
      const response = await getCategories()
      setCategory(response.data)
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
        <div className="container center-flex pb-5">
          <div className="container">
            <InputSearch
              type="text"
              value={search}
              handleChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
            />
          </div>
          <div className="row w-100 justify-content-center">
            <div className="col-12 col-md-6 col-lg-3 col-xl-3 card  p-3 m-1">
              <div className="text-center mb-1">Filtrar por categoría</div>
              <div className="d-flex align-items-center justify-content-around">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-warning dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {search.category
                      ? selectedCategory.charAt(0).toUpperCase() +
                        selectedCategory.slice(1).toLowerCase()
                      : "Categoría"}
                  </button>
                  <ul className="dropdown-menu dropdown-center">
                    {category
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((item, index) => (
                        <li
                          className="dropdown-item"
                          key={index}
                          value={item._id}
                          onClick={() =>
                            handleCategoryChange(item._id, item.name)
                          }
                        >
                          {item.name.charAt(0).toUpperCase() +
                            item.name.slice(1).toLowerCase()}
                        </li>
                      ))}
                  </ul>
                </div>

                <span
                  className="m-2 text-danger clickable"
                  onClick={handleDelete}
                >
                  Limpiar
                </span>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 col-xl-3 card p-3 m-1">
              <div className="text-center mb-1">Ordenar por precio</div>
              <select
                className="form-select"
                onChange={(event) => handleSort(event.target.value)}
              >
                <option selected disabled>Ordenar por precio</option>
                <option value="ascending">Menor</option>
                <option value="descending">Mayor</option>
              </select>
            </div>

            <div className="col-12 col-md-4 col-lg-3 col-xl-3  card m-1 p-3">
              <div className="mt-1 text-center ">Número de jugadores</div>
              <ThemeProvider theme={customTheme}>
                <Slider
                  getAriaLabel={() => "Player range"}
                  value={[search.playersMin, search.playersMax]}
                  onChange={handleRange}
                  valueLabelDisplay="auto"
                  min={1}
                  max={15}
                  color="warning"
                />
              </ThemeProvider>
              <div className="mt-3"></div>
            </div>
          </div>
          <div className="row mb-5">
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <div
                  className="col-12 col-md-6 col-lg-3 col-xl-4 p-3 centered"
                  key={game._id}
                >
                  <CardGame
                    _id={game._id}
                    key={game._id}
                    name={game.name}
                    image1={game.image1}
                    description={game.description}
                    price={game.price}
                    status={game.status}
                  />
                </div>
              ))
            ) : (
              <AlertCustom
                className={"light text-center"}
                message={"No se han encontrado juegos con esas características"}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
