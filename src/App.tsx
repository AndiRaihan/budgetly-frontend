import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import SideNav from "./components/SideNav";
import { useState } from "react";
import CurrentPage from "./utils/CurrentPage";

function App() {
  const [showNavbar, setShowNavbar] = useState(false);

  const [currentTab, setCurrentTab] = useState(CurrentPage.Tracking);

  const toggleNavBar = () => {
    setShowNavbar((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <Navbar toggleSideNav={toggleNavBar} />
      <SideNav show={showNavbar} currentTab={currentTab} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              translate={showNavbar}
              changeCurrentPage={(CurrentPage: CurrentPage) =>
                setCurrentTab(CurrentPage)
              }
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
