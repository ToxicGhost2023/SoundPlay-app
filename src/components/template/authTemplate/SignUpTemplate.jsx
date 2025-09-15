"use client";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Link from "next/link";

function SignUpTemplate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Welcome 🎉",
          text: "Your account has been created successfully",
        });
      } else {
        const err = await res.json();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.error || err.message || "Something went wrong!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not connect to the server!",
      });
    }
  };

  return (
    <div className="flex justify-center items-center mt-[50px] px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-purple-400">
            Sign Up 🎧
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-6 text-sm">
            Create a new account to get started
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                placeholder="Choose a username"
                {...register("userName", {
                  required: "Username is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_]{3,}$/,
                    message:
                      "Must be at least 3 characters (letters, numbers, _)",
                  },
                })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
              Do you have an account?{" "}
              <Link
                href="/signin"
                className="text-blue-600 font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default SignUpTemplate;
