/* eslint-disable react/prop-types */
import "./CardProfile.css"

const CardProfile = ({avatar, username, description}) => {
  return (
    <div className="card mb-3">
    <div className="row g-0">
      <div className="col-md-4">
        <img src={avatar} className="profile-img img-fluid rounded-start" />
      </div>
      <div className="col-md-8">
        <div className="card-body center-flex">
          <h4 className="card-title">{username}</h4>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CardProfile
