"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

function SignInTemplate() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res.error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: res.error,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Welcome! 🎉",
        text: "You have successfully signed in.",
      }).then(() => {
        window.location.href = "/";
      });
    }
  };

  const handleOAuthSignIn = (provider) => {
    // provider: "google" | "github"
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className="flex items-center justify-center h-[80vh] px-4 mt-[50px]">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-md space-y-6 bg-white dark:bg-gray-900"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-purple-400">
          Sign In
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
          Welcome back! Please enter your details.
        </p>

        {/* Email */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg transition"
        >
          {isSubmitting ? "Loading..." : "Sign In"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleOAuthSignIn("google")}
            className="w-full flex items-center justify-center gap-2 border py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <FcGoogle size={22} />
            <span>Sign in with Google</span>
          </button>
          <button
            type="button"
            onClick={() => handleOAuthSignIn("github")}
            className="w-full flex items-center justify-center gap-2 border py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <FaGithub size={22} />
            <span>Sign in with GitHub</span>
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </motion.form>
    </div>
  );
}

export default SignInTemplate;
