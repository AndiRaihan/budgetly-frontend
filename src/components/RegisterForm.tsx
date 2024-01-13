import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type RegisterInput = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const EMAIL_REGEX =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const NORMAL_INPUT_CLASS =
    "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";

  const ERROR_INPUT_CLASS =
    "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none dark:text-white dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer";

  const NORMAL_LABEL_CLASS =
    "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-background-light-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1";

  const ERROR_LABEL_CLASS =
    "absolute text-sm text-red-600 dark:text-red-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-background-light-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>();

  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);

  useEffect(() => {
    setEmailValid(errors.email === undefined);
    setPasswordValid(errors.password === undefined);
    setConfirmPasswordValid(errors.confirmPassword === undefined);
  }, [errors.email, errors.password, errors.confirmPassword]);

  async function submitRegister(data: RegisterInput) {
    const response = await fetch(
      "https://budgetly-backend-v2-production.up.railway.app/api/v1/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.email,
          password: data.password,
        }),
      }
    );

    if (response.status === 201) {
      navigate("/login");
      console.log(response);
    } else if (response.status === 400) {
      alert(await response.text());
      console.log(response);
    }
  }

  const onSubmit: SubmitHandler<RegisterInput> = async (data) =>
    await submitRegister(data);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center"
      noValidate
    >
      <h1 className="text-3xl mb-3">Create your free account</h1>
      <div className="w-72 m-5">
        <div className="relative">
          <input
            type="email"
            id="email"
            className={emailValid ? NORMAL_INPUT_CLASS : ERROR_INPUT_CLASS}
            placeholder=" "
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: EMAIL_REGEX,
                message: "Please enter a valid Email",
              },
            })}
          />
          <label
            htmlFor="username"
            className={emailValid ? NORMAL_LABEL_CLASS : ERROR_LABEL_CLASS}
          >
            Email
          </label>
        </div>
        {!emailValid && (
          <span className="text-red-600 dark:text-red-500 text-sm ml-1">
            {errors.email?.message}
          </span>
        )}
      </div>
      <div className="w-72 mb-5">
        <div className="relative w-72">
          <input
            type="password"
            id="password"
            className={passwordValid ? NORMAL_INPUT_CLASS : ERROR_INPUT_CLASS}
            placeholder=" "
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: PASSWORD_REGEX,
                message:
                  "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
              },
            })}
          />
          <label
            htmlFor="password"
            className={passwordValid ? NORMAL_LABEL_CLASS : ERROR_LABEL_CLASS}
          >
            Password
          </label>
        </div>
        {!passwordValid && (
          <p className="text-red-600 dark:text-red-500 text-sm ml-1">
            {errors.password?.message}
          </p>
        )}
      </div>
      <div className="w-72 mb-5">
        <div className="relative">
          <input
            type="password"
            id="confirm_password"
            className={
              confirmPasswordValid ? NORMAL_INPUT_CLASS : ERROR_INPUT_CLASS
            }
            placeholder=" "
            {...register("confirmPassword", {
              required: "Please retype your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          <label
            htmlFor="confirm_password"
            className={
              confirmPasswordValid ? NORMAL_LABEL_CLASS : ERROR_LABEL_CLASS
            }
          >
            Confirm Password
          </label>
        </div>
        {!confirmPasswordValid && (
          <p className="text-red-600 dark:text-red-500 text-sm ml-1">
            {errors.confirmPassword?.message}
          </p>
        )}
      </div>
      <div className="flex items-center justify-center w-1/3 h-8 my-4">
        <button
          type="submit"
          className="text-center text-background-light-200 bg-gradient-to-r from-[#D1CEF8] to-[#5D98E9] flex-1 rounded-md self-stretch disabled:opacity-50"
          disabled={!(emailValid && passwordValid && confirmPasswordValid)}
        >
          Sign Up
        </button>
      </div>
      <p className="text-gray-500 my-2">
        Have an account?{" "}
        <Link to="/login" className="text-primary-200">
          Login Here
        </Link>
      </p>
    </form>
  );
}
