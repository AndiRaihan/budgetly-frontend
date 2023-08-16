import { Link } from "react-router-dom";
import budgetIcon from "../assets/budget-icon.svg";
import stats from "../assets/stats.svg";
import CurrentPage from "../utils/CurrentPage";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TrackingSvg from "../assets/TrackingSvg";

function SideNav({ show, currentTab }: SideNavProps) {
  const { darkMode } = useSelector((state: RootState) => state);
  return (
    <nav
      className={`top-18 left-0 h-full w-52 fixed  
      ${
        darkMode.isDarkMode
          ? "bg-background-dark-300 bg-opacity-90 dark"
          : "bg-background-light-300"
      }
      ${show ? "translate-x-0" : "-translate-x-full"} ease-in-out duration-200`}
    >
      <ul className="flex flex-col items-center py-20 h-full">
        <li className=" w-11/12 h-10 flex items-center justify-center m-1">
          <Link
            to="/tracking"
            className={`${
              currentTab === CurrentPage.Tracking
                ? "hover:bg-primary-300 duration-300 dark:hover:bg-[#31484d]"
                : "hover:bg-background-light-400 duration-300 dark:hover:bg-[#32484F]"
            } rounded-md w-8 flex-1 flex flex-grow items-center text-center h-10 dark:text-background-dark-200 dark:brightness-125 ${
              currentTab === CurrentPage.Tracking &&
              "bg-primary-200 dark:bg-[#2C3E43]"
            }`}
          >
            <TrackingSvg className="w-5 mx-2" isDark={darkMode.isDarkMode} />
            Tracking
          </Link>
        </li>
        <li className=" w-11/12 flex items-center justify-center m-1 h-10">
          <Link
            to="/budgeting"
            className={`${
              currentTab === CurrentPage.Budgeting
                ? "hover:bg-primary-300 duration-300 dark:hover:bg-[#31484d]"
                : "hover:bg-background-light-400 duration-300 dark:hover:bg-[#32484F]"
            } rounded-md w-8 h-10 flex-1 flex flex-grow items-center text-center dark:text-background-dark-200 dark:brightness-125 ${
              currentTab === CurrentPage.Budgeting &&
              "bg-primary-200 dark:bg-[#2C3E43]"
            }`}
          >
            <img src={budgetIcon} className="w-5 mx-2"></img>
            Budgeting
          </Link>
        </li>
        <li className=" w-11/12 flex items-center justify-center m-1">
          <Link
            to="/stats"
            className={`${
              currentTab === CurrentPage.Stats
                ? "hover:bg-primary-300 duration-300 dark:hover:bg-[#31484d]"
                : "hover:bg-background-light-400 duration-300 dark:hover:bg-[#32484F]"
            } rounded-md w-8 h-10 flex-1 flex flex-grow items-center text-center dark:text-background-dark-200 dark:brightness-125 ${
              currentTab === CurrentPage.Stats &&
              "bg-primary-200 dark:bg-[#2C3E43]"
            }`}
          >
            <img src={stats} className="w-5 mx-2"></img>
            Stats
          </Link>
        </li>
      </ul>
    </nav>
  );
}

type SideNavProps = {
  show: boolean;
  currentTab: CurrentPage;
};

export default SideNav;
