import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
// import Navbar from "./components/Navbar/Navbar"



export const Layout = () => {
  /*una ruta se compone de una dirección y unos params, por ejemplo en profile le estamos pasando un username, 
  -un param se declara poniendo : y detrás el nombre del param - */

  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
