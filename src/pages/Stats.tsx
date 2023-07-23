import { useEffect, useState } from "react";
import { RootState } from "../redux/store";
import CurrentPage from "../utils/CurrentPage";
import { useSelector } from "react-redux";
import { Switch } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Period from "../utils/Period";

export default function Stats({ translate, changeCurrentPage }: PageProps) {
  changeCurrentPage(CurrentPage.Stats);

  const [isIncome, setIsIncome] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [period, setPeriod] = useState(Period.Daily);

  const { darkMode } = useSelector((state: RootState) => state);

  const periods = Object.values(Period);

  const DropDownItem: any = periods.map((periodsItem) => (
    <li
      className={`${
        periodsItem === period
          ? "bg-primary-200 hover:bg-primary-100 text-background-light-100"
          : "hover:bg-background-light-200 text-black"
      } px-4 py-2  hover:cursor-pointer`}
      key={periodsItem}
      onClick={() => setPeriod(periodsItem)}
    >
      {periodsItem}
    </li>
  ));

  console.log(DropDownItem);

  return (
    <div
      className={`bg-background-light-100 h-screen flex flex-col pt-20 items-start px-16
          ${darkMode.isDarkMode ? "dark" : ""} ${
        translate
          ? "translate-x-52 w-[calc(100vw-13rem)]"
          : " translate-x-0 w-screen"
      } transition-all ease-in-out duration-200 overflow-hidden`}
    >
      <div className="flex justify-between items-end p-1 ml-5 mb-3 w-11/12">
        <div className="">
          <span className="text-xl">In</span>
          <Switch
            checked={isIncome}
            onChange={() => setIsIncome((prev) => !prev)}
          />
          <span className="text-xl">Ex</span>
        </div>
        {/* TODO: Nanti Jadiin Dropdown */}
        <div className="relative">
          <button
            className="flex items-center justify-center rounded-2xl text-3xl z-20 bg-background-light-400 py-1 px-5 w-44 text-background-light-100"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            {period}
            {isDropdownOpen ? (
              <ArrowDropUpIcon fontSize="large" />
            ) : (
              <ArrowDropDownIcon fontSize="large" />
            )}
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
    </div>
  );
}

export type PageProps = {
  translate: boolean;
  changeCurrentPage: (currentTab: CurrentPage) => void;
};
