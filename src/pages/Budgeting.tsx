import { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CurrentPage from "../utils/CurrentPage";
import BudgetingForm from "../components/budgeting/BudgetingForm";
import BudgetingBar from "../components/budgeting/BudgetingBar";
import CustomSwitch from "../components/CustomSwitch";
import { useNavigate } from "react-router-dom";
import {
  GetAllCategoryByIDResponse,
  Convert as ConvertCategories,
} from "../dtos/GetAllCategoryByIdResponse";
import { Convert } from "../dtos/AllBudgetResponse";
import { clearId, clearToken } from "../redux/AccountSlice";
import { Period, convertToPeriod } from "../utils/Period";

export default function Budgeting({ translate, changeCurrentPage }: PageProps) {
  changeCurrentPage(CurrentPage.Budgeting);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { account, darkMode } = useSelector((state: RootState) => state);

  if (account.token === "" && account.id === "") {
    navigate("/login");
    window.location.reload();
  }

  const [showForm, setShowForm] = useState(false);
  const [isPercentage, setIsPercentage] = useState(false);
  const [budgetings, setBudgetings] = useState<any[]>();
  const [userBudgetingComponents, setUserBudgetingComponents] = useState<any[]>(
    []
  );
  const [refresh, setRefresh] = useState(false);
  const [categoriesList, setCategoriesList] = useState<
    GetAllCategoryByIDResponse[]
  >([]);

  useEffect(() => {
    async function fetchBudgetingData() {
      const response = await fetch(
        "https://budgetly-backend-v2-production.up.railway.app/api/v1/budget/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${account.token}`,
          },
        }
      );
      if (response.status === 200) {
        const data = Convert.toGetAllBudgetResponse(await response.text());
        const convertedData = data.map((budget) => {
          return { ...budget, isOpened: false, showPercent: false };
        });
        convertedData.sort((a, b) => {
          if (a.endDate < b.endDate) return 1;
          else if (a.endDate > b.endDate) return -1;
          else return 0;
        });
        setBudgetings(convertedData);
      } else {
        dispatch(clearId());
        dispatch(clearToken());
        navigate("/login");
        window.location.reload();
      }
    }
    fetchBudgetingData();
  }, [refresh]);

  useEffect(() => {
    async function fetchCategories() {
      const categoriesResponse = await fetch(
        "https://budgetly-backend-v2-production.up.railway.app/api/v1/category/",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${account.token}`,
          },
        }
      );

      const categoriesConverted: GetAllCategoryByIDResponse[] =
        ConvertCategories.toGetAllCategoryByIDResponse(
          await categoriesResponse.text()
        );
      setCategoriesList(categoriesConverted);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (budgetings === null || budgetings === undefined) return;
    let budgetingComponents = [];
    const firstDate = budgetings[0].endDate;
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(
      firstDate
    );
    const formattedFirstDate = `${parts[0].value}, ${parts[2].value} ${parts[4].value} ${parts[6].value}`;
    budgetingComponents.push(
      <div className="flex flex-col md:flex-row justify-between p-1 mb-3 w-11/12 md:items-end ml-5 ">
        <h1
          className={`text-2xl md:text-3xl ${
            budgetingComponents.length > 0 ? "ml-5 mt-10 " : " "
          } ${darkMode.isDarkMode ? "text-background-dark-200" : ""}`}
        >
          {formattedFirstDate.split(",")[0]}{" "}
          <span className="text-sm">{formattedFirstDate.split(",")[1]}</span>
        </h1>
        <div className="">
          <span
            className={`text-xl ${
              darkMode.isDarkMode ? "text-background-dark-200" : ""
            }`}
          >
            $
          </span>
          <CustomSwitch
            checked={isPercentage}
            onChange={() => setIsPercentage((prev) => !prev)}
          />
          <span
            className={`text-xl ${
              darkMode.isDarkMode ? "text-background-dark-200" : ""
            }`}
          >
            %
          </span>
        </div>
      </div>
    );

    budgetingComponents.push(
      <BudgetingBar
        id={budgetings[0]._id}
        budgetingData={{
          amount: budgetings[0].target,
          budgetDate: budgetings[0].endDate,
          category: budgetings[0].categoryId,
          period: convertToPeriod(
            budgetings[0].recurring,
            budgetings[0].startDate,
            budgetings[0].endDate
          ),
          title: budgetings[0].name,
          trackType: budgetings[0].isExpense,
        }}
        current={budgetings[0].currentSpending}
        showPercent={budgetings[0].showPercent}
        isOpened={budgetings[0].isOpened}
        showEditForm={showEditForm}
        closeForm={closeEditForm}
        startDate={budgetings[0].startDate}
        categoriesList={categoriesList}
      />
    );

    let previousDate = firstDate;
    budgetings.slice(1).forEach((budgeting) => {
      const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(
        budgeting.endDate
      );
      const formattedDate = `${parts[0].value}, ${parts[2].value} ${parts[4].value} ${parts[6].value}`;
      if (
        budgeting.endDate.getDate() !== previousDate.getDate() ||
        budgeting.endDate.getMonth() !== previousDate.getMonth() ||
        budgeting.endDate.getFullYear() !== previousDate.getFullYear()
      ) {
        budgetingComponents.push(
          <h1
            className={`text-2xl md:text-3xl ${
              budgetingComponents.length > 0 ? "ml-5 mt-10 " : " "
            } ${darkMode.isDarkMode ? "text-background-dark-200" : ""}`}
          >
            {formattedDate.split(",")[0]}{" "}
            <span className="text-sm">{formattedDate.split(",")[1]}</span>
          </h1>
        );
      }
      budgetingComponents.push(
        <BudgetingBar
          id={budgeting._id}
          budgetingData={{
            amount: budgeting.target,
            budgetDate: budgeting.endDate,
            category: budgeting.categoryId,
            period: convertToPeriod(
              budgeting.recurring,
              budgeting.startDate,
              budgeting.endDate
            ),
            title: budgeting.name,
            trackType: budgeting.isExpense,
          }}
          current={budgeting.currentSpending}
          showPercent={budgeting.showPercent}
          isOpened={budgeting.isOpened}
          showEditForm={showEditForm}
          closeForm={closeEditForm}
          startDate={budgeting.startDate}
          categoriesList={categoriesList}
        />
      );
      previousDate = budgeting.endDate;
    });
    setUserBudgetingComponents(budgetingComponents);
  }, [budgetings]);

  useEffect(() => {
    if (budgetings === null || budgetings === undefined) return;
    setBudgetings((prev) =>
      prev.map((budgeting) => ({ ...budgeting, showPercent: isPercentage }))
    );
  }, [isPercentage]);

  const showEditForm = (id: string) => {
    setBudgetings((prev) =>
      prev.map((budgeting) => {
        if (budgeting._id === id) {
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

  return (
    <div
      className={`h-full min-h-screen flex flex-col pt-20 items-start px-8 md:px-16
          ${
            darkMode.isDarkMode
              ? "bg-background-dark-400"
              : "bg-background-light-100"
          } ${
        translate
          ? "translate-x-52 w-[calc(100vw-13rem)]"
          : " translate-x-0 w-screen"
      } transition-all ease-in-out duration-200 pb-20`}
    >
      <BudgetingForm
        showForm={showForm}
        setShowForm={setShowForm}
        categoryList={categoriesList}
        setRefresh={setRefresh}
      />
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
      {userBudgetingComponents}
    </div>
  );
}

export type PageProps = {
  translate: boolean;
  changeCurrentPage: (currentTab: CurrentPage) => void;
};
