type TrackingBarProps = {
  title: string;
  amount: number;
};

export default function TrackingBar({ title, amount }: TrackingBarProps) {
  const locale = window.navigator.language;
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className="w-11/12 flex items-center justify-between rounded-md bg-primary-200 px-3 ml-5 my-3">
      <div className="text-white">{title}</div>
      <div className="text-white">{formatter.format(amount)}</div>
    </div>
  );
}
