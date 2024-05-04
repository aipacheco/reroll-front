/* eslint-disable react/prop-types */
import "./SingleGame.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
}) => {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)

  const handleSelect = (selectedIndex) => {
    setActiveStep(selectedIndex)
  }

  const handleAuthor = () => {
    navigate(`/${author}`)
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
          <Card.Title onClick={handleAuthor} style={{ cursor: "pointer" }}>
           <a>{author}</a> 
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{name}</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Card.Text>
            {playersMin} - {playersMax} jugadores
          </Card.Text>
          <Card.Text>{price} €</Card.Text>
          <Button variant="primary">Comprar</Button>
        </Card.Body>
      </div>
    </div>
  )
}

export default SingleGame
