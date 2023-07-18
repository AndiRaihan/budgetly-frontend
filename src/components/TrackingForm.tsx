import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Switch from "@mui/material/Switch";

export default function TrackingForm({showForm}: TrackingFormProps) {
  type TrackingInput = {
    trackingName: string;
    amount: number | null;
    trackDate: Date;
    trackType: boolean;
    category: string;
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TrackingInput>();

  const handleReset = () => {
    reset({
        trackingName: "",
        amount: null,
        trackDate: new Date(),
        trackType: false,
        category: "Placeholder",
    })
  }

  const onSubmit: SubmitHandler<TrackingInput> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`m-5 ${showForm? 'opacity-100 translate-y-0' : "opacity-0 -translate-y-full absolute"} transition-all duration-75 ease-linear flex flex-col justify-center bg-transparent border-2 shadow-md p-5 w-11/12`}
      noValidate
    >
      <h1 className="text-3xl mb-3 self-center">Input Tracking</h1>
      <input
        id="trackingName"
        type="text"
        className="bg-transparent placeholder-black focus:placeholder-slate-600"
        placeholder="Expense/Income Name"
        {...register("trackingName")}
      />
      <input
        id="amount"
        type="number"
        className="bg-transparent placeholder-black focus:placeholder-slate-600 text-4xl"
        placeholder="Amount"
        {...register("amount", {
          required: "Amount is required",
          valueAsNumber: true,
        })}
      />
      <div className="flex justify-between p-5 items-center">
        <div>
            <input
              id="track-date"
              type="date"
              className="bg-transparent"
              {...register("trackDate", {
                required: "Date is required",
                valueAsDate: true,
              })}
            />
            <span className="text-black ml-3 mr-0">Income</span>
            <Controller
              name="trackType"
              control={control}
              defaultValue={false}
              render={({ field }) => <Switch {...field} />}
            />
            <span className="text-black ml-0 mr-3">Expense</span>
            <select
              className="bg-transparent focus:ring-primary-100 focus:border-primary-100 focus:border px-2 py-1 rounded-md"
              {...register("category")}
            >
              <option value="Placeholder" disabled selected hidden>
                Category
              </option>
              <option value="contoh">Contoh</option>
            </select>
        </div>
        <div>
            <button type="button" className=" bg-gray-400 rounded-md py-1 px-3 hover:brightness-90" onClick={handleReset}>Cancel</button>
            <button type="submit" className="mx-5 bg-[#FFDA45] rounded-md py-1 px-3 hover:brightness-90">Submit</button>
        </div>
      </div>
    </form>
  );
}

type TrackingFormProps = {
  showForm : boolean;
}