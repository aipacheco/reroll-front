/* eslint-disable react/prop-types */
import "./AlertCustom.css"

const AlertCustom = ({ className, message }) => {
  return (
    <div className={`alert alert-${className}`} role="alert">
      {message}
    </div>
  )
}

export default AlertCustom
