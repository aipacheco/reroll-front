/* eslint-disable react/prop-types */
import "./InputFile.css"

const InputFile = ({ label, name, handleChange, buttonText }) => {
  return (
    <>
      <label className="form-label">{label}</label>
      <label className="btn btn-warning m-1 mt-3">
        {buttonText || "Seleccionar archivo"}
        <input
          type={"file"}
          name={name}
          className="form-control"
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </label>
    </>
  )
}

export default InputFile
