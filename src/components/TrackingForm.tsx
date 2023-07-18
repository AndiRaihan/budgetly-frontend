import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Switch from "@mui/material/Switch";

export default function TrackingForm() {
  type TrackingInput = {
    trackingName: string;
    amount: number;
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
        amount: undefined,
        trackDate: new Date(),
        trackType: false,
        category: "",
    })
  }

  const onSubmit: SubmitHandler<TrackingInput> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center bg-transparent border-2 shadow-md p-5 w-11/12"
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
              rules={{ required: true }}
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
            <button type="button" onClick={handleReset}>Cancel</button>
            <button type="submit" className="mx-5">Submit</button>
        </div>
      </div>
    </form>
  );
}
