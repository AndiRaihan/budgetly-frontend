import Hero from "../components/Hero";
import Features from "../components/Features";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CurrentPage from "../utils/CurrentPage";
import Footer from "../components/Footer";

export default function LandingPage({ translate, changeCurrentPage }: PageProps) {
  changeCurrentPage(CurrentPage.Budgeting);

  const { darkMode } = useSelector((state: RootState) => state);

  return (
    <div
      className={`bg-background-light-100
          ${darkMode.isDarkMode ? "dark" : ""} ${
        translate
          ? "translate-x-52 w-[calc(100vw-13rem)]"
          : " translate-x-0 w-screen"
      } transition-all ease-in-out duration-200 pb-20`}
      >
        <Hero/>
        <Features/>
        <Footer/>
    </div>

  );
}

export type PageProps = {
  translate: boolean;
  changeCurrentPage: (currentTab: CurrentPage) => void;
};