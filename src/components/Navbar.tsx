import ThemeSwitch from "./ThemeSwitch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleDarkMode } from "../redux/darkModeSlice";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { darkMode } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  function handleSwitch() {
    dispatch(toggleDarkMode());
  }

  return (
    <nav className=" bg-background-light-200 flex justify-between items-center p-4 h-14">
      <h1>Menu</h1>
      <div className="flex flex-row items-center justify-center">
        <div className="p-2">
          <ThemeSwitch checked={darkMode.isDarkMode} onClick={handleSwitch} />
        </div>
          <a href="/login" className=" py-2 px-5 hover:bg-background-light-300 rounded-md">
            <h1>Login</h1>
          </a>
        <a
          href="/register"
          className=" flex items-center justify-center bg-primary-200 w-36 h-7 rounded-md hover:bg-primary-300 transition-all duration-300 focus:ring-4 focus:bg-primary-300 shadow-lg transform active:scale-75 mx-5"
        >
          Register
        </a>
      </div>
    </nav>
  );
}
