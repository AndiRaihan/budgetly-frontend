import { useState } from "react";
import EditBudgetingForm, { BudgetingInput } from "./EditBudgetingForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { GetAllCategoryByIDResponse } from "../../dtos/GetAllCategoryByIdResponse";

export type BudgetingBarProps = {
  id: string;
  showPercent: boolean;
  showEditForm: (id: string) => void;
  isOpened: boolean;
  budgetingData: BudgetingInput;
  current: number;
  startDate: Date;
  categoriesList: GetAllCategoryByIDResponse[];
  closeForm: () => void;
};

export default function BudgetingBar({
  showPercent,
  budgetingData,
  current,
  id,
  isOpened,
  startDate,
  categoriesList,
  showEditForm,
  closeForm,
}: BudgetingBarProps) {
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
      startDate={startDate}
      categoriesList={categoriesList}
    />
  ) : (
    <div
      className={`w-11/12 flex items-center justify-between rounded-md px-3 m-5 relative z-10 hover:cursor-pointer
      ${darkMode.isDarkMode ? "bg-background-dark-350" : "bg-primary-100"}`}
      onClick={() => showEditForm(id)}
    >
      <div
        style={{
          width: `${Math.min(barLength, 100)}%`,
        }}
        className={`absolute
        ${
          darkMode.isDarkMode ? "bg-background-dark-300" : "bg-primary-200"
        }  w-[${Math.min(
          barLength,
          100
        )}%] h-full z-20 rounded-md top-0 left-0`}
      ></div>
      <div
        className={`z-30 ${
          darkMode.isDarkMode ? "text-background-dark-200" : "text-white "
        }`}
      >
        {budgetingData.title}
      </div>
      <div
        className={`z-30 ${
          darkMode.isDarkMode ? "text-background-dark-200" : "text-black "
        }`}
      >
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
