import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import CurrentPage from "../utils/CurrentPage";
import debt from "../assets/20323-removebg-preview.png"

export default function NotFound({ translate, changeCurrentPage }: PageProps) {
  changeCurrentPage(CurrentPage.Budgeting);
  const { darkMode } = useSelector((state: RootState) => state);

  const navigate = useNavigate();

  const handleLandingPage  = () => {
    navigate('/');
  }
  return (
    <div
      className={`bg-background-light-100 h-screen flex flex-col pt-48 px-16
          ${darkMode.isDarkMode ? "dark" : ""} ${
        translate
          ? "translate-x-52 w-[calc(100vw-13rem)]"
          : " translate-x-0 w-screen"
      } transition-all ease-in-out duration-200 pb-20`}
    >
      <div className="flex justify-center items-center">
        <img src={debt} alt="" className="w-64" />
      </div>
      <h1 className="my-10 text-center text-dark-green text-xl">Looks like you've stumbled upon a missing page.
        We're sorry, but the page you are looking <br /> for cannot be found. It may have been moved, renamed, or deleted  </h1>
      <Button
        className="w-80 self-center"
        variant="outlined"
        onClick={handleLandingPage}
      >
        Go to Home Page
      </Button>
    </div>
  );
}

export type PageProps = {
  translate: boolean;
  changeCurrentPage: (currentTab: CurrentPage) => void;
};
