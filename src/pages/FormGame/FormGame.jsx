import InputCustom from "../../components/InputCustom/InputCustom"
import Select from "../../components/Select/Select"

const FormGame = () => {
  return (
    <div className="container">
      <h2 className="center-flex">
        Introduce los datos del juego que quieres vender
      </h2>

      <InputCustom />
      <Select />
    </div>
  )
}

export default FormGame
