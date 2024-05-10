const URL = import.meta.env.VITE_BACKEND_URL + "/user"

//el param que le mandamos desde profile.jsx(el nombre de usuario)
export const GetProfile = async (username) => {
  try {
    const response = await fetch(`${URL}/${username}`, {
      method: "GET",
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

export const UpdateProfile = async (username, profile, token) => {
  //cuando hay imágenes de por medio, hay que hacer un formdata
  const formdata = new FormData()
  formdata.append("avatar", profile.avatar)
  formdata.append("description", profile.description)
  try {
    const response = await fetch(`${URL}/${username}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
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

export const getAllUsers = async (token) => {
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
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

export const deleteUser = async (id, token) => {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
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
