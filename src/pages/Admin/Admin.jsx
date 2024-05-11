import "./Admin.css"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Modal } from "reactstrap"
import DataTable from "react-data-table-component"
import Spinner from "../../components/Spinner/Spinner"
import { customStyles } from "../../utils/themes"
import AlertCustom from "../../components/AlertCustom/AlertCustom"
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom"
import { deleteUser, getAllUsers } from "../../services/userServices"
import { DeleteGame, GetGames } from "../../services/gameServices"
import InputCustom from "../../components/InputCustom/InputCustom"
import { createCategory, getCategories } from "../../services/categoryServices"

const Admin = () => {
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)
  const decode = useSelector((state) => state.auth.decode)
  const [loading, setLoading] = useState(false)
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [alert, setAlert] = useState(false)
  const [users, setUsers] = useState([])
  const [games, setGames] = useState([])
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState({
    name: "",
  })
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedGame, setSelectedGame] = useState(null)
  //para el modal de eliminar juego
  const [isModalGameOpen, setIsModalGameOpen] = useState(false)
  //para el modal de eliminar usuario
  const [isModalOpen, setIsModalOpen] = useState(false)
  //para el modal de eliminar categoría
  const [deleteReason, setDeleteReason] = useState({
    reason: "",
  })

  const isAdmin = decode && decode.role === "admin"

  const fetchData = async () => {
    setLoading(true)
    try {
      const users = await getAllUsers(token)
      const games = await GetGames()
      const categories = await getCategories()
      setUsers(users.data)
      setGames(games.data)
      setCategories(categories.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setAlert(true)
      setStateMessage({
        message: `${error}`,
        className: "danger",
      })
      setTimeout(() => {
        setAlert(false)
      }, 1200)
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
    if (decode.role !== "admin") {
      navigate("/")
    }
    if (isAdmin) {
      fetchData()
    }
  }, [token, decode, navigate])

  const columns = [
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Borrar usuario",
      cell: (row) => (
        <button
          className="btn btn-outline-warning"
          onClick={() => handleDeleteClick(row)}
        >
          <i className="material-symbols-outlined">cancel</i>
        </button>
      ),
    },
  ]
  const columnsGame = [
    {
      name: "Nombre del juego",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Vendedor",
      selector: (row) => row.author.username,
      sortable: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Precio",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Borrar anuncio",
      cell: (row) => (
        <button
          className="btn btn-outline-warning"
          onClick={() => handleDeleteGameClick(row)}
        >
          <i className="material-symbols-outlined">cancel</i>
        </button>
      ),
    },
  ]

  const handleDeleteClick = (user) => {
    //lo setea a selectedUser
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleDeleteGameClick = (game) => {
    //lo setea a selectedGame
    setSelectedGame(game)
    // console.log(selectedGame)
    setIsModalGameOpen(true)
  }

  const handleChange = ({ target }) => {
    setDeleteReason((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  const handleCategoryChange = ({ target }) => {
    setCategory((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  const handleConfirmDelete = async (e) => {
    e.preventDefault()
    const id = selectedUser._id
    setLoading(true)
    try {
      const inactiveUser = await deleteUser(id, token)
      if (inactiveUser.success) {
        //hay que volver a hacer fetch para traer los datos de nuevo
        await fetchData()
        setAlert(true)
        setStateMessage({
          message: inactiveUser.message,
          className: "success",
        })
        setTimeout(() => {
          setAlert(false)
        }, 1200)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setAlert(true)
      setStateMessage({
        message: `${error}`,
        className: "danger",
      })
      setTimeout(() => {
        setAlert(false)
      }, 1200)
    }
    setIsModalOpen(false)
  }

  const handleConfirmDeleteGame = async (e) => {
    e.preventDefault()
    const id = selectedGame._id
    setLoading(true)
    try {
      const deleteGame = await DeleteGame(id, deleteReason, token)
      if (deleteGame.success) {
        //hay que volver a hacer fetch para traer los datos de nuevo
        await fetchData()
        setAlert(true)
        setStateMessage({
          message: deleteGame.message,
          className: "success",
        })
        setTimeout(() => {
          setAlert(false)
        }, 1200)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setAlert(true)
      setStateMessage({
        message: `${error}`,
        className: "danger",
      })
      setTimeout(() => {
        setAlert(false)
      }, 1200)
    }
    setIsModalGameOpen(false)
  }

  const handleCategoryPost = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const newCategory = await createCategory(category, token)
      if (newCategory.success) {
        //hay que volver a hacer fetch para traer los datos de nuevo
        await fetchData()
        setAlert(true)
        setStateMessage({
          message: newCategory.message,
          className: "success",
        })
        setTimeout(() => {
          setAlert(false)
        }, 1200)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setAlert(true)
      setStateMessage({
        message: `${error}`,
        className: "danger",
      })
      setTimeout(() => {
        setAlert(false)
      }, 1200)
    }
  }

  return (
    <>
      <div className="container mt-2">
        {loading ? (
          <div className="centered-container">
            <Spinner />
          </div>
        ) : (
          <>
            {/* modal de eliminar usuario */}
            <Modal
              className="center-modal"
              isOpen={isModalOpen}
              toggle={() => setIsModalOpen(false)}
            >
              <div className="container p-4">
                <h5 className="text-center mt-1">Confirmar Eliminación</h5>

                <p className="text-center">
                  ¿Estás seguro de que deseas eliminar el usuario?
                </p>
                <div className="d-flex justify-content-center ">
                  <button
                    className="btn btn-outline-danger my-button me-3"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn btn-outline-warning my-button"
                    onClick={handleConfirmDelete}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </Modal>
            {/* modal de eliminar juego */}
            <Modal
              className="center-modal"
              isOpen={isModalGameOpen}
              toggle={() => setIsModalGameOpen(false)}
            >
              <div className="container p-4">
                <h5 className="text-center mt-1">Confirmar Eliminación</h5>

                <p className="text-center">
                  ¿Estás seguro de que deseas eliminar el anuncio?
                </p>
                <div className="container mb-3">
                  <InputCustom
                    type="text"
                    name={"reason"}
                    label="Motivo de la eliminación"
                    handleChange={handleChange}
                    placeholder={
                      "Introduce el motivo para enviar un email al vendedor"
                    }
                  />
                </div>
                <div className="d-flex justify-content-center ">
                  <button
                    className="btn btn-outline-danger my-button me-3"
                    onClick={() => setIsModalGameOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn btn-outline-warning my-button"
                    onClick={handleConfirmDeleteGame}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </Modal>

            {alert && (
              <div className="d-flex justify-content-center mt-3">
                <AlertCustom
                  className={stateMessage.className}
                  message={stateMessage.message}
                />
              </div>
            )}
            <div className="center-flex mt-5">
              <h4 className="">Categorías</h4>
              <div className="card-container w-100 bg-light">
                {categories &&
                  categories.map((category) => (
                    <div key={category._id} className="container">
                      <div className="container p-3">
                        <div className="card p-1">
                          {category.name.charAt(0).toUpperCase() +
                            category.name.slice(1).toLowerCase()}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="center-flex bg-light">
              <div className="row w-50 mt-2 d-flex justify-content-center">
                <div className="">
                  {" "}
                  <InputCustom
                    type="text"
                    name={"name"}
                    label="Nueva categoría"
                    handleChange={handleCategoryChange}
                    placeholder={"Introduce el nombre de la categoría"}
                  />
                </div>
                <div className="p-1">
                  {" "}
                  <ButtonCustom
                    text={"Añadir categoría"}
                    isFormComplete={true}
                    handleSubmit={handleCategoryPost}
                  />
                </div>
              </div>
            </div>

            <h4 className="center-flex mt-3">
              Panel de administración de usuarios
            </h4>
            <DataTable
              columns={columns}
              data={users}
              customStyles={customStyles}
              selectableRows
              fixedHeader
              pagination
              paginationPerPage={10}
            />
            <h4 className="center-flex mt-3">
              Panel de administración de anuncios
            </h4>
            <div className="container data-games">
              <DataTable
                columns={columnsGame}
                data={games}
                customStyles={customStyles}
                selectableRows
                fixedHeader
                pagination
                paginationPerPage={10}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Admin
