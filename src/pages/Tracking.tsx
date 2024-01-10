import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import CurrentPage from "../utils/CurrentPage.tsx";
import TrackingForm from "../components/tracking/TrackingForm.tsx";
import TrackingBar from "../components/tracking/TrackingBar.tsx";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Convert,
  GetAllUserTrackingResponse,
} from "../dtos/GetAllTrackingResponse.tsx";
import { useNavigate } from "react-router-dom";
import { clearId, clearToken } from "../redux/AccountSlice";

export default function Home({ translate, changeCurrentPage }: PageProps) {
  changeCurrentPage(CurrentPage.Tracking);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { account } = useSelector((state: RootState) => state);

  if (account.token === "" && account.id === "") {
    navigate("/login");
    window.location.reload();
  }

  const [showForm, setShowForm] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [trackings, setTrackings] = useState<any>();
  const [userTrackingData, setUserTrackingData] = useState<any>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchTrackingData() {
      const response = await fetch(
        `https://budgetly-backend-v2-production.up.railway.app/api/v1/tracking/?groupBy=time&sortBy=time`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${account.token}`,
          },
        }
      );

      if (response.status !== 200) {
        dispatch(clearId());
        dispatch(clearToken());
        navigate("/login");
        window.location.reload();
      }

      let trackingResponse: GetAllUserTrackingResponse =
        Convert.toGetAllUserTrackingResponse(await response.text());

      const modifiedTrackingToday = trackingResponse.today.map((tracking) => {
        return {
          id: tracking._id,
          trackingName: tracking.name,
          amount: tracking.amount,
          trackDate: tracking.date,
          category: tracking.category,
          trackType: tracking.isExpense,
          isOpened: false,
        };
      });

      const modifiedTrackingYesterday = trackingResponse.yesterday.map(
        (tracking) => {
          return {
            id: tracking._id,
            trackingName: tracking.name,
            amount: tracking.amount,
            trackDate: tracking.date,
            category: tracking.category,
            trackType: tracking.isExpense,
            isOpened: false,
          };
        }
      );

      const modifiedTrackingPast = trackingResponse.past.map((tracking) => {
        return {
          id: tracking._id,
          trackingName: tracking.name,
          amount: tracking.amount,
          trackDate: tracking.date,
          category: tracking.category,
          trackType: tracking.isExpense,
          isOpened: false,
        };
      });

      const modifiedTrackingData = {
        today: modifiedTrackingToday,
        yesterday: modifiedTrackingYesterday,
        past: modifiedTrackingPast,
      };

      setTrackings(modifiedTrackingData);
    }
    fetchTrackingData();
  }, [refresh]);

  useEffect(() => {
    if (trackings === null || trackings === undefined) return;
    let trackingComponents = [];
    const todayData = trackings.today;
    const yesterdayData = trackings.yesterday;
    const pastData = trackings.past;

    if (todayData.length > 0) {
      const currentDate = new Date();
      const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(
        currentDate
      );

      const formattedCurrentDate = `${parts[0].value}, ${parts[2].value} ${parts[4].value} ${parts[6].value}`;

      trackingComponents.push(
        <h1
          className={`text-2xl md:text-3xl ${
            darkMode.isDarkMode ? "text-background-dark-200" : ""
          }`}
        >
          Today <span className="text-sm">{formattedCurrentDate}</span>
        </h1>
      );

      todayData.forEach(
        (data: {
          trackingName: any;
          amount: any;
          trackDate: any;
          category: any;
          trackType: any;
          id: string;
          isOpened: boolean;
        }) => {
          trackingComponents.push(
            <TrackingBar
              trackingData={{
                trackingName: data.trackingName,
                amount: data.amount,
                trackDate: data.trackDate,
                category: data.category,
                trackType: data.trackType,
              }}
              closeForm={closeForm}
              id={data.id}
              isOpened={data.isOpened}
              showEditForm={showEditForm}
            />
          );
        }
      );
    }

    if (yesterdayData.length > 0) {
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(
        yesterdayDate
      );

      const formattedYesterdayDate = `${parts[0].value}, ${parts[2].value} ${parts[4].value} ${parts[6].value}`;

      trackingComponents.push(
        <h1
          className={`text-2xl md:text-3xl ${
            trackingComponents.length > 0 ? "ml-5 mt-10 " : " "
          } ${darkMode.isDarkMode ? "text-background-dark-200" : ""}`}
        >
          Yesterday <span className="text-sm">{formattedYesterdayDate}</span>
        </h1>
      );

      yesterdayData.forEach(
        (data: {
          trackingName: any;
          amount: any;
          trackDate: any;
          category: any;
          trackType: any;
          id: string;
          isOpened: boolean;
        }) => {
          trackingComponents.push(
            <TrackingBar
              trackingData={{
                trackingName: data.trackingName,
                amount: data.amount,
                trackDate: data.trackDate,
                category: data.category,
                trackType: data.trackType,
              }}
              closeForm={closeForm}
              id={data.id}
              isOpened={data.isOpened}
              showEditForm={showEditForm}
            />
          );
        }
      );
    }

    if (pastData.length > 0) {
      const pastDate = pastData[0].trackDate;
      const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(
        pastDate
      );

      const formattedPastDate = `${parts[0].value}, ${parts[2].value} ${parts[4].value} ${parts[6].value}`;

      trackingComponents.push(
        <h1
          className={`text-2xl md:text-3xl ${
            trackingComponents.length > 0 ? "ml-5 mt-10 " : " "
          } ${darkMode.isDarkMode ? "text-background-dark-200" : ""}`}
        >
          {formattedPastDate.split(",")[0]}{" "}
          <span className="text-sm">{formattedPastDate.split(",")[1]}</span>
        </h1>
      );

      trackingComponents.push(
        <TrackingBar
          trackingData={{
            trackingName: pastData[0].trackingName,
            amount: pastData[0].amount,
            trackDate: pastData[0].trackDate,
            category: pastData[0].category,
            trackType: pastData[0].trackType,
          }}
          closeForm={closeForm}
          id={pastData[0].id}
          isOpened={pastData[0].isOpened}
          showEditForm={showEditForm}
        />
      );

      let previousDate = pastDate;

      pastData
        .slice(1)
        .forEach(
          (data: {
            trackingName: any;
            amount: any;
            trackDate: any;
            category: any;
            trackType: any;
            id: string;
            isOpened: boolean;
          }) => {
            if (data.trackDate.getDate() !== previousDate.getDate()) {
              const options = {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              };
              const parts = new Intl.DateTimeFormat(
                "en-US",
                options
              ).formatToParts(data.trackDate);
              const formattedPastDate = `${parts[0].value}, ${parts[2].value} ${parts[4].value} ${parts[6].value}`;
              trackingComponents.push(
                <h1
                  className={`text-2xl md:text-3xl ${
                    trackingComponents.length > 0 ? "ml-5 mt-10 " : " "
                  } ${darkMode.isDarkMode ? "text-background-dark-200" : ""}`}
                >
                  {formattedPastDate.split(",")[0]}{" "}
                  <span className="text-sm">
                    {formattedPastDate.split(",")[1]}
                  </span>
                </h1>
              );
            }
            trackingComponents.push(
              <TrackingBar
                trackingData={{
                  trackingName: data.trackingName,
                  amount: data.amount,
                  trackDate: data.trackDate,
                  category: data.category,
                  trackType: data.trackType,
                }}
                closeForm={closeForm}
                id={data.id}
                isOpened={data.isOpened}
                showEditForm={showEditForm}
              />
            );
            previousDate = data.trackDate;
          }
        );
    }

    trackingComponents[0] = (
      <div className="flex flex-col justify-between p-1 ml-5 mt-3 w-11/12 md:flex-row md:items-end">
        {trackingComponents[0]}
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
    );

    setUserTrackingData(trackingComponents);
  }, [trackings]);
  const { darkMode } = useSelector((state: RootState) => state);

  function showEditForm(id: string) {
    setTrackings(
      (prev: {
        today: { map: (arg0: (tracking: any) => any) => never[] };
        yesterday: { map: (arg0: (tracking: any) => any) => never[] };
        past: { map: (arg0: (tracking: any) => any) => never[] };
      }) => {
        const newTracking = {
          today: [],
          yesterday: [],
          past: [],
        };
        newTracking.today = prev.today.map((tracking: { id: string }) => {
          if (tracking.id === id) {
            return { ...tracking, isOpened: true };
          }
          return { ...tracking, isOpened: false };
        });
        newTracking.yesterday = prev.yesterday.map(
          (tracking: { id: string }) => {
            if (tracking.id === id) {
              return { ...tracking, isOpened: true };
            }
            return { ...tracking, isOpened: false };
          }
        );
        newTracking.past = prev.past.map((tracking: { id: string }) => {
          if (tracking.id === id) {
            return { ...tracking, isOpened: true };
          }
          return { ...tracking, isOpened: false };
        });
        return newTracking;
      }
    );
  }

  function closeForm() {
    setTrackings(
      (prev: {
        today: { map: (arg0: (tracking: any) => any) => never[] };
        yesterday: { map: (arg0: (tracking: any) => any) => never[] };
        past: { map: (arg0: (tracking: any) => any) => never[] };
      }) => {
        const newTracking = {
          today: [],
          yesterday: [],
          past: [],
        };
        newTracking.today = prev.today.map((tracking: any) => {
          return { ...tracking, isOpened: false };
        });
        newTracking.yesterday = prev.yesterday.map((tracking: any) => {
          return { ...tracking, isOpened: false };
        });
        newTracking.past = prev.past.map((tracking: any) => {
          return { ...tracking, isOpened: false };
        });
        return newTracking;
      }
    );
  }

  return (
    <div
      className={` h-full min-h-screen flex flex-col pt-20 items-start px-16
        ${
          darkMode.isDarkMode
            ? "bg-background-dark-400 dark"
            : "bg-background-light-100"
        } ${
        translate
          ? "translate-x-52 w-[calc(100vw-13rem)]"
          : " translate-x-0 w-full"
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
      {userTrackingData}
    </div>
  );
}

export type PageProps = {
  translate: boolean;
  changeCurrentPage: (currentTab: CurrentPage) => void;
};
