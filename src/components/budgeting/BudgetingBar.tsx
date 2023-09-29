import { useState } from "react";
import EditBudgetingForm, { BudgetingInput } from "./EditBudgetingForm";
import {useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export type BudgetingBarProps = {
  id: string;
  showPercent: boolean;
  showEditForm: (id: string) => void;
  isOpened: boolean;
  budgetingData: BudgetingInput;
  current: number;
  closeForm: () => void;
};

export default function BudgetingBar({
  showPercent,
  budgetingData,
  current,
  id,
  isOpened,
  showEditForm,
  closeForm,
}: BudgetingBarProps) {
  const [, ] = useState(false);
  const { darkMode } = useSelector((state: RootState) => state);
  const barLength =
    budgetingData.amount !== null ? (current / budgetingData.amount) * 100 : 0;
  const locale = window.navigator.language;
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
  });
  return isOpened ? (
    <EditBudgetingForm
      budgetingStatus={budgetingData}
      closeForm={closeForm}
      showForm={isOpened}
    />
  ) : (
    <div
    
      className={`w-full flex items-center justify-between rounded-md px-3 m-5 relative z-10 hover:cursor-pointer
      ${darkMode.isDarkMode ? "bg-background-dark-350" : "bg-primary-100"}`}
      onClick={() => showEditForm(id)}
    >
      <div
        style={{
          width: `${barLength}%`,
        }}
        className={`absolute
        ${darkMode.isDarkMode ? "bg-background-dark-300" : "bg-primary-200"}  w-[${barLength}%] h-full z-20 rounded-md top-0 left-0`}
      ></div>
      <div className={`z-30 ${darkMode.isDarkMode ? "text-background-dark-200" : "text-white "}`}>{budgetingData.title}</div>
      <div className={`z-30 ${darkMode.isDarkMode ? "text-background-dark-200" : "text-black "}`}>
        {showPercent
          ? `${
              budgetingData.amount !== null
                ? Math.round((current / budgetingData.amount) * 100)
                : -1
            }%`
          : `${formatter.format(current)}/${
              budgetingData.amount !== null
                ? formatter.format(budgetingData.amount)
                : -1
            }`}
      </div>
    </div>
  );
}
