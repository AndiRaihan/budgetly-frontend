import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import CurrentPage from "../utils/CurrentPage.tsx";
import TrackingForm from "../components/tracking/TrackingForm.tsx";
import TrackingBar from "../components/tracking/TrackingBar.tsx";
import TuneIcon from "@mui/icons-material/Tune";

export default function Home({ translate, changeCurrentPage }: PageProps) {
  changeCurrentPage(CurrentPage.Tracking);
  const [showForm, setShowForm] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { darkMode } = useSelector((state: RootState) => state);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div
      className={`bg-background-light-100 h-screen flex flex-col pt-20 items-start px-16
        ${darkMode.isDarkMode ? "dark" : ""} ${
        translate
          ? "translate-x-52 w-[calc(100vw-13rem)]"
          : " translate-x-0 w-screen"
      } transition-all ease-in-out duration-200 pb-20`}
    >
      <div className="flex justify-between items-end p-1 ml-5 mb-3 w-11/12">
        <h1 className="text-3xl">
          Today <span className="text-sm">{formattedDate}</span>
        </h1>
        <div className="relative z-50">
          <button
            className="flex items-center justify-center text-xl z-20 py-1 px-5 hover:bg-background-light-200"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <span>
              <TuneIcon />
            </span>
            Filter
          </button>

          <div
            className={`transition-all duration-300 ${
              isDropdownOpen ? "max-h-60" : "max-h-0"
            } absolute top-10 left-0 bg-background-light-300 -z-50 rounded-2xl shadow w-44 overflow-hidden`}
          >
            <ul className="pb-2 pt-2 ">
              <li
                className={`hover:bg-background-light-200 text-blackpx-4 hover:cursor-pointer px-4 py-2`}
              >
                Opsi 1
              </li>
              <li
                className={`hover:bg-background-light-200 text-blackpx-4 hover:cursor-pointer px-4 py-2`}
              >
                Opsi 2
              </li>
              <li
                className={`hover:bg-background-light-200 text-blackpx-4 hover:cursor-pointer px-4 py-2`}
              >
                Opsi 3
              </li>
            </ul>
          </div>
        </div>
      </div>
      <TrackingForm showForm={showForm} setShowForm={setShowForm} />
      <button
        onClick={() => setShowForm((prevState) => !prevState)}
        className={`${
          !showForm ? "max-h-max p-1 ml-5" : "max-h-0"
        } transition-all ease-in-out duration-300  self-start text-start hover:bg-background-light-200 rounded-md w-11/12 overflow-hidden`}
      >
        +Add Expense/income
      </button>
      {showForm && (
        <hr className="border rounded-md w-11/12 ml-5 border-black" />
      )}
      {/* TODO: Kalo bisa refactor aja sih ini section headernya biar jadi component sama tracking bar-nya */}
      <TrackingBar title={"Mangan"} amount={100000} />
      <h1 className="text-3xl ml-5 mt-10">Yesterday</h1>
      <TrackingBar title={"Nasi padang"} amount={20000} />
      <TrackingBar title={"Nasi goreng"} amount={15000} />
      <TrackingBar title={"Air putih"} amount={100000} />
    </div>
  );
}

export type PageProps = {
  translate: boolean;
  changeCurrentPage: (currentTab: CurrentPage) => void;
};
