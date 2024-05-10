import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css"
import { useDispatch, useSelector } from "react-redux"
import { clearAuthToken } from "../../redux/authSlice"
import { clearItemId } from "../../redux/itemSlice"
import { clearAddressId } from "../../redux/addressSlice"

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)
  const decode = useSelector((state) => state.auth.decode)

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
      <div className="bg-body-secondary nav justify-content-center sticky-top general-nav">
        {decode && decode.role === "admin" && (
          <div className="admin">
            <button
              className="btn btn-outline-warning my-button"
              onClick={handleAdmin}
            >
              Admin{" "}
              <span className="material-symbols-outlined">
                admin_panel_settings
              </span>
            </button>
          </div>
        )}

        <div className="nav-item">
          <Link to="/games" replace>
            <h1 className="h1-home center">re-roll</h1>
          </Link>
        </div>

        {token && (
          <div className="logout-button-container">
            <button
              className="btn btn-outline-warning my-button"
              onClick={handleLogout}
            >
              Exit <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar
