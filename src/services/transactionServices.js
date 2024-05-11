const URL = import.meta.env.VITE_BACKEND_URL + "/transaction"

export const CreateTransaction = async (game, address, token) => {
  const gameObj = {
    game: game,
    address: address,
  }
  try {
    const response = await fetch(`${URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(gameObj),
    })
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    console.log("Error en la transacción", error)
    throw error
  }
}
