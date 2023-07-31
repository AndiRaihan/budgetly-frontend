import { useState } from "react";
import EditBudgetingForm, { BudgetingInput } from "./EditBudgetingForm";

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
      className="w-11/12 flex items-center justify-between rounded-md bg-primary-100 px-3 m-5 relative z-10 hover:cursor-pointer"
      onClick={() => showEditForm(id)}
    >
      <div
        style={{
          width: `${barLength}%`,
        }}
        className={`absolute bg-primary-200 w-[${barLength}%] h-full z-20 rounded-md top-0 left-0`}
      ></div>
      <div className="text-white z-30">{budgetingData.title}</div>
      <div className="text-black z-30">
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