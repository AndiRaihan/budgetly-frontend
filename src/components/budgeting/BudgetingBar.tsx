import EditBudgetingForm, { BudgetingInput } from "./EditBudgetingForm";

export type BudgetingBarProps = {
  showPercent: boolean;
  budgetingData: BudgetingInput;
  current: number;
};

export default function BudgetingBar({
  showPercent,
  budgetingData,
  current,
}: BudgetingBarProps) {
  const barLength =
    budgetingData.amount !== null ? (current / budgetingData.amount) * 100 : 0;
  const locale = window.navigator.language;
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className="w-11/12 flex items-center justify-between rounded-md bg-primary-100 px-3 m-5 relative z-10">
      <div
        style={{
          width: `${barLength}%`,
        }}
        className={`absolute bg-primary-200 w-[${barLength}%] h-full z-20 rounded-md top-0 left-0`}
      ></div>
      <div className="text-white z-30">{budgetingData.amount}</div>
      <div className="text-black z-30">
        {showPercent
          ? `${budgetingData.amount !== null ? Math.round((current / budgetingData.amount) * 100) : -1}%`
          : `${formatter.format(current)}/${budgetingData.amount !== null ? formatter.format(budgetingData.amount) : -1}`}
      </div>
    </div>
  );
}
