import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import CurrentPage from "../utils/CurrentPage.tsx";
import TrackingForm from "../components/tracking/TrackingForm.tsx";
import TrackingBar from "../components/tracking/TrackingBar.tsx";
import trackingData from "../utils/TrackingData.ts";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Convert,
  GetAllUserTrackingResponse,
} from "../dtos/GetAllTrackingResponse.tsx";
import { useNavigate } from "react-router-dom";

export default function Home({ translate, changeCurrentPage }: PageProps) {
  changeCurrentPage(CurrentPage.Tracking);
  const navigate = useNavigate();

  const { account } = useSelector((state: RootState) => state);

  if (account.token === "" && account.id === "") {
    navigate("/login");
    window.location.reload();
  }

  const [showForm, setShowForm] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [trackings, setTrackings] = useState(trackingData);
  const [userTrackingData, setUserTrackingData] = useState<any>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchTrackingData() {
      const response = await fetch(
        `https://budgetly-backend-v2-production.up.railway.app/api/v1/tracking/${account.id}?groupBy=time&sortBy=time&type=userId`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${account.token}`,
          },
        }
      );

      const trackingResponse: GetAllUserTrackingResponse =
        Convert.toGetAllUserTrackingResponse(await response.text());
      setUserTrackingData(trackingResponse);
      console.log(userTrackingData);
    }
    fetchTrackingData();
  }, [refresh]);

  const { darkMode } = useSelector((state: RootState) => state);

  function showEditForm(id: string) {
    setTrackings((prev) =>
      prev.map((tracking) => {
        if (tracking.id === id) {
          return { ...tracking, isOpened: true };
        }
        return { ...tracking, isOpened: false };
      })
    );
  }

  function closeForm() {
    setTrackings((prev) =>
      prev.map((tracking) => {
        return { ...tracking, isOpened: false };
      })
    );
  }

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div
      className={` h-screen flex flex-col pt-20 items-start px-16
        ${
          darkMode.isDarkMode
            ? "bg-background-dark-400 dark"
            : "bg-background-light-100"
        } ${
        translate
          ? "translate-x-52 w-[calc(100vw-13rem)]"
          : " translate-x-0 w-screen"
      } transition-all ease-in-out duration-200 pb-20`}
    >
      <TrackingForm showForm={showForm} setShowForm={setShowForm} />
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
        } transition-all ease-in-out duration-300 flex-shrink-0 self-start text-start rounded-md w-11/12 overflow-hidden`}
      >
        +Add Expense/income
      </button>
      {showForm && (
        <hr className="border rounded-md w-11/12 ml-5 border-black" />
      )}
      <div className="flex flex-col justify-between p-1 ml-5 mt-3 w-11/12 md:flex-row md:items-end">
        <h1
          className={`text-2xl md:text-3xl ${
            darkMode.isDarkMode ? "text-background-dark-200" : ""
          }`}
        >
          Today <span className="text-sm">{formattedDate}</span>
        </h1>
        <div className={`relative z-50`}>
          <button
            className={` ${
              darkMode.isDarkMode
                ? "text-background-dark-200 hover:bg-background-dark-350 hover:bg-opacity-25"
                : "hover:bg-background-light-200"
            } flex items-center justify-center text-xl z-20 py-1 md:px-5 rounded-md`}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <span>
              <TuneIcon />
            </span>
            Filter
          </button>

          <div
            className={`transition-all duration-300 
            ${isDropdownOpen ? "max-h-60" : "max-h-0"} absolute top-10 left-0 ${
              darkMode.isDarkMode
                ? "text-background-dark-100 bg-background-dark-350"
                : "bg-background-light-200"
            } -z-50 rounded-2xl shadow w-44 overflow-hidden`}
          >
            <ul className="pb-2 pt-2 ">
              <li
                className={`${
                  darkMode.isDarkMode
                    ? "hover:bg-background-dark-200 hover:text-background-dark-400"
                    : "hover:bg-background-light-200"
                } text-blackpx-4 hover:cursor-pointer px-4 py-2`}
              >
                Opsi 1
              </li>
              <li
                className={`${
                  darkMode.isDarkMode
                    ? "hover:bg-background-dark-200 hover:text-background-dark-400"
                    : "hover:bg-background-light-200"
                } text-blackpx-4 hover:cursor-pointer px-4 py-2`}
              >
                Opsi 2
              </li>
              <li
                className={`${
                  darkMode.isDarkMode
                    ? "hover:bg-background-dark-200 hover:text-background-dark-400"
                    : "hover:bg-background-light-200"
                } text-blackpx-4 hover:cursor-pointer px-4 py-2`}
              >
                Opsi 3
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* TODO: Kalo bisa refactor aja sih ini section headernya biar jadi component sama tracking bar-nya */}
      <TrackingBar
        trackingData={{
          trackingName: trackings[0].trackingName,
          amount: trackings[0].amount,
          trackDate: trackings[0].trackDate,
          category: trackings[0].category,
          trackType: trackings[0].trackType,
        }}
        closeForm={closeForm}
        id={trackings[0].id}
        isOpened={trackings[0].isOpened}
        showEditForm={showEditForm}
      />
      <h1
        className={`text-3xl ml-5 mt-10 ${
          darkMode.isDarkMode ? "text-background-dark-200" : ""
        }`}
      >
        Yesterday
      </h1>
      <TrackingBar
        trackingData={{
          trackingName: trackings[1].trackingName,
          amount: trackings[1].amount,
          trackDate: trackings[1].trackDate,
          category: trackings[1].category,
          trackType: trackings[1].trackType,
        }}
        closeForm={closeForm}
        id={trackings[1].id}
        isOpened={trackings[1].isOpened}
        showEditForm={showEditForm}
      />
      <TrackingBar
        trackingData={{
          trackingName: trackings[2].trackingName,
          amount: trackings[2].amount,
          trackDate: trackings[2].trackDate,
          category: trackings[2].category,
          trackType: trackings[2].trackType,
        }}
        closeForm={closeForm}
        id={trackings[2].id}
        isOpened={trackings[2].isOpened}
        showEditForm={showEditForm}
      />
      <TrackingBar
        trackingData={{
          trackingName: trackings[3].trackingName,
          amount: trackings[3].amount,
          trackDate: trackings[3].trackDate,
          category: trackings[3].category,
          trackType: trackings[3].trackType,
        }}
        closeForm={closeForm}
        id={trackings[3].id}
        isOpened={trackings[3].isOpened}
        showEditForm={showEditForm}
      />
    </div>
  );
}

export type PageProps = {
  translate: boolean;
  changeCurrentPage: (currentTab: CurrentPage) => void;
};
