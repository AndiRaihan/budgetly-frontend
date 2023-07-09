import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleDarkMode } from "../redux/darkModeSlice";

export default function Navbar() {
  const { darkMode } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  function handleSwitch() {
    dispatch(toggleDarkMode());
  }

  return (
    <nav className=" bg-background-light-200 flex justify-between items-center p-4 h-14">
      <h1>Menu</h1>
      <div>
        <ThemeSwitch checked={darkMode.isDarkMode} onClick={handleSwitch} />
        <button className="bg-primary w-36 h-7 rounded-md hover:bg-secondary transition-colors duration-300">
          Register
        </button>
      </div>
    </nav>
  );
}
