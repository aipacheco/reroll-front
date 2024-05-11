/* eslint-disable react/prop-types */
import "./InputCustom.css"

const InputCustom = ({ label, type, name, handleChange, placeholder, value }) => {
  return (
    <>
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        className="form-control"
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
      ></input>
    </>
  )
}

export default InputCustom
