import { useState } from "react";
import { RootState } from "../redux/store";
import CurrentPage from "../utils/CurrentPage";
import { useSelector } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Period from "../utils/Period";
import PieChart from "../components/PieChart";
import BudgetingBar from "../components/budgeting/BudgetingBar";
import CustomSwitch from "../components/CustomSwitch";
import budgetingData from "../utils/BudgetingData";
export default function Stats({ translate, changeCurrentPage }: PageProps) {
  changeCurrentPage(CurrentPage.Stats);

  const [isIncome, setIsIncome] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [period, setPeriod] = useState(Period.Daily);
  const [isPercentage, setIsPercentage] = useState(false);
  const [stats, setStats] = useState(budgetingData);

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
  ];

  const DropDownItem: any = periods.map((periodsItem) => (
    <li
      className={`${
        periodsItem === period
          ? "bg-primary-200 hover:bg-primary-100 text-background-light-100"
          : "hover:bg-background-light-200 text-black"
      } px-4 py-2 hover:cursor-pointer`}
      key={periodsItem}
      onClick={() => setPeriod(periodsItem)}
    >
      {periodsItem}
    </li>
  ));

  return (
    <div
      className={`bg-background-light-100 min-h-screen flex flex-col pt-20 items-start px-16
          ${darkMode.isDarkMode ? "dark" : ""} ${
        translate
          ? "translate-x-52 w-[calc(100vw-13rem)]"
          : " translate-x-0 w-screen"
      } transition-all ease-in-out duration-200 pb-20`}
    >
      <div className="flex justify-between items-end p-1 ml-5 mb-3 w-11/12">
        <div>
          <span className="text-lg">Income</span>
          <CustomSwitch
            checked={isIncome}
            onChange={() => setIsIncome((prev) => !prev)}
          />
          <span className="text-lg">Expenses</span>
        </div>
        <div className="relative z-50">
          <button
            className="flex items-center justify-center rounded-2xl text-3xl z-20 bg-background-light-400 py-1 px-5 w-44 text-background-light-100"
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
            className={`transition-all duration-300 ${
              isDropdownOpen ? "max-h-60" : "max-h-0"
            } absolute top-3 left-0 bg-background-light-300 -z-50 rounded-2xl shadow w-44 overflow-hidden`}
          >
            <ul className="pb-2 pt-8 ">{DropDownItem}</ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <PieChart items={data} />
      </div>
      <div className="flex flex-row-reverse w-11/12 my-5">
        <div>
          <span className="text-xl">$</span>
          <CustomSwitch
            checked={isPercentage}
            onChange={() => setIsPercentage((prev) => !prev)}
          />
          <span className="text-xl">%</span>
        </div>
      </div>
      <BudgetingBar
        budgetingData={stats[0].budgetingData}
        current={stats[0].current}
        showPercent={stats[0].showPercent}
      />
      <BudgetingBar
        budgetingData={stats[1].budgetingData}
        current={stats[1].current}
        showPercent={stats[1].showPercent}
      />
      <BudgetingBar
        budgetingData={stats[2].budgetingData}
        current={stats[2].current}
        showPercent={stats[2].showPercent}
      />
      <BudgetingBar
        budgetingData={stats[3].budgetingData}
        current={stats[3].current}
        showPercent={stats[3].showPercent}
      />
    </div>
  );
}

export type PageProps = {
  translate: boolean;
  changeCurrentPage: (currentTab: CurrentPage) => void;
};
