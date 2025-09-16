"use client";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
function SignUpTemplate() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
        router.push("/");
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
    <div className="flex justify-center items-center mt-8 px-4 min-h-[75vh]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm md:max-w-[380px]"
      >
        <div className="rounded-xl shadow-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 md:p-6 space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-center text-black dark:text-orange-400">
            Sign Up 🎧
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm md:text-base">
            Create a new account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input
              type="text"
              placeholder="Username"
              {...register("userName", {
                required: "Username is required",
                pattern: {
                  value: /^[a-zA-Z0-9_]{3,}$/,
                  message: "Min 3 chars (letters, numbers, _)",
                },
              })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none text-sm"
            />
            {errors.userName && (
              <p className="text-red-500 text-xs">{errors.userName.message}</p>
            )}

            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 chars" },
              })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg text-sm transition"
            >
              {isSubmitting ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-2">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-orange-500 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default SignUpTemplate;
