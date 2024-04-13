import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Contact } from "./pages/Contact";
import { Navbar } from "./components/Navbar";
import { Logout } from "./pages/Logout";
import { Error } from "./pages/Error";

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/service" element={<Service />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
