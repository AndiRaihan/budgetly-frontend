import { useForm, SubmitHandler } from "react-hook-form";

export default function TrackingForm() {
  type TrackingInput = {
    trackingName: string;
    amount: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrackingInput>();

  const onSubmit: SubmitHandler<TrackingInput> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center bg-transparent border-2 shadow-md p-5"
      noValidate
    >
      <h1 className="text-3xl mb-3">Input Tracking</h1>
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
        className="bg-transparent placeholder-black focus:placeholder-slate-600 appearance-none"
        placeholder="Amount"
        {...register("amount",{
            required: "Email is required",
            valueAsNumber: true,
          })}
      />
    </form>
  );
}
