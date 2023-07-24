import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import SideNav from "./components/SideNav";
import { useEffect, useState } from "react";
import CurrentPage from "./utils/CurrentPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Stats from "./pages/Stats";
import Budgeting from "./pages/Budgeting";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const [currentTab, setCurrentTab] = useState(CurrentPage.Tracking);

  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    setShowSidebar(false);
  }, [showNavbar]);

  useEffect(() => {
    const handlePopstate = () => {
      if (window.location.pathname === "/register" || window.location.pathname === "/login") {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
    };
  
    window.addEventListener("popstate", handlePopstate);
  
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <BrowserRouter>
      {showNavbar && <Navbar toggleSideNav={toggleSidebar} setNavbar={setShowNavbar} />}
      {showNavbar && <SideNav show={showSidebar} currentTab={currentTab} />}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              translate={showSidebar}
              changeCurrentPage={(CurrentPage: CurrentPage) =>
                setCurrentTab(CurrentPage)
              }
            />
          }
        />
        <Route
          path="/stats"
          element={
            <Stats
              translate={showSidebar}
              changeCurrentPage={(CurrentPage: CurrentPage) =>
                setCurrentTab(CurrentPage)
              }
            />
          }
        />
        <Route
          path="/budgeting"
          element={
            <Budgeting
              translate={showSidebar}
              changeCurrentPage={(CurrentPage: CurrentPage) =>
                setCurrentTab(CurrentPage)
              }
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
