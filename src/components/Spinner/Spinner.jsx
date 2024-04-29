import "./Spinner.css"
import Roll from "../../assets/Roll.svg"

const Spinner = () => {
  return (
    <div className="center-flex">
      {" "}
      <img src={Roll} alt="Cargando..." className="loading-image" />
    </div>
  )
}

export default Spinner
