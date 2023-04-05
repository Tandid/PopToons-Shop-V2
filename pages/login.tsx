// @ts-nocheck

import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import { getError } from "../utils/error";

const LoginScreen: React.FC = (): React.ReactElement => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z0-9-.]+$/i;

  //? Has to do with Login
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const handleDemoLogin = async () => {
    setValue("email", "john@example.com");
    setValue("password", "123456");
  };

  return (
    <Layout title="Login">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        <form
          className="max-w-screen-md mx-auto"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-xl font-bold">Login</h1>

          {/* Email */}

          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Please Enter Email",
                pattern: {
                  value: { emailPattern },
                  message: "Invalid email address",
                },
              })}
              className="w-full"
              id="email"
              autoFocus
            />
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>

          {/* Password */}

          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="w-full"
              {...register("password", {
                required: "Please Enter Password",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              id="password"
              autoFocus
            />
          </div>

          {/* Login Button */}

          <div className="mb-4">
            <button className="primary-button">Login</button>
          </div>
          <div className="mb-4">
            <button className="secondary-button" onClick={handleDemoLogin}>
              Demo Login
            </button>
          </div>
          <div className="mb-4">
            Don&apos;t have an account? &nbsp;
            <Link
              className="text-sky-600 hover:text-sky-800"
              href={`/register?redirect=${redirect || "/"}`}
            >
              Register Here.
            </Link>
          </div>
        </form>
      </motion.div>
    </Layout>
  );
};

export default LoginScreen;
