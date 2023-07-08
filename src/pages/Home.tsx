import { useEffect, useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { Link } from "react-router-dom";
import ThemeSwitch from '../components/ThemeSwitch.tsx'
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import { increment } from "../redux/counterSlice.ts";
import { toggleDarkMode } from "../redux/darkModeSlice.ts";

export default function Home() {

  const {counter, darkMode} = useSelector((state: RootState) => state)

  const count = counter.count

  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count])
  

  return (
    <div className={darkMode.isDarkMode ? "dark" : ""}>
      <div className="flex flex-row justify-around w-auto">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button className=" m-2" onClick={() => dispatch(increment())}>
          count is {count}
        </button>
        <button className=" bg-yellow-50 dark:bg-gray-800 text-blue-950 dark:text-yellow-50" onClick={() => dispatch(toggleDarkMode())}>
          Current mode is {darkMode.isDarkMode ? "dark" : "light"}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="flex flex-row mx-auto my-4 justify-around">
        <Link to="/Unknown-Link">
          <Button variant="outlined">Go to a Random Page</Button>
        </Link>
        <ThemeSwitch />
      </div>
    </div>
  );
}
