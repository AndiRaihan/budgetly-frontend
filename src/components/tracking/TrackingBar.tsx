import { useState } from "react";
import EditTrackingForm, { TrackingInput } from "./EditTrackingForm";

type TrackingBarProps = {
  trackingData: TrackingInput;
};

export default function TrackingBar({ trackingData }: TrackingBarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const locale = window.navigator.language;
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
  });

  const handleClick = () => {
    setIsEditing((prev) => !prev);
  }

  return (
    isEditing ? <EditTrackingForm trackingStatus={trackingData} setShowForm={setIsEditing} showForm={isEditing} /> : <div onClick={handleClick} className={`w-11/12 ${isEditing ? "max-h-96" : "max-h-[24px] -z-20"} transition-all duration-300 ease-in-out hover:cursor-pointer flex items-center justify-between rounded-md bg-primary-200 px-3 ml-5 my-3`}>
    {!isEditing && <div className="text-white">{trackingData.trackingName}</div>}
    {!isEditing && <div className="text-white">{formatter.format(trackingData.amount ?? 0)}</div>}
  </div>
    
  );
}
