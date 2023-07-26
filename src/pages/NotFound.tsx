import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import debt from "../assets/20323-removebg-preview.png"

export default function NotFound() {
  const { darkMode } = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  return (
    <div
      className={"bg-background-light-100 h-screen flex flex-col justify-center items-center".concat(
        darkMode.isDarkMode ? "dark" : ""
      )}
    >
      <div className="flex justify-center items-center">
        <img src={debt} alt="" className="w-64" />
      </div>
      <h1 className="my-10 text-center">Looks like you've stumbled upon a missing page.
        We're sorry, but the page you are looking <br /> for cannot be found. It may have been moved, renamed, or deleted  </h1>
      <Button
        className="w-80 self-center"
        variant="outlined"
        onClick={() => navigate(-1)}
      >
        Go to Home Page
      </Button>
    </div>
  );
}
