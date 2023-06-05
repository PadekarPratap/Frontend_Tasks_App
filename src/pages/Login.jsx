import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { server } from "../constants/constants";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "../redux/slices/userSlice";
import { Oval } from "react-loading-icons";
import { useState } from "react";

const Login = () => {
  const [userMsg, setUserMsg] = useState("");

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const form = useForm({
    mode: "onTouched",
  });
  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;
  const dispatch = useDispatch();

  const loginSubmit = async (values) => {
    //console.log(values);
    const { email, password } = values;
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log(data);
      toast.success(`${data.message}`);
      dispatch(setIsAuthenticated(true));
      setUserMsg("");
    } catch (err) {
      console.log(err);
      dispatch(setIsAuthenticated(false));
      setUserMsg(err.response.data.message);
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <>
      <div className="bg-indigo-50 fixed inset-0 z-[-50]"></div>
      <div className="task-container">
        <div className="max-w-[500px] bg-white mx-auto px-4 mt-20 py-5 rounded-lg">
          <form noValidate onSubmit={handleSubmit(loginSubmit)}>
            <div>
              <h1 className="text-center text-4xl font-poppins text-indigo-800 font-semibold">
                Log In
              </h1>
              <hr className="w-[10%] mx-auto h-[5px] bg-indigo-700 mt-2" />
            </div>
            <div className="mt-3 flex flex-col gap-1">
              <label htmlFor="email" className="text-lg">
                Email
              </label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is a required to login",
                  },
                  validate: {
                    isEmail: (value) =>
                      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
                        value
                      ) || "Invalid email.",
                  },
                })}
                type="email"
                className="rounded-md"
                id="email"
                placeholder="Email"
              />
              {errors.email?.message && (
                <p className="error">{errors.email.message}</p>
              )}
            </div>
            <div className="mt-3 flex flex-col gap-1">
              <label htmlFor="password" className="text-lg">
                Password
              </label>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required to login.",
                  },
                })}
                type="password"
                className="rounded-md"
                id="password"
                placeholder="Password"
              />
              {errors.password?.message && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>
            {userMsg && <p className="error my-4 text-center">{userMsg}</p>}
            <div className="mt-5 flex justify-center">
              <button
                type="submit"
                className="px-5 py-2 rounded-md bg-indigo-500 text-white disabled:bg-indigo-300 flex items-center"
                disabled={isSubmitting}
              >
                Log In
                {isSubmitting && <Oval height={"1.5em"} />}
              </button>
            </div>
            <div className="mt-5 text-center">
              <p>
                Don't have an Account?{" "}
                <Link to={"/register"} className="text-indigo-600 font-medium">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
