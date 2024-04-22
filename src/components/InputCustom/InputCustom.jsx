/* eslint-disable react/prop-types */
import "./InputCustom.css"

const InputCustom = ({ label, type, name, handleChange, buttonText }) => {
  if (type === "file") {
    return (
      <>
        <label className="form-label">{label}</label>
        <label className="btn btn-outline-info m-4">
          {buttonText || "Seleccionar archivo"}
          <input
            type={type}
            name={name}
            className="form-control"
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </label>
      </>
    )
  }

  return (
    <>
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        className="form-control"
        onChange={handleChange}
      ></input>
    </>
  )
}

export default InputCustom
