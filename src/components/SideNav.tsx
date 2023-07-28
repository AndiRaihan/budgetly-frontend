import { Link, useLocation } from "react-router-dom";
import budgetIcon from "../assets/budget-icon.svg";
import stats from "../assets/stats.svg";
import tracking from "../assets/tracking.svg";
import CurrentPage from "../utils/CurrentPage";
import { useEffect } from "react";

function SideNav({ show, currentTab }: SideNavProps) {
  return (
    <nav
      className={` top-18 left-0 h-full w-52 fixed bg-background-light-300 ${
        show ?  "translate-x-0" : "-translate-x-full"
      } ease-in-out duration-200`}
    >
      <ul className="flex flex-col items-center py-20 h-full">
        <li className=" w-11/12 h-10 flex items-center justify-center m-1">
          <Link
            to="/tracking"
            className={`${
              currentTab === CurrentPage.Tracking
                ? "hover:bg-primary-300 duration-300"
                : "hover:bg-background-light-400"
            } rounded-md w-8 flex-1 flex flex-grow items-center text-center h-10 ${
              currentTab === CurrentPage.Tracking && "bg-primary-200"
            }`}
          >
            <img src={tracking} className="w-5 mx-2"></img>
            Tracking
          </Link>
        </li>
        <li className=" w-11/12 flex items-center justify-center m-1 h-10">
          <Link
            to="/budgeting"
            className={`${
              currentTab === CurrentPage.Budgeting
                ? "hover:bg-primary-300 duration-300"
                : "hover:bg-background-light-400"
            } rounded-md w-8 h-10 flex-1 flex flex-grow items-center text-center ${
              currentTab === CurrentPage.Budgeting && "bg-primary-200"
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
                ? "hover:bg-primary-300 duration-300"
                : "hover:bg-background-light-400"
            } rounded-md w-8 h-10 flex-1 flex flex-grow items-center text-center ${
              currentTab === CurrentPage.Stats && "bg-primary-200"
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
