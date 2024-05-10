const URL = import.meta.env.VITE_BACKEND_URL + "/game"

export const CreateGame = async (data, token) => {
  //cuando hay imágenes de por medio, hay que hacer un formdata
  const formdata = new FormData()
  formdata.append("name", data.name)
  formdata.append("playersMin", data.playersMin)
  formdata.append("playersMax", data.playersMax)
  formdata.append("category", data.category)
  formdata.append("description", data.description)
  formdata.append("price", data.price)
  formdata.append("image1", data.image1)
  formdata.append("image2", data.image2)
  formdata.append("image3", data.image3)
  try {
    const response = await fetch(`${URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    })

    const data = await response.json()
    // console.log(data)
    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getSingleGame = async (id) => {
  try {
    const response = await fetch(`${URL}/${id}`)
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const GetGames = async () => {
  try {
    const response = await fetch(`${URL}`)
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const UpdateGame = async (id, data, token) => {
  const formdata = new FormData()
  formdata.append("name", data.name)
  formdata.append("playersMin", data.playersMin)
  formdata.append("playersMax", data.playersMax)
  formdata.append("category", data.category)
  formdata.append("description", data.description)
  formdata.append("price", data.price)
  formdata.append("image1", data.image1)
  formdata.append("image2", data.image2)
  formdata.append("image3", data.image3)
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    })
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const DeleteGame = async (id, reason, token) => {
  console.log(reason)
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reason),
    })
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}
