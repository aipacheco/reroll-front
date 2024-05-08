const URL = import.meta.env.VITE_BACKEND_URL + "/address"
export const CreateAddress = async (address, token) => {
  try {
    const response = await fetch(`${URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(address),
    })
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    console.log("Error al registrar el usuario", error)
    throw error
  }
}

export const GetAddress = async (token) => {
  try {
    const response = await fetch(`${URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    console.log("Error al obtener la dirección", error)
    throw error
  }
}

export const GetAddressById = async (id, token) => {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    console.log("Error al obtener la dirección", error)
    throw error
  }
}

export const UpdateAddress = async (id, address, token) => {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(address),
    })
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    console.log("Error al actualizar la dirección", error)
    throw error
  }
}
