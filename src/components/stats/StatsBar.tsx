type statsBarProps = {
  category: string;
  amount: number;
  total: number;
};
export default function StatsBar({ category, amount, total }: statsBarProps) {
  return (
    <div
      className={`w-11/12 transition-all duration-300 ease-in-out flex items-center justify-between rounded-md bg-primary-200 px-3 ml-5 my-3`}
    >
      <div className="text-white">{category}</div>

      <div className="text-white">{`${Math.round((amount / total) * 100)}%`}</div>
    </div>
  );
}
