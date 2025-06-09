import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createUserAsync, selectError, setLoading, selectsuccessFlag } from "../../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import UserCreatedSuccessfullyPage from "./EmailSuccessUserCreated";

const RegistrationForm = () => {
  const loading = useSelector(setLoading);
  const error = useSelector(selectError);
  const successuser = useSelector(selectsuccessFlag);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notifyAdd = () => toast.success("User Created Successfully!");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(createUserAsync(data));
      notifyAdd();
      reset(); // Reset the form upon successful user creation
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/signup/usercreatedsuccessfully");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 flex justify-center items-center min-h-screen">
        <form
          className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:shadow-3xl"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-3xl font-bold mb-8 text-purple-700 text-center">
            Join YingKing Store
          </h2>

          {/* Name Field */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Name is required",
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10,}$/,
                  message: "Phone number must be at least 10 digits",
                },
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-700">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-purple-700 hover:text-purple-900 font-medium transition-all"
              >
                Login
              </button>
            </p>
          </div>
        </form>
      </div>

      {/* Show Success Page if User is Created */}
      {user && <UserCreatedSuccessfullyPage />}
    </>
  );
};

export default RegistrationForm;