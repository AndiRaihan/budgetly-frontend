import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Convert, LoginResponse } from "../dtos/LoginResponse";
import { setToken, setId } from "../redux/AccountSlice";

type RegisterInput = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // TODO: Tambahin message kalo gagal login
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<RegisterInput>();

  async function submitLogin(data: RegisterInput) {
    let response = await fetch(
      "https://budgetly-backend-v2-production.up.railway.app/api/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.status === 200) {
      const loginResponse: LoginResponse = Convert.toLoginResponse(
        await response.text()
      );
      dispatch(setToken(loginResponse.accessToken));
      response = await fetch(
        "https://budgetly-backend-v2-production.up.railway.app/api/v1/auth/current",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + loginResponse.accessToken,
          },
        }
      );
      const accountInfo = await response.json();
      dispatch(setId(accountInfo.id));
      navigate("/");
      window.location.reload();
    } else {
      alert(await response.text());
    }
  }

  const onSubmit: SubmitHandler<RegisterInput> = (data) => submitLogin(data);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center"
    >
      <h1 className="text-3xl mb-3">Login to your account</h1>
      <div className="relative m-5">
        <input
          type="email"
          id="username"
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-background-light-100 rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          {...register("username", { required: true })}
        />
        <label
          htmlFor="username"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-background-light-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          Email
        </label>
      </div>
      <div className="relative m-5">
        <input
          type="password"
          id="password"
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-background-light-100 rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          {...register("password", { required: true })}
        />
        <label
          htmlFor="password"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-background-light-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          Password
        </label>
      </div>
      <div className="flex items-center justify-center w-1/3 h-8 my-4">
        <button
          type="submit"
          className="text-center text-background-light-200 bg-gradient-to-r from-[#D1CEF8] to-[#5D98E9] flex-1 rounded-md self-stretch"
        >
          Login
        </button>
      </div>
      <p className="text-gray-500 my-2">
        Dont't have an account?{" "}
        <Link to="/register" className="text-primary-200">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
