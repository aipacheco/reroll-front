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
