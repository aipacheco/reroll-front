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
          <div className="container justify-content-around d-flex flex-wrap">
            <LinkButton direction={"/login"} text={"Login"} />
            <LinkButton direction={"/register"} text={"Registrate"} />
          </div>
        </nav>
      ) : (
        <nav className="navbar bg-body-secondary fixed-bottom footer">
          <div className="container justify-content-around d-flex flex-wrap">
            <LinkButton
              customClass="footer-button"
              direction={"/games"}
              text={"Home"}
              icon={"home"}
            />
            <LinkButton
              customClass="footer-button"
              direction={"/newGame"}
              text={"Nuevo juego"}
              icon={"add"}
            />
            <LinkButton
              customClass="footer-button"
              direction={`/user/${decode.username}`}
              text={"Perfil"}
              icon={"person"}
            />
          </div>
        </nav>
      )}
    </>
  )
}

export default Footer
