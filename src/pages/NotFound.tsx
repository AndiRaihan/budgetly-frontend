import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";

export default function NotFound() {
  const { darkMode } = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  return (
    <div
      className={"bg-background-light-200 h-screen flex flex-col justify-center items-center".concat(
        darkMode.isDarkMode ? "dark" : ""
      )}
    >
      <h1 className="my-10 text-center">Page Not Found</h1>
      <Button
        className="w-80 self-center"
        variant="outlined"
        onClick={() => navigate(-1)}
      >
        Go to Previous Page
      </Button>
    </div>
  );
}
