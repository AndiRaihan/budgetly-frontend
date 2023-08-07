import {useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type statsBarProps = {
  category: string;
  amount: number;
  total: number;
};
export default function StatsBar({ category, amount, total }: statsBarProps) {
  
  const { darkMode } = useSelector((state: RootState) => state);

  return (
    <div
      className={`w-11/12 transition-all duration-300 ease-in-out flex items-center justify-between rounded-md
      ${darkMode.isDarkMode ? "bg-background-dark-300" : "bg-primary-200"} px-3 ml-5 my-3`}
    >
      <div className={`${darkMode.isDarkMode ? "text-background-dark-200" : "text-white"} `}>{category}</div>

      <div className={`${darkMode.isDarkMode ? "text-background-dark-200" : "text-white"} `}>{`${Math.round((amount / total) * 100)}%`}</div>
    </div>
  );
}
