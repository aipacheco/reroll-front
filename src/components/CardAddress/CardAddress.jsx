/* eslint-disable react/prop-types */
const CardAddress = ({ name, lastName, city, province, streetAddress }) => {
  return (
    <>
      <div className="address-card">
        <div className="card-body">
          <h5 className="card-title">
            {name} {lastName}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">{streetAddress}</h6>
          <p className="card-text">
            {city} - {province}
          </p>
        </div>
      </div>
    </>
  )
}

export default CardAddress
