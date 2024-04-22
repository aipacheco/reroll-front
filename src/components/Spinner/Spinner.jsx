import "./Spinner.css"
import Dice from "../../assets/dice.svg"

const Spinner = () => {
  return (
    <div className="center-flex">
      {" "}
      <img src={Dice} alt="Cargando..." className="loading-image" />
    </div>
  )
}

export default Spinner
