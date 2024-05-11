/* eslint-disable react/prop-types */
import "./ButtonCustom.css"
const ButtonCustom = ({ text, handleSubmit, isFormComplete}) => {
  return (
    <div className="centered">
      <button
        type="button"
        className="btn btn-warning"
        onClick={handleSubmit}
        disabled={!isFormComplete}
      >
        {text}
      </button>
    </div>
  )
}

export default ButtonCustom
