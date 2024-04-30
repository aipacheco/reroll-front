/* eslint-disable react/prop-types */
import "./CardGame.css"

const CardGame = ({image1, name, description, price}) => {
  return (
    <div className="center-flex">
      <div className="card card-game mb-3">
        <img src={image1} className="card-img-top img-fluid" />
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
    </div>
  )
}

export default CardGame
