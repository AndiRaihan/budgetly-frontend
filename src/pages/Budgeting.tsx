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

  const showEditForm = (id: string) => {
    setBudgetings((prev) =>
      prev.map((budgeting) => {
        if (budgeting.id === id) {
          return {
            ...budgeting,
            isOpened: true,
          };
        }
        return { ...budgeting, isOpened: false };
      })
    );
  };

  const closeEditForm = () => {
    setBudgetings((prev) =>
      prev.map((budgeting) => ({ ...budgeting, isOpened: false }))
    );
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div
      className={`h-screen flex flex-col pt-20 items-start px-8 md:px-16
          ${darkMode.isDarkMode ? "bg-background-dark-400" : "bg-background-light-100"} ${
        translate
          ? "translate-x-52 w-[calc(100vw-13rem)]"
          : " translate-x-0 w-screen"
      } transition-all ease-in-out duration-200 pb-20`}
    >
      <div className="flex flex-col md:flex-row justify-between p-1 mb-3 w-11/12 md:items-end ml-5 ">
        <h1 className={`text-2xl md:text-3xl ${darkMode.isDarkMode ? "text-background-dark-200" : ""}`}>
          Today <span className="text-sm">{formattedDate}</span>
        </h1>
        <div className="">
          <span className={`text-xl ${darkMode.isDarkMode ? "text-background-dark-200" : ""}`}>$</span>
          <CustomSwitch
            checked={isPercentage}
            onChange={() => setIsPercentage((prev) => !prev)}
          />
          <span className={`text-xl ${darkMode.isDarkMode ? "text-background-dark-200" : ""}`}>%</span>
        </div>
      </div>
      <BudgetingForm showForm={showForm} setShowForm={setShowForm} />
      <button
        onClick={() => setShowForm((prevState) => !prevState)}
        className={`
        ${
          darkMode.isDarkMode
            ? "text-background-dark-200 hover:bg-background-dark-350 hover:bg-opacity-25"
            : "hover:bg-background-light-200"
        }
        ${
          !showForm ? "max-h-max p-1 ml-5" : "max-h-0"
        } transition-all ease-in-out duration-300 shrink-0 self-start text-start rounded-md w-11/12 overflow-hidden`}
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
        isOpened={budgetings[0].isOpened}
        showEditForm={showEditForm}
        closeForm={closeEditForm}
      />
      <BudgetingBar
        id={budgetings[1].id}
        budgetingData={budgetings[1].budgetingData}
        current={budgetings[1].current}
        showPercent={budgetings[1].showPercent}
        isOpened={budgetings[1].isOpened}
        showEditForm={showEditForm}
        closeForm={closeEditForm}
      />
      <BudgetingBar
        id={budgetings[2].id}
        budgetingData={budgetings[2].budgetingData}
        current={budgetings[2].current}
        showPercent={budgetings[2].showPercent}
        isOpened={budgetings[2].isOpened}
        showEditForm={showEditForm}
        closeForm={closeEditForm}
      />
      <BudgetingBar
        id={budgetings[3].id}
        budgetingData={budgetings[3].budgetingData}
        current={budgetings[3].current}
        showPercent={budgetings[3].showPercent}
        isOpened={budgetings[3].isOpened}
        showEditForm={showEditForm}
        closeForm={closeEditForm}
      />
    </div>
  );
}

export type PageProps = {
  translate: boolean;
  changeCurrentPage: (currentTab: CurrentPage) => void;
};
