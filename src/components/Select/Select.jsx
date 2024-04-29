import { useEffect, useState } from "react"
import { getCategories } from "../../services/categoryServices"

const Select = () => {
  const [category, setCategory] = useState([])

  const allCategories = async () => {
    try {
      const response = await getCategories()
      setCategory(response.data)
    } catch (error) {
        //provisional
      console.log(error)
    }
  }

  useEffect(() => {
    allCategories()
  }, [])

  return (
    <div className="input-group mb-3">
      <label className="input-group-text">Categoría</label>
      <select className="form-select">
        <option disabled>Elije una opción</option>
        {category.map((item, key) => (
            <option key={key} value={item.id}>
                {item.name}
            </option>
        ))}
      </select>
    </div>
  )
}

export default Select
