export const validator = (value, type) => {
  const regexString = /^[a-zA-Z0-9]+$/
  const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
  const regexName = /^[a-zA-Z0-9 áéíóúÁÉÍÓÚ]+$/

  switch (type) {
    case "username":
{
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
    case "name": {
      if (!regexName.test(value)) {
        return `El nombre tiene que estar formado por caracteres correctos (sólo números y letras).`
      }
      if (value.length < 3) {
        return `El nombre tiene que ser mínimo de 3 letras.`
      }
      if (value.length > 50) {
        return `El nombre tiene que ser máximo 50 letras.`
      }
      return ""
    }
    case "lastName": {
      if (!regexName.test(value)) {
        return `El nombre tiene que estar formado por caracteres correctos (sólo números y letras).`
      }
      if (value.length < 3) {
        return `El nombre tiene que ser mínimo de 3 letras.`
      }
      if (value.length > 50) {
        return `El nombre tiene que ser máximo 50 letras.`
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
    case "price": {
      if (value < 0) {
        return "El precio no puede ser negativo."
      }
      return ""
    }
    case "cp": {
      if (value < 0) {
        return "El código postal deben ser números positivos."
      }
      if (value.toString().length !== 5) {
        return "El código postal debe tener 5 dígitos."
      }
      return ""
    }
    case "playersMin": {
      if (value < 1) {
        return "El número mínimo de jugadores no puede ser inferior a 1."
      }
      return ""
    }
    case "playersMax": {
      if (value < 1) {
        return "El número máximo de jugadores no puede ser inferior a 1."
      }
      return ""
    }
    case "city": {
      if (!regexName.test(value)) {
        return `La ciudad tiene que estar formada por caracteres correctos (sólo números y letras).`
      }
      if (value.length < 3) {
        return `La ciudad tiene que ser mínimo de 3 letras.`
      }
      if (value.length > 50) {
        return `La ciudadtiene que ser máximo 50 letras.`
      }
      return ""
    }
    case "streetAddress": {
      if (value.length < 3) {
        return `La dirección tiene que ser mínimo de 3 letras.`
      }
      if (value.length > 50) {
        return `La dirección tiene que ser máximo 50 letras.`
      }
      return ""
    }
    case "province": {
      if (value.length < 3) {
        return `La dirección tiene que ser mínimo de 3 letras.`
      }
      if (value.length > 50) {
        return `La dirección tiene que ser máximo 50 letras.`
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

//funcion para comprobar si un state tipo obj está vacio
export const checkAllEmpty = (obj) => {
  return Object.values(obj).every((value) => value === "")
}

