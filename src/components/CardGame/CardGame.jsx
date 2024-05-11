/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import "./CardGame.css"

const CardGame = ({ image1, name, description, price, _id, status }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/game/${_id}`)
  }
  return (
    <div className="card card-game m-1 clickable" onClick={handleClick}>
      <img src={image1} className="card-img-top game-img" />
      <span
        className={
          status === "Vendido"
            ? "status-comprado"
            : status === "Reservado"
            ? "status-reservado"
            : "status-disponible"
        }
      >
        {status}
      </span>
      <div className="card-body m-2">
        <h5 className="card-title">{name}</h5>
        <p className="card-text mb-3">{description}</p>
        <div className="price-text">
          <p> {price}€</p>
        </div>
        <div className="more">
          <p className="text-warning">Ver más...</p>
        </div>
      </div>
    </div>
  )
}

export default CardGame
