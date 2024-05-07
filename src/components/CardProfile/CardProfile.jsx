/* eslint-disable react/prop-types */
import "./CardProfile.css"

const CardProfile = ({ avatar, username, description, edit, handleModal, handleAddress }) => {
  return (
    <div className="card">
      <div className="row g-0">
        <div className="col-md-4 center-flex mt-3 mb-3">
          <img src={avatar} className="profile-img img-fluid" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <div className="center-column">
              <h4 className="card-title">{username}</h4>
              <p className="card-text">{description}</p>
            </div>
            {edit && (
              <div className="d-flex justify-content-end p-1">
                <button className="btn btn-warning me-2 my-button" onClick={handleAddress}>
                  Direcciones
                  <span className="material-symbols-outlined">dns</span>
                </button>
                <button className="btn btn-warning my-button" onClick={handleModal}>
                  Editar
                  <span className="material-symbols-outlined">edit_note</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardProfile
