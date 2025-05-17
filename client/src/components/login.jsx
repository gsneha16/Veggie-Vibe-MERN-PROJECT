import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const signIn = () => {
  const navigate = useNavigate();

  const [loginInfo, setloginInfo] = useState({
    username: "",
    contact: "",
    password: "",
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm();

  const onSubmit = async (data) => {
    setloginInfo(data);
    try {
      const url = "https://veggie-vibe-api.vercel.app/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);

      if (result.success) {
        toast.success(result.message);

        localStorage.setItem("token", result.jwtToken);
        localStorage.setItem("LoggedInUser", result.name);

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else if (result.error) {
        toast.error(result.error?.details[0].message);
      } else if (!result.success) {
        toast.error(result.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="mt-[60px] before:bg-[url(/bg.png)] h-[91vh] flex flex-col items-center justify-center relative w-full before:absolute before:inset-0 before:bg-cover before:bg-center before:opacity-70">
        {/* <div>
          {!isDirty && !isValid && (
            <div className="text-green-700 font-bold ">
              Submitted Sucessfully <i className="fa-solid fa-check"></i>
            </div>
          )}
        </div> */}

        <form
          onSubmit={handleSubmit(onSubmit)}
           className="relative z-10 flex flex-col items-center justify-between gap-5 p-5 bg-gray-200 rounded-xl w-[400px] h-[330px] font-semibold "
        >
          <h1 className="text-2xl font-bold">LogIn into your account</h1>

          <div className="flex gap-3 items-center">
            <label htmlFor="username" className="w-28">
              Username<span className="text-red-600">*</span>
            </label>
            <input
              placeholder="Enter Username"
              type="name"
              className="p-0.5 border-2 w-full bg-transparent border-none outline-none"
              {...register("username", { required: true })}
            />
          </div>
          <div className="flex gap-3 items-center ">
            <label htmlFor="contact" className="w-28">
              Contact<span className="text-red-600">*</span>
            </label>
            <input
              placeholder="Enter contact"
              type="contact"
              className="p-0.5 border-2 w-full bg-transparent border-none outline-none"
              {...register("contact", { required: true, minLength: 10 })}
            />
          </div>
          <div className="flex gap-3 items-center">
            <label htmlFor="password" className="w-28">
              Password<span className="text-red-600">*</span>
            </label>
            <input
              className="p-0.5 border-2 w-full bg-transparent border-none outline-none"
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && (
              <p className="text-red-700">{errors.password.message}</p>
            )}
          </div>

          <button
            type="logIn"
            className="bg-green-700 text-white py-1 px-3 rounded-lg scale-100 hover:scale-105 hover:bg-green-800 transition-all duration-200 ease-in-out"
          >
            LogIn
          </button>
          <p>
            Don't have an account?{" "}
            <NavLink
              className="text-blue-600 underline cursor-pointer"
              to="/signin"
            >
              SignIn
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
};

export default signIn;
