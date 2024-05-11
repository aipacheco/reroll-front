/* eslint-disable react/prop-types */
import "./SingleGame.css"
import { useState } from "react"
import Carousel from "react-bootstrap/Carousel"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

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
  symbol,
  showButtons,
  handleReserve,
  handleSold,
  status,
}) => {
  const [activeStep, setActiveStep] = useState(0)
  const token = useSelector((state) => state.auth.token)
  const navigate = useNavigate()

  const handleSelect = (selectedIndex) => {
    setActiveStep(selectedIndex)
  }
  const handleLogin = () => {
    navigate("/login")
  }

  return (
    <div className="p-2 mb-5">
      <div className="container-game">
        <div className="card p-1 ">
          <Carousel activeIndex={activeStep} onSelect={handleSelect}>
            {images.map((step) => (
              <Carousel.Item key={step.label}>
                <div style={{ position: "relative" }}>
                  <img
                    className="d-block w-100 carousel-img"
                    src={step.imgPath}
                    alt={step.label}
                  />
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
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          {showButtons && (
            <Card.Body>
              <div className="container d-flex justify-content-around">
                <Button
                  variant="outline-info"
                  onClick={handleReserve}
                  className="my-button"
                >
                  {status !== "Reservado" ? "Reservado" : "Disponible"}

                  <span className="material-symbols-outlined material-button">
                    {status !== "Reservado" ? "priority_high" : ""}
                  </span>
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={handleSold}
                  className="my-button"
                >
                  {status !== "Vendido" ? "Vendido" : "Disponible"}

                  <span className="material-symbols-outlined material-button">
                    {" "}
                    {status === "Vendido" || status === "Reservado"
                      ? ""
                      : "download_done"}
                  </span>
                </Button>
              </div>
            </Card.Body>
          )}

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
              {playersMin === playersMax
                ? playersMin === 1
                  ? `${playersMin} jugador`
                  : `${playersMin} jugadores`
                : `${playersMin} a ${playersMax} jugadores`}
            </Card.Body>

            <Card.Body>
              <Card.Subtitle className="text-dark">Precio: </Card.Subtitle>
              {price}€
            </Card.Body>
            {status === "Vendido" ? (
              <Button variant="danger" className="my-button" disabled>
                Este juego ha sido vendido
              </Button>
            ) : token ? (
              <Button
                variant="warning"
                onClick={handleShop}
                className="my-button"
              >
                {buttonText}
                <span className="material-symbols-outlined material-button">
                  {symbol}
                </span>
              </Button>
            ) : (
              <Button
                variant="warning"
                onClick={handleLogin}
                className="my-button"
              >
                Inicia sesión para comprar este juego
                <span className="material-symbols-outlined material-button">
                  {symbol}
                </span>
              </Button>
            )}
          </Card.Body>
        </div>
      </div>
    </div>
  )
}

export default SingleGame
