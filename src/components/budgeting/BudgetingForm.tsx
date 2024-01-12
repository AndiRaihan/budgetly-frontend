import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import IconWarning from "../../assets/icon _warning_.svg";
import Period from "../../utils/Period";
import CustomSwitch from "../CustomSwitch";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { GetAllCategoryByIDResponse } from "../../dtos/GetAllCategoryByIdResponse";

export default function BudgetingForm({
  showForm,
  setShowForm,
  categoryList,
  setRefresh,
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

  const { darkMode, account } = useSelector((state: RootState) => state);

  const [categoriesOptions, setCategoriesOptions] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setCategoriesOptions(
      categoryList.map((category) => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))
    );
  }, [categoryList]);

  const onSubmit: SubmitHandler<TrackingInput> = async (data) => {
    let body = {
      categoryId: data.category,
      name: data.title,
      target: data.amount,
      startDate: new Date(),
      endDate: new Date(),
      recurring: true,
    };
    if (data.period === Period.Custom) {
      body = {
        ...body,
        recurring: data.trackType,
        endDate: data.budgetDate,
      };
    } else if (data.period === Period.Daily) {
      body = {
        ...body,
        endDate: new Date(),
      };
    } else if (data.period === Period.Weekly) {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      body = {
        ...body,
        endDate: nextWeek,
      };
    } else {
      const date = new Date();
      body = {
        ...body,
        startDate: new Date(date.getFullYear(), date.getMonth(), 1),
        endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      };
    }
    const budgetingPromise = await fetch(
      "https://budgetly-backend-v2-production.up.railway.app/api/v1/budget/",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${account.token}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (budgetingPromise.status === 200) {
      setRefresh((prev: any) => !prev);
      handleReset();
    } else {
      alert(budgetingPromise.text());
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={` ${
        showForm
          ? "max-h-screen p-5 m-5 border-2 shadow-md"
          : "max-h-0 p-0 m-0 shadow-none border-none"
      } transition-all ease-in-out duration-300 flex shrink-0 flex-col justify-center bg-transparent w-11/12 overflow-hidden`}
      noValidate
    >
      <input
        id="title"
        type="text"
        className={`${
          darkMode.isDarkMode
            ? "text-background-dark-200 placeholder-background-dark-200"
            : "placeholder-black focus:placeholder-slate-600"
        } bg-transparent outline-none`}
        placeholder="Title"
        {...register("title", {
          required: "Tracking name is required",
        })}
      />
      <div className="my-1 w-full">
        <input
          id="amount"
          type="number"
          className={`${
            darkMode.isDarkMode
              ? "text-background-dark-200 placeholder-background-dark-200"
              : "placeholder-black focus:placeholder-slate-600"
          } bg-transparent hover:placeholder-slate-600 text-2xl md:text-4xl w-full outline-none`}
          placeholder="Target Amount"
          {...register("amount", {
            required: "Amount is required",
            valueAsNumber: true,
          })}
        />
      </div>

      <div className="flex flex-col gap-5 md:flex-row justify-between items-center">
        <div className="flex flex-col gap-5 md:flex-row ">
          <select
            className={` ${
              darkMode.isDarkMode
                ? "text-background-dark-200 bg-background-dark-400"
                : "focus:ring-primary-100 focus:border-primary-100 bg-background-light-100"
            } 
            focus:border px-2 py-1 rounded-md transition-colors duration-200`}
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
              className={` ${
                darkMode.isDarkMode
                  ? "text-background-dark-200 bg-background-dark-400"
                  : "focus:ring-primary-100 focus:border-primary-100 bg-background-light-100"
              } 
              focus:border px-2 mx-2 py-1 rounded-md transition-colors duration-200 outline-none`}
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
            className={`${
              darkMode.isDarkMode
                ? "text-background-dark-200 bg-background-dark-400"
                : "focus:ring-primary-100 focus:border-primary-100 bg-background-light-100"
            } 
            focus:border px-2 py-1 rounded-md transition-colors duration-200`}
            {...register("category", {
              required: "Category is required",
              validate: (value) =>
                value !== "Placeholder" || "Please select category",
            })}
          >
            <option value="Placeholder" disabled selected hidden>
              Category
            </option>
            {categoriesOptions}
          </select>
          {watch("period") === Period.Custom && (
            <div className="mx-2">
              <Controller
                name="trackType"
                control={control}
                defaultValue={false}
                render={({ field }) => <CustomSwitch {...field} />}
              />
              <span
                className={`${
                  darkMode.isDarkMode
                    ? "text-background-dark-200 "
                    : "text-black"
                } 
            ml-0 mr-3`}
              >
                Recurring
              </span>
            </div>
          )}
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
  categoryList: GetAllCategoryByIDResponse[];
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};
