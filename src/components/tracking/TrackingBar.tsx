import EditTrackingForm, { TrackingInput } from "./EditTrackingForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type TrackingBarProps = {
  id: string;
  trackingData: TrackingInput;
  showEditForm: (id: string) => void;
  isOpened: boolean;
  closeForm: () => void;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  categoriesList: any;
};

export default function TrackingBar({
  trackingData,
  isOpened,
  id,
  showEditForm,
  closeForm,
  setRefresh,
  categoriesList,
}: TrackingBarProps) {
  const { darkMode } = useSelector((state: RootState) => state);
  const locale = window.navigator.language;
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
  });

  return isOpened ? (
    <EditTrackingForm
      trackingStatus={trackingData}
      closeForm={closeForm}
      showForm={isOpened}
      setRefresh={setRefresh}
      categoryList={categoriesList}
    />
  ) : (
    <div
      onClick={() => showEditForm(id)}
      className={`w-11/12 
      ${darkMode.isDarkMode ? "bg-background-dark-300" : "bg-primary-200"}
      ${isOpened ? "max-h-96" : "max-h-[24px] -z-20"} 
      transition-all duration-300 ease-in-out hover:cursor-pointer flex items-center justify-between rounded-md  px-3 ml-5 my-3`}
    >
      <div
        className={`${
          darkMode.isDarkMode ? "text-background-dark-200" : "text-white"
        }`}
      >
        {trackingData.trackingName}
      </div>

      <div
        className={`${
          darkMode.isDarkMode ? "text-background-dark-200" : "text-white"
        }`}
      >
        {formatter.format(trackingData.amount ?? 0)}
      </div>
    </div>
  );
}
