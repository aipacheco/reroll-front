const URL = import.meta.env.VITE_BACKEND_URL + "/category"

export const getCategories = async () => {
  try {
    const response = await fetch(`${URL}`, {
      method: "GET",
    })
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    console.log("Error al obtener las categorías", error)
    throw error
  }
}

export const createCategory = async (category, token) => {
  try {
    const response = await fetch(`${URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    })
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    console.log("Error al crear la categoría", error)
    throw error
  }
}
