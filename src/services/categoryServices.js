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
