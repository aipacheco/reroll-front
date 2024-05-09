/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import "./LinkButton.css"

export const LinkButton = ({ direction, text, icon }) => {
  return (
    <div>
      <div className="center-flex me-5">
        <Link to={`${direction}`}>
          <button id="link-button" className="btn btn-outline-warning my-button">
            {text}
            <span className="material-symbols-outlined">{icon}</span>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default LinkButton
