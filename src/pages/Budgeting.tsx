import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CurrentPage from "../utils/CurrentPage";
import BudgetingForm from "../components/BudgetingForm";
import BudgetingBar from "../components/BudgetingBar";
import CustomSwitch from "../components/CustomSwitch";

export default function Budgeting({ translate, changeCurrentPage }: PageProps) {
  changeCurrentPage(CurrentPage.Budgeting);
  const [showForm, setShowForm] = useState(false);
  const [isPercentage, setIsPercentage] = useState(false);
  const { darkMode } = useSelector((state: RootState) => state);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div
      className={`bg-background-light-100 h-screen flex flex-col pt-20 items-start px-16
          ${darkMode.isDarkMode ? "dark" : ""} ${
        translate
          ? "translate-x-52 w-[calc(100vw-13rem)]"
          : " translate-x-0 w-screen"
      } transition-all ease-in-out duration-200 pb-20`}
    >
      <div className="flex justify-between items-end p-1 ml-5 mb-3 w-11/12">
        <h1 className="text-3xl">
          Today <span className="text-sm">{formattedDate}</span>
        </h1>
        <div>
          <span className="text-xl">$</span>
          <CustomSwitch
            checked={isPercentage}
            onChange={() => setIsPercentage((prev) => !prev)}
          />
          <span className="text-xl">%</span>
        </div>
      </div>
      <BudgetingForm showForm={showForm} setShowForm={setShowForm} />
      <button
        onClick={() => setShowForm((prevState) => !prevState)}
        className={`${
          !showForm ? "max-h-max p-1 ml-5" : "max-h-0"
        } transition-all ease-in-out duration-300  self-start text-start hover:bg-background-light-200 rounded-md w-11/12 overflow-hidden`}
      >
        +Add Budget
      </button>
      {showForm && (
        <hr className="border rounded-md w-11/12 ml-5 border-black" />
      )}
      <BudgetingBar
        current={1000000}
        limit={2000000}
        title="Pangan"
        showPercent={isPercentage}
      />
      <BudgetingBar
        current={1500000}
        limit={2500000}
        title="Papan"
        showPercent={isPercentage}
      />
      <BudgetingBar
        current={50000}
        limit={150000}
        title="Sandang"
        showPercent={isPercentage}
      />
      <BudgetingBar
        current={100_000}
        limit={1_000_000}
        title="Rekreasi"
        showPercent={isPercentage}
      />
    </div>
  );
}

export type PageProps = {
  translate: boolean;
  changeCurrentPage: (currentTab: CurrentPage) => void;
};
