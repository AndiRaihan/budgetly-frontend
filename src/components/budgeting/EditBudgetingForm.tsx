import { Controller, SubmitHandler, useForm } from "react-hook-form";
import IconWarning from "../../assets/icon _warning_.svg";
import Period from "../../utils/Period";
import CustomLighterSwitch from "../CustomLigherSwitch";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export type BudgetingInput = {
  title: string;
  amount: number | null;
  period: Period;
  budgetDate: Date;
  trackType: boolean;
  category: string;
};

type EditBudgetingFromProps = {
  showForm: boolean;
  closeForm: () => void;
  budgetingStatus: BudgetingInput;
};
export default function EditBudgetingForm({
  showForm,
  closeForm,
  budgetingStatus,
}: EditBudgetingFromProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid },
    watch,
  } = useForm<BudgetingInput>({
    defaultValues: budgetingStatus,
  });

  const handleReset = () => {
    closeForm();
    reset(budgetingStatus);
  };

  const onSubmit: SubmitHandler<BudgetingInput> = (data) => console.log(data);

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
      } transition-all ease-in-out shrink-0 duration-300 flex flex-col justify-center w-11/12 overflow-hidden rounded-2xl`}
      noValidate
    >
      <input
        id="title"
        type="text"
        className={`
        bg-transparent placeholder-background-light-100 focus:placeholder-background-light-300 text-background-light-100 outline-none`}
        placeholder="Title"
        {...register("title", {
          required: "Tracking name is required",
        })}
      />
      <div className="my-1 w-full">
        <input
          id="amount"
          type="number"
          className={`
          ${
            darkMode.isDarkMode
              ? "text-background-dark-200"
              : "text-background-light-100"
          }
          bg-transparent placeholder-background-light-100 focus:placeholder-background-light-300 text-background-light-100 text-4xl w-full outline-none`}
          placeholder="Target Amount"
          {...register("amount", {
            required: "Amount is required",
            valueAsNumber: true,
          })}
        />
      </div>

      <div className="flex flex-col gap-5 md:flex-row justify-between items-center">
        <div className="flex flex-col gap-5 md:flex-row">
          <select
            className={` ${
              darkMode.isDarkMode
                ? "text-background-dark-200 bg-background-dark-300"
                : "focus:ring-primary-100 focus:border-primary-100 bg-primary-200"
            } 
            focus:border py-1 rounded-md transition-colors duration-300 text-background-light-100 outline-none`}
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
                  ? "text-background-dark-200 bg-background-dark-300"
                  : "focus:ring-primary-100 focus:border-primary-100 bg-primary-200"
              } 
              focus:border mx-2 py-1 rounded-md transition-colors duration-300 text-background-light-100 outline-none`}
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
            className={` ${
              darkMode.isDarkMode
                ? "text-background-dark-200 bg-background-dark-300"
                : "focus:ring-primary-100 focus:border-primary-100 bg-primary-200"
            } focus:border px-2 py-1 rounded-md transition-colors duration-300 text-background-light-100 outline-none`}
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
            {/* TODO:Fix Switch display bug  */}
            <Controller
              name="trackType"
              control={control}
              render={({ field }) => <CustomLighterSwitch {...field} />}
            />
            <span className="text-background-light-100 ml-0 mr-3">
              Recurring
            </span>
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
