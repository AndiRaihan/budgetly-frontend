import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Footer = () => {
  const { darkMode } = useSelector((state: RootState) => state);
  return (
    <footer className={`flex flex-col justify-center ${
      darkMode.isDarkMode ? "bg-gradient-to-t from-dark-300 to-dark-400" : "bg-gradient-to-t from-light-300 to-light-100"
    }`} >
      <h1 className="flex justify-center text-dark-green text-4xl font-bold dark:text-background-dark-200 dark:brightness-125">
        Contact Us
      </h1>
      <div className="flex justify-center gap-10 dark:text-background-dark-200">
        <p>5</p>
        <p>5</p>
        <p>5</p>
        <p>5</p>
        <p>5</p>
      </div>
    </footer>
  );
};

export default Footer;
