import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const url = "https://veggie-vibe-api.vercel.app/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        setTimeout(() => {
          navigate("/login");
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
      <form
          onSubmit={handleSubmit(onSubmit)}
         className="relative z-10 flex flex-col items-center justify-between gap-5 p-5 bg-gray-200 rounded-xl w-[400px] h-[350px] font-semibold "
        >
          <h1 className="text-2xl font-bold text-black">
            Create your account
          </h1>
          <div className="flex gap-3 items-center">
            <label htmlFor="username" className="w-28">
              Username<span className="text-red-600">*</span>
            </label>
            <input
              className="p-0.5 border-2 w-full bg-transparent border-none outline-none"
              placeholder="Enter your Name"
              {...register("username", {
                required: true,
              })}
            />
            {errors.username && (
              <p className="text-red-700">{errors.username.message}</p>
            )}
          </div>

          <div className="flex gap-3 items-center">
            <label htmlFor="email" className="w-28">
              Email
            </label>
            <input
              className="p-0.5 w-full bg-transparent border-none outline-none"
              type="email"
              placeholder="Enter Email Address"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-700">{errors.email.message}</p>
            )}
          </div>
          <div className="flex gap-3 items-center">
            <label htmlFor="contact" className="w-28">
              Contact<span className="text-red-600">*</span>
            </label>
            <input
              className="p-0.5 border-2 w-full bg-transparent border-none outline-none"
              placeholder="Enter Mobile Number "
              {...register("contact", {
                required: true,
                minLength: {
                  value: "10",
                  message: "Contact Number should be 10 digits",
                },
              })}
            />
            {errors.contact?.message && (
              <p className="text-red-700">{errors.contact?.message}</p>
            )}
          </div>

          <div className="flex gap-3 items-center">
            <label htmlFor="contact" className="w-28">
              Password<span className="text-red-600">*</span>
            </label>
            <input
              className="p-0.5 border-2 w-full bg-transparent border-none outline-none"
              placeholder="Create your Password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password?.message && (
              <p className="text-red-700">{errors.password?.message}</p>
            )}
          </div>

          <button
            type="SignIn"
            className="bg-green-700 text-white py-1 px-3 rounded-lg scale-100 hover:scale-105 hover:bg-green-800 transition-all duration-200 ease-in-out"
            >
            SignIn
          </button>
          <p>
            Don't have an account?{" "}
            <NavLink
              className="text-blue-600 underline cursor-pointer"
              to="/login"
            >
              LogIn
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
};

export default login;
