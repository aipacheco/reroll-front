/* eslint-disable react/prop-types */
import "./ButtonCustom.css"
const ButtonCustom = ({ text, handleSubmit, isFormComplete}) => {
  return (
    <div className="center-flex">
      <button
        type="button"
        className="btn btn-outline-warning"
        onClick={handleSubmit}
        disabled={!isFormComplete}
      >
        {text}
      </button>
    </div>
  )
}

export default ButtonCustom
