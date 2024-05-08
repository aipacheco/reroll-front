/* eslint-disable react/prop-types */
import "./SelectProvince.css"
import { useState } from "react"

const SelectProvince = ({ onProvinceChange , value}) => {
  const provinces = [
    "Álava",
    "Albacete",
    "Alicante",
    "Almería",
    "Asturias",
    "Ávila",
    "Badajoz",
    "Barcelona",
    "Burgos",
    "Cáceres",
    "Cádiz",
    "Cantabria",
    "Castellón",
    "Ciudad Real",
    "Córdoba",
    "Cuenca",
    "Gerona",
    "Granada",
    "Guadalajara",
    "Guipúzcoa",
    "Huelva",
    "Huesca",
    "Islas Baleares",
    "Jaén",
    "La Coruña",
    "La Rioja",
    "Las Palmas",
    "León",
    "Lérida",
    "Lugo",
    "Madrid",
    "Málaga",
    "Murcia",
    "Navarra",
    "Orense",
    "Palencia",
    "Pontevedra",
    "Salamanca",
    "Santa Cruz de Tenerife",
    "Segovia",
    "Sevilla",
    "Soria",
    "Tarragona",
    "Teruel",
    "Toledo",
    "Valencia",
    "Valladolid",
    "Vizcaya",
    "Zamora",
    "Zaragoza",
  ]
  const [selectedProvince, setSelectedProvince] = useState("")

  const handleChange = ({target}) => {
    setSelectedProvince(target.value)
    onProvinceChange({
      target: {
        name: "province",
        value: target.value,
      },
    })
  }

  return (
    <div className="input-group mb-3 mt-3">
      <label className="input-group-text">Provincia</label>
      <select
        className="form-select"
        value={selectedProvince}
        onChange={handleChange}
      >
        <option disabled>Elije una opción</option>
        {provinces.map((province, index) => (
          <option key={index} value={province}>
            {province.charAt(0).toUpperCase() + province.slice(1).toLowerCase()}
          </option>
        ))}
      </select>
    </div>
  )
}
export default SelectProvince
