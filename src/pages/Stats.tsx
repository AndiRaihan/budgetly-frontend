import { useState } from "react";
import { RootState } from "../redux/store";
import CurrentPage from "../utils/CurrentPage";
import { useSelector } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Period from "../utils/Period";
import PieChart from "../components/PieChart";
import CustomSwitch from "../components/CustomSwitch";
import StatsBar from "../components/stats/StatsBar";
import { nanoid } from "nanoid";
export default function Stats({ translate, changeCurrentPage }: PageProps) {
  changeCurrentPage(CurrentPage.Stats);

  const [isIncome, setIsIncome] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [period, setPeriod] = useState(Period.Daily);

  const { darkMode } = useSelector((state: RootState) => state);

  const periods = Object.values(Period);

  const data = [
    {
      label: "Buku",
      y: 20,
    },
    {
      label: "Pensil",
      y: 15,
    },
    {
      label: "Penghapus",
      y: 50,
    },
    {
      label: "Penggaris",
      y: 30,
    },
    {
      label: "correction tape",
      y: 20,
    },
  ];

  const sum = data.reduce((acc, curr) => acc + curr.y, 0);

  const statsBar = data.map((dataItem) => (
    <StatsBar
      category={dataItem.label}
      amount={dataItem.y}
      total={sum}
      key={nanoid()}
    />
  ));

  const DropDownItem: any = periods.map((periodsItem) => (
    <li
      className={`
      ${
        periodsItem === period
          ? "bg-primary-200 dark:bg-background-dark-200 dark:opacity-75 dark:hover:opacity-100 hover:bg-primary-100 text-background-light-100"
          : "hover:bg-background-light-200 dark:hover:bg-background-dark-200 dark:hover:text-background-dark-400 text-black dark:bg-background-dark-350 dark:text-background-dark-200"
      } 
      px-4 py-2 hover:cursor-pointer`}
      key={periodsItem}
      onClick={() => setPeriod(periodsItem)}
    >
      {periodsItem}
    </li>
  ));

  return (
    <div
      className={`
      ${
        darkMode.isDarkMode
          ? "bg-background-dark-400 dark"
          : "bg-background-light-100"
      }
      min-h-screen flex flex-col pt-20 items-start px-16
       ${
         translate
           ? "translate-x-52 w-[calc(100vw-13rem)]"
           : " translate-x-0 w-screen"
       } transition-all ease-in-out duration-200 pb-20`}
    >
      <div className="flex flex-col p-1 ml-5 mb-3 w-11/12 md:justify-between md:flex-row ">
        <div>
          <span
            className={`text-lg ${
              darkMode.isDarkMode ? "text-background-dark-200" : ""
            } `}
          >
            Income
          </span>
          <CustomSwitch
            checked={isIncome}
            onChange={() => setIsIncome((prev) => !prev)}
          />
          <span
            className={`text-lg ${
              darkMode.isDarkMode ? "text-background-dark-200" : ""
            } `}
          >
            Expenses
          </span>
        </div>
        <div className="relative z-50">
          <button
            className={`flex items-center justify-center text-2xl rounded-2xl md:text-3xl z-20 py-1 px-5 md:w-44 text-background-light-100 ${
              darkMode.isDarkMode
                ? "bg-background-dark-300"
                : "bg-background-light-400"
            }`}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            {period}
            <div
              className={`${
                isDropdownOpen && "rotate-180"
              } transition-all duration-300`}
            >
              <ArrowDropDownIcon fontSize="large" />
            </div>
          </button>

          <div
            className={`
            ${
              darkMode.isDarkMode
                ? "bg-background-dark-350"
                : "bg-background-light-300"
            }
            transition-all duration-300 ${
              isDropdownOpen ? "max-h-60" : "max-h-0"
            } absolute top-2 left-0 -z-50 rounded-2xl shadow w-44 overflow-hidden`}
          >
            <ul className="pb-2 pt-8 ">{DropDownItem}</ul>
          </div>
        </div>
      </div>
      <div className={`flex justify-center w-full items-center mb-6`}>
        <PieChart items={data} />
      </div>

      {statsBar}
    </div>
  );
}

export type PageProps = {
  translate: boolean;
  changeCurrentPage: (currentTab: CurrentPage) => void;
};
