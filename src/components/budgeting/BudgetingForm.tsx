import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import IconWarning from "../assets/icon _warning_.svg";
import Period from "../../utils/Period";
import CustomSwitch from "../CustomSwitch";

export default function BudgetingForm({
  showForm,
  setShowForm,
}: BudgetingFromProps) {
  type TrackingInput = {
    title: string;
    amount: number | null;
    period: Period;
    budgetDate: Date;
    trackType: boolean;
    category: string;
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid },
    watch,
  } = useForm<TrackingInput>();

  const handleReset = () => {
    setShowForm(false);
    reset({
      title: "",
      amount: null,
      budgetDate: new Date(),
      trackType: false,
      category: "Placeholder",
    });
  };

  const onSubmit: SubmitHandler<TrackingInput> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={` ${
        showForm
          ? "max-h-screen p-5 m-5 border-2 shadow-md"
          : "max-h-0 p-0 m-0 shadow-none border-none"
      } transition-all ease-in-out duration-300 flex flex-col justify-center bg-transparent w-11/12 overflow-hidden`}
      noValidate
    >
      <input
        id="title"
        type="text"
        className="bg-transparent placeholder-black focus:placeholder-slate-600"
        placeholder="Title"
        {...register("title", {
          required: "Tracking name is required",
        })}
      />
      <div className="my-1 w-full">
        <input
          id="amount"
          type="number"
          className="bg-transparent placeholder-black focus:placeholder-slate-600 hover:placeholder-slate-600 text-4xl w-full"
          placeholder="Target Amount"
          {...register("amount", {
            required: "Amount is required",
            valueAsNumber: true,
          })}
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex">
          <select
            className="bg-transparent focus:ring-primary-100 focus:border-primary-100 focus:border px-2 py-1 rounded-md"
            {...register("period", {
              required: "Period is required",
            })}
          >
            <option value={Period.Daily} selected>
              {Period.Daily}
            </option>
            <option value={Period.Weekly}>{Period.Weekly}</option>
            <option value={Period.Monthly}>{Period.Monthly}</option>
            <option value={Period.Custom}>{Period.Custom}</option>
          </select>
          {watch("period") === Period.Custom && (
            <input
              id="track-date"
              type="date"
              className="bg-transparent"
              {...register("budgetDate", {
                required:
                  watch("period") === Period.Custom
                    ? "Date is required"
                    : false,
                valueAsDate: true,
              })}
            />
          )}
          <select
            className="bg-transparent focus:ring-primary-100 focus:border-primary-100 focus:border px-2 py-1 rounded-md"
            {...register("category", {
              required: "Category is required",
              validate: (value) =>
                value !== "Placeholder" || "Please select category",
            })}
          >
            <option value="Placeholder" disabled selected hidden>
              Category
            </option>
            <option value="contoh">Contoh</option>
          </select>
          <div className="mx-2">
            <Controller
              name="trackType"
              control={control}
              defaultValue={false}
              render={({ field }) => <CustomSwitch {...field} />}
            />
            <span className="text-black ml-0 mr-3">Recurring</span>
          </div>
        </div>
        <div>
          <button
            type="button"
            className=" bg-gray-400 rounded-md py-1 px-3 hover:brightness-90"
            onClick={handleReset}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`mx-5 bg-[#FFDA45] rounded-md py-1 px-3 ${
              isValid && isDirty ? "hover:brightness-90" : ""
            } disabled:opacity-60`}
            disabled={!isDirty || !isValid}
          >
            Submit
          </button>
        </div>
      </div>
      {errors.title && (
        <p className="text-red-600 dark:text-red-500 text-sm flex justify-center items-center self-start">
          <img src={IconWarning} className="w-3 mx-2" />
          {errors.title.message}
        </p>
      )}
      {errors.amount && (
        <p className="text-red-600 dark:text-red-500 text-sm flex justify-center items-center self-start">
          <img src={IconWarning} className="w-3 mx-2" />
          {errors.amount.message}
        </p>
      )}
      {errors.budgetDate && (
        <p className="text-red-600 dark:text-red-500 text-sm flex justify-center items-center self-start">
          <img src={IconWarning} className="w-3 mx-2" />
          {errors.budgetDate.message}
        </p>
      )}
      {errors.category && (
        <p className="text-red-600 dark:text-red-500 text-sm flex justify-center items-center self-start">
          <img src={IconWarning} className="w-3 mx-2" />
          {errors.category.message}
        </p>
      )}
    </form>
  );
}

type BudgetingFromProps = {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};
