/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import "./CardGame.css"

const CardGame = ({image1, name, description, price, _id}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/game/${_id}`)
  }
  return (
    
      <div className="card card-game m-1 clickable"onClick={handleClick}>
        <img src={image1} className="card-img-top game-img" />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">
          {description}
          </p>
          <p className="card-text">
          {price}€
          </p>
        </div>
      </div>
 
  )
}

export default CardGame
