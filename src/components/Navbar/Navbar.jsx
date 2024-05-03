import { Link } from "react-router-dom"
import "./Navbar.css"
const Navbar = () => {
  return (
    <>
      <div className="bg-body-secondary nav justify-content-center mt-3 sticky-top general-nav">
        <div className="nav-item">
          <Link to="/" replace>
            <h1 className="h1-home center">
              <span style={{ color: "red" }}>r</span>
              <span style={{ color: "orange" }}>e</span>
              <span style={{ color: "yellow" }}>:</span>
              <span style={{ color: "green" }}>r</span>
              <span style={{ color: "blue" }}>o</span>
              <span style={{ color: "indigo" }}>l</span>
              <span style={{ color: "violet" }}>l</span>
            </h1>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar
