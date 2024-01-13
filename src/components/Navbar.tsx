import ThemeSwitch from "./ThemeSwitch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleDarkMode } from "../redux/darkModeSlice";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import MenuSvg from "../assets/MenuSvg";
import { clearId, clearToken } from "../redux/AccountSlice";

export default function Navbar({ toggleSideNav, setNavbar }: NavbarProps) {
  const { darkMode, account } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const loggedIn = account.token !== "" && account.id !== "";

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/register" || location.pathname === "/login") {
      setNavbar(false);
    } else {
      setNavbar(true);
    }
  }, [location.pathname]);

  function handleSwitch() {
    dispatch(toggleDarkMode());
  }

  let isLoggedIn = account.token !== "" && account.id !== "";

  return (
    <nav
      className={` flex justify-between items-center p-4 h-14 fixed w-full z-50
        ${
          darkMode.isDarkMode
            ? "bg-background-dark-300 dark"
            : "bg-background-light-200"
        }`}
    >
      <div className="flex items-center justify-center">
        {loggedIn && (
          <button
            className="flex items-center justify-center h-8 w-14 hover:bg-background-light-300 rounded-md dark:hover:bg-background-dark-200 dark:hover:bg-opacity-20"
            onClick={toggleSideNav}
          >
            <MenuSvg className="h-5" isDark={darkMode.isDarkMode} />
          </button>
        )}
        <Logo />
      </div>
      <ul className="flex flex-row items-center justify-center">
        <li className="p-2">
          <ThemeSwitch checked={darkMode.isDarkMode} onClick={handleSwitch} />
        </li>
        {!isLoggedIn && (
          <li className=" h-8 w-20 hover:bg-background-light-300 dark:hover:bg-background-dark-200 dark:hover:bg-opacity-20 rounded-md flex items-center justify-center">
            <Link
              className=" flex-1 flex-grow dark:text-background-dark-200 brightness-125"
              to="/login"
            >
              <h1 className=" text-center">Login</h1>
            </Link>
          </li>
        )}
        {!isLoggedIn && (
          <li
            className={`flex items-center justify-center bg-primary-200 w-36 h-7 rounded-md hover:bg-primary-300 transition-all duration-300 focus:ring-4
             focus:bg-primary-300 shadow-lg transform active:scale-75 mx-5 text-white dark:text-background-dark-300 dark:bg-background-dark-200 dark:brightness-125 dark:hover:bg-opacity-50`}
          >
            <Link className={`flex-1 flex-grow text-center  `} to="/register">
              Register
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <button
            className={`flex items-center justify-center bg-primary-200 w-36 h-7 rounded-md hover:bg-primary-300 transition-all duration-300 focus:ring-4
             focus:bg-primary-300 shadow-lg transform active:scale-75 mx-5 text-white dark:text-background-dark-300 dark:bg-background-dark-200 dark:brightness-125 dark:hover:bg-opacity-50`}
            onClick={() => {
              dispatch(clearToken());
              dispatch(clearId());
              window.location.reload();
            }}
          >
            <span className="flex-1 flex-grow text-center">Logout</span>
          </button>
        )}
      </ul>
    </nav>
  );
}

export type NavbarProps = {
  toggleSideNav: () => void;
  setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
};
