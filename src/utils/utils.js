export const validator = (value, type) => {
  const regexString = /^[a-zA-Z0-9]+$/
  const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

  switch (type) {
    case "username": {
      if (!regexString.test(value)) {
        return `El nombre tiene que estar formado por caracteres correctos (sólo números y letras).`
      }
      //si es menor de 3 letras
      if (value.length < 3) {
        return `El nombre tiene que ser mínimo de 3 letras.`
      }
      //si es mayor de 50 letras
      if (value.length > 50) {
        return `El nombre tiene que ser máximo 50 letras.`
      }
      return ""
    }
    case "password": {
      if (value.length < 8 || value.length > 15) {
        return `La contraseña tiene que ser de mínimo 8 caracteres y máximo 15`
      }
      return ""
    }
    case "email": {
      //para evitar el espacio al principio o al final
      if (!validEmail.test(value.trim())) {
        return "Formato de email inválido"
      }
      if (value.length < 0) {
        return "Tiene que introducir un email."
      }
      return ""
    }
    case "content" :{
      //si es mayor de 240 letras
      if (value.length > 240) {
        return `El contenido tiene que ser máximo 240 caracteres.`
      }
      return ""
    }
    case "description" :{
      //si es mayor de 180 letras
      if (value.length > 180) {
        return `la descripción tiene que ser máximo 180 caracteres.`
      }
      return ""
    }
    default:
      console.log("pues ok")
  }
}
//funcion para comprobar si un state tipo obj está relleno
export const CheckForm = (state) => {
  for (let elemento in state) {
    if (state[elemento] === "") {
      return false
    }
  }
  return true
}

export const checkAllEmpty = (obj) => {
  return Object.values(obj).every((value) => value === "")
}

