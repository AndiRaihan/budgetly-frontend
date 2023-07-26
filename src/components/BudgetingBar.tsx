type BudgetingBarProps = {
  showPercent: boolean;
  title: string;
  limit: number;
  current: number;
};

export default function BudgetingBar({
  showPercent,
  title,
  limit,
  current,
}: BudgetingBarProps) {
  // TODO: Bikin props untuk ngatur persen/angka, judulnya, max-nya, dan jumlah saat ini
  const barLength = (current / limit) * 100;
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
      <div className="text-white z-30">{title}</div>
      <div className="text-black z-30">
        {showPercent
          ? `${Math.round((current / limit) * 100)}%`
          : `${formatter.format(current)}/${formatter.format(limit)}`}
      </div>
    </div>
  );
}
