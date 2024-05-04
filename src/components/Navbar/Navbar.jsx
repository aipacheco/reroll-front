import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css"
import { useDispatch, useSelector } from "react-redux"
import { clearAuthToken } from "../../redux/authSlice"

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)

  const handleLogout = () => {
    dispatch(clearAuthToken())
    navigate("/login", { replace: true })
  }

  return (
    <>
      <div className="bg-body-secondary nav justify-content-center sticky-top general-nav">
        <div className="nav-item">
          <Link to="/" replace>
            <h1 className="h1-home center">re-roll</h1>
          </Link>
        </div>

        {token && (
          <div className="logout-button-container">
            <button className="btn btn-warning material-symbols-outlined"onClick={handleLogout}>
              logout
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar
