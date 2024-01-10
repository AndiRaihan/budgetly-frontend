import { Controller, SubmitHandler, useForm } from "react-hook-form";
import IconWarning from "../../assets/icon _warning_.svg";
import CustomLighterSwitch from "../CustomLigherSwitch";
import {useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { Convert, GetAllCategoryByIDResponse } from "../../dtos/GetAllCategoryByIdResponse";

export type TrackingInput = {
  trackingName: string;
  amount: number | null;
  trackDate: Date;
  trackType: boolean;
  category: string;
};

type EditTrackingFormProps = {
  showForm: boolean;
  closeForm: () => void;
  trackingStatus: TrackingInput;
};
export default function EditTrackingForm({
  showForm,
  closeForm,
  trackingStatus,
}: EditTrackingFormProps) {
    
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<TrackingInput>({
    // TODO: Format date tidak benar, harusnya yyyy-MM-dd
    defaultValues: {...trackingStatus, category: "Placeholder"},
  });

  const { account } = useSelector((state: RootState) => state);

  const [categoriesOptions, setCategoriesOptions] = useState<JSX.Element[]>([]);

  // TODO: Loading category terlalu lama, akal akalin biar cepet
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

      const categoriesConverted: GetAllCategoryByIDResponse[] =
        Convert.toGetAllCategoryByIDResponse(await categoriesResponse.text());

      setCategoriesOptions(
        categoriesConverted.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))
      );
      
    }
    fetchCategories();
    reset(trackingStatus)
  }, []);

  const handleReset = () => {
    closeForm();
    reset({...trackingStatus, category: "Placeholder"});
  };

  const onSubmit: SubmitHandler<TrackingInput> = (data) => console.log(data);

  const { darkMode } = useSelector((state: RootState) => state);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`
      ${darkMode.isDarkMode ? "bg-background-dark-300" : "bg-primary-200"} 
      ${
        showForm
          ? "max-h-screen p-5 m-5 border-2 shadow-md"
          : "max-h-0 p-0 m-0 shadow-none border-none"
      } transition-all ease-in-out shrink-0 z-40 duration-300 flex flex-col justify-center  w-11/12 overflow-hidden rounded-2xl`}
      noValidate
    >
      <input
        id="trackingName"
        type="text"
        className={`${darkMode.isDarkMode ? "text-background-dark-200" : "text-background-light-100"}  bg-transparent  placeholder-background-light-100 focus:placeholder-background-light-300`}
        placeholder="Expense/Income Name"
        {...register("trackingName", {
          required: "Tracking name is required",
        })}
      />
      <div className="my-1 w-full">
        <input
          id="amount"
          type="number"
          className={`${darkMode.isDarkMode ? "text-background-dark-200" : "text-background-light-100"} bg-transparent  placeholder-background-light-100 focus:placeholder-background-light-300 text-4xl w-full`}
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
            className={`bg-transparent text-background-light-100 placeholder-background-light-100 focus:placeholder-background-light-300`}
            {...register("trackDate", {
              required: "Date is required",
              valueAsDate: true,
            })}
          />
          <div className="border border-background-light-400 rounded-md mx-2">
            <span className="text-background-light-100 ml-3 mr-0">Income</span>
            {/* TODO: Fix Bug. The value is always false, it doesn't follow the props */}
            <Controller
              name="trackType"
              control={control}
              render={({ field }) => <CustomLighterSwitch {...field} />}
            />
            <span className="text-background-light-100 md:ml-3 mr-0">Expense</span>
          </div>
          <select
            className={`${
              darkMode.isDarkMode
                ? "text-background-dark-200 bg-background-dark-300"
                : "focus:ring-primary-100 focus:border-primary-100 text-background-light-100 bg-primary-200"
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
