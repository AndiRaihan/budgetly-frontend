import ThemeSwitch from "./ThemeSwitch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleDarkMode } from "../redux/darkModeSlice";
import Logo from "./Logo";

export default function Navbar() {
  const { darkMode } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  function handleSwitch() {
    dispatch(toggleDarkMode());
  }

  return (
    <nav className=" bg-background-light-200 flex justify-between items-center p-4 h-14">
      <Logo />
      <ul className="flex flex-row items-center justify-center">
        <li className="p-2">
          <ThemeSwitch checked={darkMode.isDarkMode} onClick={handleSwitch} />
        </li>
        <li className=" h-8 w-20 hover:bg-background-light-300 rounded-md flex items-center justify-center">
          <a className=" flex-1 flex-grow" href="/login">
            <h1 className=" text-center">Login</h1>
          </a>
        </li>
        <li className=" flex items-center justify-center bg-primary-200 w-36 h-7 rounded-md hover:bg-primary-300 transition-all duration-300 focus:ring-4 focus:bg-primary-300 shadow-lg transform active:scale-75 mx-5">
          <a href="/register">Register</a>
        </li>
      </ul>
    </nav>
  );
}
