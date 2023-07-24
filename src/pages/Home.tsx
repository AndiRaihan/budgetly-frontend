import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import CurrentPage from "../utils/CurrentPage.tsx";
import TrackingForm from "../components/TrackingForm.tsx";
import TrackingBar from "../components/TrackingBar.tsx";

export default function Home({ translate, changeCurrentPage }: PageProps) {
  changeCurrentPage(CurrentPage.Tracking);
  const [showForm, setShowForm] = useState(false);
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
      } transition-all ease-in-out duration-200 overflow-hidden`}
    >
      <div className="flex justify-between items-end p-1 ml-5 mb-3 w-11/12">
        <h1 className="text-3xl">
          Today <span className="text-sm">{formattedDate}</span>
        </h1>
        {/* TODO: Ubah jadi dropdown filter */}
        <h1>Filter</h1>
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
      <TrackingBar />
      <h1 className="text-3xl ml-5 mt-10">Yesterday</h1>
      <TrackingBar />
      <TrackingBar />
      <TrackingBar />
    </div>
  );
}

export type PageProps = {
  translate: boolean;
  changeCurrentPage: (currentTab: CurrentPage) => void;
};
