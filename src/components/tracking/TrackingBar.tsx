import EditTrackingForm, { TrackingInput } from "./EditTrackingForm";

type TrackingBarProps = {
  id: string;
  trackingData: TrackingInput;
  showEditForm: (id: string) => void;
  isOpened: boolean;
  closeForm: () => void;
};

export default function TrackingBar({
  trackingData,
  isOpened,
  id,
  showEditForm,
  closeForm,
}: TrackingBarProps) {
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
    />
  ) : (
    <div
      onClick={() => showEditForm(id)}
      className={`w-11/12 ${
        isOpened ? "max-h-96" : "max-h-[24px] -z-20"
      } transition-all duration-300 ease-in-out hover:cursor-pointer flex items-center justify-between rounded-md bg-primary-200 px-3 ml-5 my-3`}
    >
      {!isOpened && (
        <div className="text-white">{trackingData.trackingName}</div>
      )}
      {!isOpened && (
        <div className="text-white">
          {formatter.format(trackingData.amount ?? 0)}
        </div>
      )}
    </div>
  );
}
