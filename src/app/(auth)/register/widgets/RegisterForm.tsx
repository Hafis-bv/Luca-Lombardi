"use client";

import { GoogleIcon } from "@/assets/icons/GoogleIcon";
import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { useAuth } from "@/hooks/useAuth";
import { AuthFormData, authSchema, ErrorAuthState } from "@/schemas/auth";
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { z } from "zod";

export function RegisterForm() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorAuthState>({
    email: null,
    password: null,
    general: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { handleEmailRegister } = useAuth();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = authSchema.safeParse(formData);

    if (!result.success) {
      const flattened = z.flattenError(result.error);
      const fieldErrors = flattened.fieldErrors;

      setErrors({
        email: fieldErrors.email?.[0] ?? null,
        password: fieldErrors.password?.[0] ?? null,
        general: null,
      });
      return;
    }

    const { email, password } = result.data;

    setIsLoading(true);
    setErrors({
      email: null,
      password: null,
      general: null,
    });

    try {
      const user = await handleEmailRegister(email, password);
      console.log(user);
    } catch (err: any) {
      console.log(err);
      if (err instanceof FirebaseError) {
        const code = err.code || "";
        if (code == "auth/email-already-in-use") {
          setErrors({ ...errors, general: "Email is already in use" });
        } else if (code == "auth/weak-password") {
          setErrors({ ...errors, general: "Your password is weak" });
        } else if (code == "auth/invalid-email") {
          setErrors({ ...errors, general: "Invalid email address" });
        } else {
          setErrors({ ...errors, general: "Something went wrong" });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="pt-20 pb-30">
      <Container className="w-full sm:w-150 mx-auto">
        <div className="grid grid-cols-1 gap-5 shadow-2xl rounded-3xl p-8">
          <h1 className="text-4xl tracking-[2px] text-center mb-1">Sign Up</h1>
          <button className="w-full flex items-center justify-center gap-3 rounded-3xl py-3 font-medium border border-neutral-200 bg-white cursor-pointer transition xl:hover:shadow-md xl:hover:-translate-y-[1px] disabled:opacity-60 disabled:cursor-not-allowed">
            <span>
              <GoogleIcon />
            </span>
            Sign Up with Google
          </button>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-200"></div>
            <span className="text-xs text-neutral-500">OR</span>
            <div className="h-px flex-1 bg-neutral-200"></div>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
            <Input
              value={formData.email}
              onChange={handleChange}
              name="email"
              placeholder="Email"
              error={errors.email}
            />

            <div className="flex flex-col relative">
              <Input
                type={isPasswordShown ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                name="password"
                error={errors.password}
              />
              {errors.general && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-3 mt-5 text-sm text-red-700">
                  {errors.general}
                </div>
              )}
              <button
                type="button"
                onClick={() => setIsPasswordShown(!isPasswordShown)}
                className="absolute top-3 right-5 cursor-pointer"
              >
                {isPasswordShown ? <IoEyeOff size={22} /> : <IoEye size={22} />}
              </button>
            </div>
            <button
              disabled={isLoading}
              className="bg-black text-white font-medium tracking-[2px] py-3 rounded-3xl cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
            <span className="text-sm mx-auto">
              Already have an account?
              <Link
                href={"/login"}
                className="text-sky-500 xl:hover:underline ml-1"
              >
                Sign In
              </Link>
            </span>
          </form>
        </div>
      </Container>
    </div>
  );
}
