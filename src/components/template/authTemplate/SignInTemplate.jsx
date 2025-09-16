"use client";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

function SignInTemplate() {
  const [showPassword, setShowPassword] = useState(false);
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
      Swal.fire({ icon: "error", title: "Login Failed", text: res.error });
    } else {
      Swal.fire({
        icon: "success",
        title: "Welcome! 🎉",
        text: "You have successfully signed in.",
      }).then(() => (window.location.href = "/"));
    }
  };

  const handleOAuthSignIn = (provider) =>
    signIn(provider, { callbackUrl: "/" });

  return (
    <div className="flex items-center justify-center min-h-[75vh] px-4 mt-8">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm md:max-w-[380px] p-4 md:p-6 rounded-xl shadow-md bg-white dark:bg-gray-900 space-y-4"
      >
        <h2 className="text-xl md:text-2xl font-bold text-center text-black dark:text-orange-400">
          Sign In
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
          Enter your email and password
        </p>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition text-sm"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition text-sm"
          />

          {/* 👁️ چشم درست شده */}
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-2 cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            {showPassword ? (
              <AiFillEye size={20} />
            ) : (
              <AiFillEyeInvisible size={20} />
            )}
          </span>

          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg text-sm transition"
        >
          {isSubmitting ? "Loading..." : "Sign In"}
        </button>

        <div className="flex items-center gap-2">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="text-gray-400 text-xs">or</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleOAuthSignIn("google")}
            className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm"
          >
            <FcGoogle size={18} />
            <span>Sign in with Google</span>
          </button>
          <button
            type="button"
            onClick={() => handleOAuthSignIn("github")}
            className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm"
          >
            <FaGithub size={18} />
            <span>Sign in with GitHub</span>
          </button>
        </div>

        <p className="text-center text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-2">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-orange-500 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </motion.form>
    </div>
  );
}

export default SignInTemplate;
