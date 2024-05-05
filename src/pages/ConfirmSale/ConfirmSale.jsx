import { useSelector } from "react-redux"
import { getSingleGame } from "../../services/gameServices"
import { GetAddressById } from "../../services/addressServices"
import { useEffect, useState } from "react"
import CardGame from "../../components/CardGame/CardGame"
import CardAddress from "../../components/CardAddress/CardAddress"

const ConfirmSale = () => {
  const [item, setItem] = useState({})
  const [address, setAddress] = useState({})

  const addressId = useSelector((state) => state.address.addressId)
  const itemId = useSelector((state) => state.item.itemId)
  const token = useSelector((state) => state.auth.token)

  const fetchAddressAndItem = async () => {
    try {
      const item = await getSingleGame(itemId)
      setItem(item.data)
      const address = await GetAddressById(addressId, token)
      setAddress(address.data)
    } catch (error) {
      console.log("Error fetching address and item:", error)
    }
  }

  useEffect(() => {
    fetchAddressAndItem()
  }, [])

  const { name, price, image1, description } = item
  const { name: addressName, lastName, city, province, streetAddress } = address
  console.log(item, address)

  return (
    <>
      <div className="container mt-3">
        <CardGame
          name={name}
          price={price}
          image1={image1}
          description={description}
          _id={itemId}
        />
        <CardAddress
          name={addressName}
          lastName={lastName}
          city={city}
          province={province}
          streetAddress={streetAddress}
        />
        <div className="container centered">
          <button className="btn btn-outline-danger m-1"> Cancelar</button>
          <button className="btn btn-warning"> Confirmar</button>
        </div>
      </div>
    </>
  )
}

export default ConfirmSale
