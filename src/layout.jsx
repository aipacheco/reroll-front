import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import FormGame from "./pages/FormGame/FormGame"
import Home from "./pages/Home/Home"
import Profile from "./pages/Profile/Profile"
import GameDetail from "./pages/GameDetail/GameDetail"
import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import FormAddress from "./pages/FormAddress/FormAddress"
import ConfirmSale from "./pages/ConfirmSale/ConfirmSale"



export const Layout = () => {
  /*una ruta se compone de una dirección y unos params, por ejemplo en profile le estamos pasando un username, 
  -un param se declara poniendo : y detrás el nombre del param - */

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/newGame" element={<FormGame/>} />
          <Route path="/game/:id" element={<GameDetail/>} />
          <Route path="/address" element={<FormAddress/>} />
          <Route path="/confirm" element={<ConfirmSale/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}
