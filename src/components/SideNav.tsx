import { Link } from "react-router-dom";
import budgetIcon from "../assets/budget-icon.svg";
import stats from "../assets/stats.svg";
import tracking from "../assets/tracking.svg";

function SideNav({ show }: SideNavProps) {
  return (
    <nav
      className={` top-18 left-0 h-full w-52 fixed bg-background-light-300 ${
        show ? " -translate-x-full" : "translate-x-0"
      } ease-in-out duration-200`}
    >
      <ul className="flex flex-col items-center py-20 h-full">
        <li className=" w-11/12 flex items-center justify-center m-2">
          <Link
            to="/"
            className=" hover:bg-background-light-400 rounded-md w-8 flex-1 flex flex-grow text-center"
          >
            <img src={tracking} className="w-5 mx-2"></img>
            Tracking
          </Link>
        </li>
        <li className=" w-11/12 flex items-center justify-center m-2">
          <Link
            to="/budgeting"
            className=" hover:bg-background-light-400 rounded-md w-8 flex-1 flex flex-grow text-center"
          >
            <img src={budgetIcon} className="w-5 mx-2"></img>
            Budgeting
          </Link>
        </li>
        <li className=" w-11/12 flex items-center justify-center m-2">
          <Link
            to="/stats"
            className=" hover:bg-background-light-400 rounded-md w-8 flex-1 flex flex-grow text-center"
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
};

export default SideNav;
