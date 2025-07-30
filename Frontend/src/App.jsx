import Navbar from "./Components/Navbar"
import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import logo from "./assets/logo.png"
import Hero from "./Components/Hero"
import About from "./Components/About"

function App() {

  return (
    <>
      <div className="w-screen h-screen overflow-x-hidden">
        <Navbar />
        <Hero />
        <About />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  )
}

export default App
