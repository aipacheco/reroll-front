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
    category: "",
    playersMin: 1,
    playersMax: 100,
  })
  const [category, setCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [inputToSearch, setInputToSearch] = useState("")
  const [isRangeTouched, setIsRangeTouched] = useState(false)
  const maxPlayers = Math.max(...games.map((game) => game.playersMax))

  const filteredGames = games.filter((game) => {
    //para controlar si la barra de rango ha sido tocada
    if (!isRangeTouched) {
      return (
        game.name.toLowerCase().includes(inputToSearch.toLowerCase()) &&
        game.category.toLowerCase().includes(search.category.toLowerCase())
      )
    }
    return (
      game.name.toLowerCase().includes(inputToSearch.toLowerCase()) &&
      game.category.toLowerCase().includes(search.category.toLowerCase()) &&
      game.playersMin == search.playersMin &&
      game.playersMax <= search.playersMax
    )
  })

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
    setIsRangeTouched(true)
  }

  const handleDeleteRange = () => {
    setSearch((prevState) => ({
      ...prevState,
      playersMin: 1,
      playersMax: 100,
    }))
    setIsRangeTouched(false)
  }

  const fetchGames = async () => {
    setLoading(true)
    try {
      const games = await GetGames()
      setGames(
        games.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      )
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
              value={inputToSearch}
              handleChange={(e) => setInputToSearch(e.target.value)}
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
                    {category.map((item, index) => (
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
                <option selected disabled>
                  Ordenar por precio
                </option>
                <option value="ascending">Menor</option>
                <option value="descending">Mayor</option>
              </select>
            </div>

            <div className="col-12 col-md-4 col-lg-3 col-xl-3 card m-1 p-3">
              <div className="mt-1 text-center">Número de jugadores</div>
              <div className="d-flex align-items-center">
                <ThemeProvider theme={customTheme}>
                  <Slider
                    getAriaLabel={() => "Player range"}
                    value={[search.playersMin, search.playersMax]}
                    onChange={handleRange}
                    valueLabelDisplay="auto"
                    min={1}
                    max={maxPlayers}
                    color="warning"
                  />
                </ThemeProvider>
                <span
                  className="m-2 text-danger clickable margin-left"
                  onClick={handleDeleteRange}
                >
                  Limpiar
                </span>
              </div>
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
