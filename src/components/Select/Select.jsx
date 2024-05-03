/* eslint-disable react/prop-types */
import "./Select.css"
import { useEffect, useState } from "react"
import { getCategories } from "../../services/categoryServices"

const Select = ({ onCategoryChange }) => {
  const [category, setCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")

  const allCategories = async () => {
    try {
      const response = await getCategories()
      setCategory(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    allCategories()
  }, [])

  const handleChange = ({ target }) => {
    setSelectedCategory(target.value)
    onCategoryChange(target.value)
  }

  return (
    <div className="input-group mb-3 mt-3">
      <label className="input-group-text">Categoría</label>
      <select
        className="form-select"
        value={selectedCategory}
        onChange={handleChange}
      >
        <option disabled>Elije una opción</option>
        {category.map((item, index) => (
          <option key={index} value={item._id}>
            {item.name.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  )
}
export default Select
