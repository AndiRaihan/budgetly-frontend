import { useForm, SubmitHandler, Controller } from "react-hook-form";
import IconWarning from "../../assets/icon _warning_.svg";
import CustomSwitch from "../CustomSwitch";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import {
  Convert,
  GetAllCategoryByIDResponse,
} from "../../dtos/GetAllCategoryByIdResponse";

export default function TrackingForm({
  showForm,
  setShowForm: setShowForm,
  setRefresh: setRefresh,
}: TrackingFormProps) {
  type TrackingInput = {
    trackingName: string;
    amount: number | null;
    trackDate: Date;
    trackType: boolean;
    category: string;
  };
  const { account } = useSelector((state: RootState) => state);

  const [categoriesOptions, setCategoriesOptions] = useState<JSX.Element[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const categoriesResponse = await fetch(
        "https://budgetly-backend-v2-production.up.railway.app/api/v1/category/",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${account.token}`,
          },
        }
      );
      
      const categoriesConverted: GetAllCategoryByIDResponse[] = Convert.toGetAllCategoryByIDResponse(
        await categoriesResponse.text()
      );
      
      setCategoriesOptions(categoriesConverted.map((category) => <option value={category._id}>{category.name}</option>))
    }
    fetchCategories();
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<TrackingInput>();

  const handleReset = () => {
    setShowForm(false);
    reset({
      trackingName: "",
      amount: null,
      trackDate: new Date(),
      trackType: false,
      category: "Placeholder",
    });
  };

  const { darkMode } = useSelector((state: RootState) => state);

  const onSubmit: SubmitHandler<TrackingInput> = async (data) => {
    const trackingPromise = await fetch("https://budgetly-backend-v2-production.up.railway.app/api/v1/tracking/",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${account.token}`,
      },
      body: JSON.stringify({
        name: data.trackingName,
        amount: data.amount,
        date: data.trackDate,
        isExpense: data.trackType,
        categoryId: data.category,
      }),
    })

    if (trackingPromise.status === 201) {
      setRefresh((prev) => !prev);
      handleReset();
    } else {
      alert(trackingPromise.text())
    }
    
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={` 
      ${
        showForm
          ? "max-h-screen p-5 m-5 border-2 shadow-md"
          : "max-h-0 p-0 m-0 shadow-none border-none"
      } transition-all shrink-0 ease-in-out duration-300 flex flex-col justify-center bg-transparent w-11/12 overflow-hidden`}
      noValidate
    >
      <input
        id="trackingName"
        type="text"
        className={`${
          darkMode.isDarkMode
            ? "text-background-dark-200 placeholder-background-dark-200"
            : "placeholder-black focus:placeholder-slate-600"
        } bg-transparent outline-none`}
        placeholder="Expense/Income Name"
        {...register("trackingName", {
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
          } bg-transparent hover:placeholder-slate-600 text-4xl w-full outline-none`}
          placeholder="Amount"
          {...register("amount", {
            required: "Amount is required",
            valueAsNumber: true,
          })}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row">
          <input
            id="track-date"
            type="date"
            className={` ${
              darkMode.isDarkMode
                ? "text-background-dark-200 bg-background-dark-400"
                : "focus:ring-primary-100 focus:border-primary-100 bg-background-light-100"
            } 
            focus:border py-1 rounded-md transition-colors duration-200 outline-none`}
            {...register("trackDate", {
              required: "Date is required",
              valueAsDate: true,
            })}
          />
          <div className="border border-background-light-400 dark:border-background-dark-350 rounded-md mx-2 text-black dark:text-background-dark-200">
            <span className=" md:ml-3 mr-0">Income</span>
            <Controller
              name="trackType"
              control={control}
              defaultValue={false}
              render={({ field }) => <CustomSwitch {...field} />}
            />
            <span className="ml-0 mr-3">Expense</span>
          </div>
          <select
            defaultValue={"Placeholder"}
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
            <option value="Placeholder" disabled hidden>
              Category
            </option>
            {categoriesOptions}
          </select>
        </div>
        <div className="">
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
      {errors.trackingName && (
        <p className="text-red-600 dark:text-red-500 text-sm flex justify-center items-center self-start">
          <img src={IconWarning} className="w-3 mx-2" />
          {errors.trackingName.message}
        </p>
      )}
      {errors.amount && (
        <p className="text-red-600 dark:text-red-500 text-sm flex justify-center items-center self-start">
          <img src={IconWarning} className="w-3 mx-2" />
          {errors.amount.message}
        </p>
      )}
      {errors.trackDate && (
        <p className="text-red-600 dark:text-red-500 text-sm flex justify-center items-center self-start">
          <img src={IconWarning} className="w-3 mx-2" />
          {errors.trackDate.message}
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

type TrackingFormProps = {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};
