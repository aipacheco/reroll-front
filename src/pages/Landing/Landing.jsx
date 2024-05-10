import { Link } from "react-router-dom"
import AlertCustom from "../../components/AlertCustom/AlertCustom"
import "./Landing.css"
import { useSelector } from "react-redux"
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom"
import LinkButton from "../../components/LinkButton/LinkButton"
const Landing = () => {
  const token = useSelector((state) => state.auth.token)

  return (
    <div className="container center-flex mt-5">
      <div className="card p-2 text-center">
        <h1>Bienvenid@ a re-roll!</h1>
        <p className="landing-text m-5">
          ¡Bienvenido a nuestra plataforma de compra venta de juegos de mesa
          entre particulares!
          <br />
          <br />
          Sumérgete en un universo lleno de diversión y emoción, donde podrás
          descubrir una amplia variedad de juegos para disfrutar en casa con
          familia y amigos.
          <br />
          <br />
          Desde los clásicos juegos de estrategia hasta las últimas novedades en
          el mundo de los juegos de mesa, aquí encontrarás todo lo que necesitas
          para vivir increíbles aventuras en cada partida.
          <br />
          <br />
          En nuestra comunidad, podrás conectar con otros apasionados de los
          juegos de mesa, comprar ese juego que tanto deseas para añadir a tu
          colección o vender esos juegos que ya no utilizas, dándoles la
          oportunidad de encontrar un nuevo hogar donde sean apreciados y
          disfrutados.
          <br />
          <br />
          Explora nuestro catálogo, sumérgete en la diversión y la creatividad
          que ofrecen los juegos de mesa, y haz de cada reunión un momento
          inolvidable. Únete a nosotros y disfruta de interminables horas de
          entretenimiento, estrategia y diversión con los mejores juegos de
          mesa.
        </p>
        <h5>Tu próxima aventura te espera aquí!</h5>

        <div className="m-5">
          <LinkButton direction={"/games"} text={"Explora nuestros juegos"} />
        </div>
        {!token && (
          <div className="d-flex justify-content-center m-2">
            <AlertCustom
              className={"light text-center me-5"}
              message={
                <>
                  ¿Ya tienes cuenta?{" "}
                  <Link id="register-link" to="/login">
                    Inicia sesión
                  </Link>
                </>
              }
            />
            <AlertCustom
              className={"light text-center"}
              message={
                <>
                  ¿No tienes cuenta?{" "}
                  <Link id="login-link" to="/register">
                    Regístrate
                  </Link>{" "}
                  para acceder.
                </>
              }
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Landing
