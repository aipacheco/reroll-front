/* eslint-disable react/prop-types */
import "./InputSearch.css"
import { FaSearch } from "react-icons/fa"

const InputSearch = ({ label, type, name, handleChange, placeholder }) => {
  return (
    <>
      <label className="form-label">{label}</label>
      <div className="input-container input-search">
        <input
          type={type}
          name={name}
          className="form-control"
          onChange={handleChange}
          placeholder={placeholder}
        ></input>
        <FaSearch className="search-icon" />
      </div>
    </>
  )
}

export default InputSearch
