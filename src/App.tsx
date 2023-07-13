import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import SideNav from "./components/SideNav";
import { useState } from "react";
import CurrentPage from "./utils/CurrentPage";
import Register from "./pages/Register";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const [currentTab, setCurrentTab] = useState(CurrentPage.Tracking);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <Navbar toggleSideNav={toggleSidebar} />
      <SideNav show={showSidebar} currentTab={currentTab} />
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
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
