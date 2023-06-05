import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";
import axios from "axios";
import { server } from "../constants/constants";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import { Oval } from 'react-loading-icons'

const Register = () => {
  const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const form = useForm({
    mode: "onTouched",
  });

  const [userMsg, setUserMsg] = useState("");

  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;

  const formSubmit = async (values) => {
    const { name, email, password } = values;
    try {
      const { data } = await axios.post(
        `${server}/users/new`,
        { name, email, password },
        {
          withCredentials: true,
        }
      );
      //console.log(data);
      setUserMsg("");
      dispatch(setIsAuthenticated(true));
      toast.success("Account created successfully!");
    } catch (err) {
      //console.log(err.response.data.message);
      setUserMsg(err.response.data.message);
      dispatch(setIsAuthenticated(false))
    }
  };

  if(isAuthenticated) return <Navigate to='/' />
  
  return (
    <>
      <div className="bg-indigo-50 fixed inset-0 z-[-50]"></div>
      <div className="task-container">
        <div className="max-w-[500px] bg-white mx-auto px-4 mt-20 py-5 rounded-lg">
          <form noValidate onSubmit={handleSubmit(formSubmit)}>
            <div>
              <h1 className="text-center text-4xl font-poppins text-indigo-800 font-semibold">
                Register
              </h1>
              <hr className="w-[10%] mx-auto h-[5px] bg-indigo-700 mt-2" />
            </div>
            <div className="mt-12 flex flex-col gap-1">
              <label htmlFor="user" className="text-lg">
                Username
              </label>
              <input
                {...register("name", {
                  minLength: {
                    value: 3,
                    message: "Username should be atleast 3 characters long.",
                  },
                  required: {
                    value: true,
                    message: "Username is a required field.",
                  },
                })}
                type="text"
                className={`rounded-md ${
                  errors.name?.message && "border-red-500"
                }`}
                id="user"
                placeholder="Username"
              />
              {errors.name?.message && (
                <div className="flex items-center gap-1 error">
                  <BiErrorCircle />
                  <p className="error">{errors.name.message}</p>
                </div>
              )}
            </div>
            <div className="mt-3 flex flex-col gap-1">
              <label htmlFor="email" className="text-lg">
                Email
              </label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is a required field.",
                  },
                  validate: {
                    isEmail: (value) =>
                      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
                        value
                      ) || "Invalid email.",
                  },
                })}
                type="email"
                className={`rounded-md ${
                  errors.email?.message && "border-red-500"
                }`}
                id="email"
                placeholder="Email"
              />
              {errors.email?.message && (
                <div className="flex items-center gap-1 error">
                  <BiErrorCircle />
                  <p className="error">{errors.email.message}</p>
                </div>
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
                    message: "Password is a required field.",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be atleast 8 characters long.",
                  },
                  validate: {
                    noBlankSpaces: (value) =>
                      /^\S+$/.test(value) ||
                      "Password must not contain any blank spaces.",
                    containNumbers: (value) =>
                      /\d+/g.test(value) ||
                      "Password must contain atleast one number",
                    containSpecialChars: (value) =>
                      /[^a-zA-Z0-9\s]/g.test(value) ||
                      "Password must contain atleast one special character",
                  },
                })}
                type="password"
                className={`rounded-md ${
                  errors.password?.message && "border-red-500"
                }`}
                id="password"
                placeholder="Password"
              />
              {errors.password?.message && (
                <div className="flex items-center gap-1 error">
                  <BiErrorCircle />
                  <p className="error">{errors.password.message}</p>
                </div>
              )}
            </div>
            {userMsg && <p className="error mt-3">{userMsg}</p>}
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="px-5 py-2 rounded-md bg-indigo-500 text-white disabled:bg-indigo-300 flex items-center"
                disabled={isSubmitting}
              >
                <span>
                Sign Up
                </span>
                {isSubmitting && <Oval className="inline ml-2" height={'1.5em'} />}
              </button>
            </div>
            <div className="mt-5 text-center">
              <p>
                Already have an account? 
                <Link to={'/login'} className="text-indigo-600 font-medium"> Log In</Link>
              </p>
            </div>
          </form>

        </div>
      </div>
    </>
  );
};
export default Register;
