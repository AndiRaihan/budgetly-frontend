import pic from "../assets/5867-removebg-preview 1.svg";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Hero = () => {
  const { darkMode } = useSelector((state: RootState) => state);
  return (
    <div className="grid grid-cols-2 pt-20 h-screen">
      <div className="mt-8">
        <img src={pic} alt="" className="pl-12 w-25" />
      </div>
      <div className="item-center mt-44 pl-3">
        <h1 className={`text-4xl font-bold  ${darkMode.isDarkMode ? "text-background-dark-200" : "text-dark-green"}`}>
          Track and Grow with Ease!
        </h1>
        <p className={`text-xl font-light ${darkMode.isDarkMode ? "text-background-dark-200" : "text-dark-green"}`}>
          Budgetly is an expense/income tracking web application. Its <br />{" "}
          features are expense/income tracking, budgeting, and <br />
          statistics insight on your spending that will help your money <br />
          management journey!
        </p>

        <a href="" className={`text-lg font-bold ${darkMode.isDarkMode ? "text-background-dark-200" : "text-[#7BA88D]"}`}>
          Learn more
        </a>
      </div>
    </div>
  );
};

export default Hero;
