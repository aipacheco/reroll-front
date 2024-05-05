import LinkButton from "../LinkButton/LinkButton"
import { useSelector } from "react-redux"
import "./Footer.css"

const Footer = () => {
  const token = useSelector((state) => state.auth.token)
  const decode = useSelector((state) => state.auth.decode)


  return (
    <>
      {!token ? (
        <nav className="navbar bg-body-secondary fixed-bottom footer">
          <div className="container justify-content-around">
            <LinkButton direction={"/login"} text={"Login"} />

            <LinkButton direction={"/register"} text={"Registrate"} />
          </div>
        </nav>
      ): (
        <nav className="navbar bg-body-secondary fixed-bottom footer mt-5">
          <div className="container justify-content-around">
            <LinkButton direction={"/"} text={"Home"} />
            <LinkButton direction={"/newGame"} text={"Anunciar nuevo juego"} />
            <LinkButton direction={`/${decode.username}`} text={"Perfil"} />
          </div>
        </nav>
      )}
    </>
  )
}

export default Footer
