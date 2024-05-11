/* eslint-disable react/prop-types */
const CardAddress = ({ name, lastName, city, province, streetAddress }) => {
  return (
    <>
      <div className="container">
        <div className="card-body">
          <h5 className="card-title">
            {name} {lastName}
          </h5>
          <p className="card-subtitle mb-2 text-muted">{streetAddress}</p>
          <p className="card-text">
            {city} - {province}
          </p>
        </div>
      </div>
    </>
  )
}

export default CardAddress
