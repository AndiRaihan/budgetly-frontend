import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TrackingSvg from "../assets/TrackingSvg";
import StatsSvg from "../assets/StatsSvg";
import BudgetIconSvg from "../assets/BudgetIconSvg";

const Features = () => {
  const { darkMode } = useSelector((state: RootState) => state);

  return (
    <div className="h-full py-12 px-10">
      <h1
        className={`flex justify-center text-4xl font-bold ${
          darkMode.isDarkMode ? "text-background-dark-200" : "text-dark-green"
        }`}
      >
        Features
      </h1>
      <div className={`flex flex-col md:grid grid-cols-3 gap-8`}>
        <div
          className={`flex-col md:ustify-center p-4 my-4 rounded-lg hover:scale-105 duration-300 ${
            darkMode.isDarkMode
              ? "bg-background-dark-300"
              : "bg-background-light-300"
          }`}
        >
          <h2
            className={`text-3xl text-center font-bold ${
              darkMode.isDarkMode ? "text-background-dark-200" : ""
            }`}
          >
            Tracking
          </h2>
          <TrackingSvg
            className="w-20 h-20 mx-auto"
            isDark={darkMode.isDarkMode}
          />
          <p
            className={`text-xl ${
              darkMode.isDarkMode ? "text-background-dark-200" : ""
            } `}
          >
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
            voluptatibus pariatur dignissimos quia magni. Accusamus
            necessitatibus error, nostrum sapiente ducimus voluptas animi,
            quibusdam quidem nulla, soluta porro. Molestiae, itaque voluptate.
          </p>
        </div>
        <div
          className={`flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 ${
            darkMode.isDarkMode
              ? "bg-background-dark-300"
              : "bg-background-light-300"
          }`}
        >
          <h2
            className={`text-3xl text-center font-bold ${
              darkMode.isDarkMode ? "text-background-dark-200" : ""
            }`}
          >
            Budgeting
          </h2>
          <BudgetIconSvg className="w-20 h-20 mx-auto" isDark={darkMode.isDarkMode} />
          <p
            className={`text-xl ${
              darkMode.isDarkMode ? "text-background-dark-200" : ""
            } `}
          >
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
            voluptatibus pariatur dignissimos quia magni. Accusamus
            necessitatibus error, nostrum sapiente ducimus voluptas animi,
            quibusdam quidem nulla, soluta porro. Molestiae, itaque voluptate.
          </p>
        </div>
        <div
          className={`flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 ${
            darkMode.isDarkMode
              ? "bg-background-dark-300"
              : "bg-background-light-300"
          }`}
        >
          <h2
            className={`text-3xl text-center font-bold ${
              darkMode.isDarkMode ? "text-background-dark-200" : ""
            }`}
          >
            Stats
          </h2>
          <StatsSvg className="w-20 h-20 mx-auto" isDark={darkMode.isDarkMode} />
          <p
            className={`text-xl ${
              darkMode.isDarkMode ? "text-background-dark-200" : ""
            } `}
          >
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
            voluptatibus pariatur dignissimos quia magni. Accusamus
            necessitatibus error, nostrum sapiente ducimus voluptas animi,
            quibusdam quidem nulla, soluta porro. Molestiae, itaque voluptate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
