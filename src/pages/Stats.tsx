import { useEffect, useState } from "react";
import { RootState } from "../redux/store";
import CurrentPage from "../utils/CurrentPage";
import { useDispatch, useSelector } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Period from "../utils/Period";
import {
  blueberryTwilightPaletteDark,
  blueberryTwilightPaletteLight,
} from "@mui/x-charts/colorPalettes";
import CustomSwitch from "../components/CustomSwitch";
import StatsBar from "../components/stats/StatsBar";
import { Convert, GetAllStatsResponse } from "../dtos/GetAllStatsResponse";
import { clearId, clearToken } from "../redux/AccountSlice";
import { useNavigate } from "react-router-dom";
import { PieChart as SecondPieChart } from "@mui/x-charts/PieChart";

export default function Stats({ translate, changeCurrentPage }: PageProps) {
  changeCurrentPage(CurrentPage.Stats);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isIncome, setIsIncome] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [period, setPeriod] = useState(Period.Daily);
  const [statsData, setStatsData] = useState<GetAllStatsResponse[]>([]);
  const [data, setData] = useState<any[]>();

  const { darkMode, account } = useSelector((state: RootState) => state);

  const periods = Object.values(Period);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch(
        "https://budgetly-backend-v2-production.up.railway.app/api/v1/stats/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${account.token}`,
          },
        }
      );
      let data;
      if (response.status === 200) {
        data = Convert.toGetAllStatsResponse(await response.text());
        setStatsData(data);
      } else {
        dispatch(clearId());
        dispatch(clearToken());
        navigate("/login");
        window.location.reload();
      }
    };
    fetchStats();
  }, []);

  const [statsBar, setStatsBar] = useState<any[]>();
  useEffect(() => {
    const data = statsData.map((stats) => {
      return {
        id: stats._id,
        label: stats.categoryName,
        value: stats.totalAmount,
      };
    });
    setData(data);
    const sum = data.reduce((acc, curr) => acc + curr.value, 0);
    setStatsBar(
      statsData.map((dataItem) => (
        <StatsBar
          category={dataItem.categoryName}
          amount={dataItem.totalAmount}
          total={sum}
          key={dataItem._id}
        />
      ))
    );
  }, [statsData]);

  const DropDownItem: any = periods.map((periodsItem) => (
    <li
      className={`
      ${
        periodsItem === period
          ? "bg-primary-200 dark:bg-background-dark-200 dark:opacity-75 dark:hover:opacity-100 hover:bg-primary-100 text-background-light-100"
          : "hover:bg-background-light-200 dark:hover:bg-background-dark-200 dark:hover:text-background-dark-400 text-black dark:bg-background-dark-350 dark:text-background-dark-200"
      } 
      px-4 py-2 hover:cursor-pointer`}
      key={periodsItem}
      onClick={() => setPeriod(periodsItem)}
    >
      {periodsItem}
    </li>
  ));

  return (
    <div
      className={`
      ${
        darkMode.isDarkMode
          ? "bg-background-dark-400 dark"
          : "bg-background-light-100"
      }
      min-h-screen flex flex-col pt-20 items-start px-16
       ${
         translate
           ? "translate-x-52 w-[calc(100vw-13rem)]"
           : " translate-x-0 w-screen"
       } transition-all ease-in-out duration-200 pb-20`}
    >
      <div className="flex flex-col p-1 ml-5 mb-3 w-11/12 md:justify-between md:flex-row ">
        <div>
          <span
            className={`text-lg ${
              darkMode.isDarkMode ? "text-background-dark-200" : ""
            } `}
          >
            Income
          </span>
          <CustomSwitch
            checked={isIncome}
            onChange={() => setIsIncome((prev) => !prev)}
          />
          <span
            className={`text-lg ${
              darkMode.isDarkMode ? "text-background-dark-200" : ""
            } `}
          >
            Expenses
          </span>
        </div>
        <div className="relative z-50">
          <button
            className={`flex items-center justify-center text-2xl rounded-2xl md:text-3xl z-20 py-1 px-5 md:w-44 text-background-light-100 ${
              darkMode.isDarkMode
                ? "bg-background-dark-300"
                : "bg-background-light-400"
            }`}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            {period}
            <div
              className={`${
                isDropdownOpen && "rotate-180"
              } transition-all duration-300`}
            >
              <ArrowDropDownIcon fontSize="large" />
            </div>
          </button>

          <div
            className={`
            ${
              darkMode.isDarkMode
                ? "bg-background-dark-350"
                : "bg-background-light-300"
            }
            transition-all duration-300 ${
              isDropdownOpen ? "max-h-60" : "max-h-0"
            } absolute top-2 left-0 -z-50 rounded-2xl shadow w-44 overflow-hidden`}
          >
            <ul className="pb-2 pt-8 ">{DropDownItem}</ul>
          </div>
        </div>
      </div>
      <div className={`flex justify-center w-full items-center mb-6`}>
        {data && (
          <SecondPieChart
            series={[
              {
                data: data.map((dataItem) => {
                  return {
                    id: dataItem.id,
                    label: dataItem.label,
                    value: dataItem.value,
                  };
                }),
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
                innerRadius: 20,
              },
            ]}
            colors={
              darkMode.isDarkMode
                ? blueberryTwilightPaletteDark
                : blueberryTwilightPaletteLight
            }
            width={1000}
            height={300}
            slotProps={{
              legend: {
                labelStyle: {
                  fill: darkMode.isDarkMode ? "#A5C9CA" : "black",
                },
              },
            }}
          />
        )}
      </div>
      {statsBar}
    </div>
  );
}

export type PageProps = {
  translate: boolean;
  changeCurrentPage: (currentTab: CurrentPage) => void;
};
