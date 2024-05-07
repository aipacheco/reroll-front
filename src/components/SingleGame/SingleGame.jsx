/* eslint-disable react/prop-types */
import "./SingleGame.css"
import { useState } from "react"
import Carousel from "react-bootstrap/Carousel"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

const SingleGame = ({
  images,
  name,
  description,
  playersMin,
  playersMax,
  price,
  author,
  handleAuthor,
  handleShop,
  buttonText,
  symbol
}) => {
  const [activeStep, setActiveStep] = useState(0)

  const handleSelect = (selectedIndex) => {
    setActiveStep(selectedIndex)
  }

  return (
    <div className="container-game">
      <div className="card p-3">
        <Carousel activeIndex={activeStep} onSelect={handleSelect}>
          {images.map((step) => (
            <Carousel.Item key={step.label}>
              <img
                className="d-block w-100 carousel-img"
                src={step.imgPath}
                alt={step.label}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <Card.Body>
          <Card.Subtitle onClick={handleAuthor} style={{ cursor: "pointer" }}>
            <a>{author}</a>
          </Card.Subtitle>
          <Card.Title className="mb-2 mt-2 text-dark">{name}</Card.Title>
          <Card.Body>{description}</Card.Body>
          <Card.Body>
            <Card.Subtitle className="text-dark">
              Número de jugadores:{" "}
            </Card.Subtitle>
            {playersMin} a {playersMax} jugadores
          </Card.Body>
          <Card.Body>
            <Card.Subtitle className="text-dark">Precio: </Card.Subtitle>
            {price} €
          </Card.Body>
          <Button variant="warning" onClick={handleShop} className="my-button">
            {buttonText}
            <span className="material-symbols-outlined">{symbol}</span>
          </Button>
        </Card.Body>
      </div>
    </div>
  )
}

export default SingleGame
