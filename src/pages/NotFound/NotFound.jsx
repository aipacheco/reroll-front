import { Link, useNavigate } from "react-router-dom"
import AlertCustom from "../../components/AlertCustom/AlertCustom"
import { useEffect } from "react"

const NotFound = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate("/games")
    }, 5000)
  }, [])

  return (
    <>
      <div className="container center-center">
        <h1>Página no encontrada!</h1>

        <AlertCustom
          className="light text-center"
          message={
            <>
              Volver a <Link to="/games">Inicio</Link>
            </>
          }
        />
      </div>
    </>
  )
}

export default NotFound
