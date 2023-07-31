import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CurrentPage from "../utils/CurrentPage";
import BudgetingForm from "../components/budgeting/BudgetingForm";
import BudgetingBar from "../components/budgeting/BudgetingBar";
import CustomSwitch from "../components/CustomSwitch";
import budgetingData from "../utils/BudgetingData";

export default function Budgeting({ translate, changeCurrentPage }: PageProps) {
  changeCurrentPage(CurrentPage.Budgeting);
  const [showForm, setShowForm] = useState(false);
  const [isPercentage, setIsPercentage] = useState(false);
  const [budgetings, setBudgetings] = useState(budgetingData);
  const { darkMode } = useSelector((state: RootState) => state);

  useEffect(() => {
    setBudgetings((prev) =>
      prev.map((budgeting) => ({ ...budgeting, showPercent: isPercentage }))
    );
  }, [isPercentage]);

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
        } transition-all ease-in-out duration-300 shrink-0 self-start text-start hover:bg-background-light-200 rounded-md w-11/12 overflow-hidden`}
      >
        +Add Budget
      </button>
      {showForm && (
        <hr className="border rounded-md w-11/12 ml-5 border-black" />
      )}
      <BudgetingBar
        id={budgetings[0].id}
        budgetingData={budgetings[0].budgetingData}
        current={budgetings[0].current}
        showPercent={budgetings[0].showPercent}
      />
      <BudgetingBar
        id={budgetings[0].id}
        budgetingData={budgetings[1].budgetingData}
        current={budgetings[1].current}
        showPercent={budgetings[1].showPercent}
      />
      <BudgetingBar
        id={budgetings[0].id}
        budgetingData={budgetings[2].budgetingData}
        current={budgetings[2].current}
        showPercent={budgetings[2].showPercent}
      />
      <BudgetingBar
        id={budgetings[0].id}
        budgetingData={budgetings[3].budgetingData}
        current={budgetings[3].current}
        showPercent={budgetings[3].showPercent}
      />
    </div>
  );
}

export type PageProps = {
  translate: boolean;
  changeCurrentPage: (currentTab: CurrentPage) => void;
};
