import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css"
import { useDispatch, useSelector } from "react-redux"
import { clearAuthToken } from "../../redux/authSlice"
import { clearItemId } from "../../redux/itemSlice"
import { clearAddressId } from "../../redux/addressSlice"
import { useEffect, useState } from "react"

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)
  const decode = useSelector((state) => state.auth.decode)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600)
    }

    window.addEventListener("resize", handleResize)

    // limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleLogout = () => {
    dispatch(clearAuthToken())
    dispatch(clearItemId())
    dispatch(clearAddressId())
    navigate("/login", { replace: true })
  }

  const handleAdmin = () => {
    navigate("/admin", { replace: true })
  }

  return (
    <>
      <div className={`bg-body-secondary nav sticky-top general-nav ${isMobile ? '' : 'justify-content-center'}`}>
        {decode && decode.role === "admin" && (
          <div className="admin">
            <button
              className="btn btn-outline-warning my-button"
              onClick={handleAdmin}
            >
              <span className="button-text">Admin</span>
              <span className="material-symbols-outlined">
                admin_panel_settings
              </span>
            </button>
          </div>
        )}

        <div className={`nav-item ${isMobile ? "nav-item-mobile" : ""}`}>
          <Link to="/games" replace>
            <h1 className="h1-home">re-roll</h1>
          </Link>
        </div>

        {token && (
          <div className="logout-button-container">
            <button
              className="btn btn-outline-warning my-button"
              onClick={handleLogout}
            >
              <span className="button-text">Exit</span>
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar
