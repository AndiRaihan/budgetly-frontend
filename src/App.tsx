import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import SideNav from "./components/SideNav";
import { useState } from "react";

function App() {
  const [showNavbar, setShowNavbar] = useState(false);

  const toggleNavBar = () => {
    setShowNavbar(prev => !prev)
  }

  return (
    <BrowserRouter>
      <Navbar toggleSideNav={toggleNavBar}   />
      <SideNav show={showNavbar} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
