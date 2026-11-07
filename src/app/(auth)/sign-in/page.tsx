"use client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  InputGroup,
} from "@heroui/react";

import { Eye, EyeSlash } from "@gravity-ui/icons";
import React, { useState } from "react";
import { signIn } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignInPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    // Confirm password validation
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { data: resData, error } = await signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });

      if (error) {
        console.error("Sign in error:", error);
        alert(error.message);
        return;
      }

      if (resData) {
        router.replace("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Sign in error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const googleSignUp = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        console.error("Google sign up error:", error);
        alert(error.message);
      }
    } catch (error) {
      console.error("Google sign up error:", error);
      alert("Google sign up failed. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-7 mb-4 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-between">
        <h2 className="text-2xl font-bold">সাইন ইন</h2>

        <p className="text-sm text-gray-600 mt-2">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="card bg-white mt-4">
        <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label>ইমেইল</Label>
            <Input placeholder="you@example.com" />
            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }

              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }

              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }

              return null;
            }}
          >
            <Label>পাসওয়ার্ড</Label>

            <InputGroup>
              <InputGroup.Input
                name="password"
                className="w-full max-w-90"
                type={isVisible ? "text" : "password"}
                placeholder="কমপক্ষে ৮ অক্ষর"
              />

              <InputGroup.Suffix className="pe-0">
                <Button
                  isIconOnly
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  size="sm"
                  variant="ghost"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeSlash className="size-4" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>

            <Description />
            <FieldError />
          </TextField>

          {/* Submit Button */}
          <div className="flex flex-row gap-2 w-full items-center justify-center">
            <Button
              type="submit"
              className="w-full bg-green-700 text-white border-0 rounded-xl shadow-sm shadow-green-500"
            >
              সাইন ইন
            </Button>
          </div>
        </Form>

        {/* Divider */}
        <div className="w-full flex flex-row items-center justify-between px-5 my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <p className="flex-1 text-center text-sm">অথবা</p>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google Sign Up */}
        <div className="w-full flex flex-row items-center justify-center">
          <Button
            className="w-full bg-white text-gray-900 border border-gray-200 rounded-xl"
            onPress={googleSignUp}
          >
            <span>
              <Image
                src="/icons8-google-48.png"
                alt="Google"
                height={20}
                width={20}
              />
            </span>
            Sign up with Google
          </Button>
        </div>
        <div className="flex flex-row text-sm gap-1 items-center justify-center mt-4 mb-2">
          <p>অ্যাকাউন্ট নেই?</p>
          <Link href={"/sign-up"}>
            <span className="text-green-600"> সাইন আপ করুন</span>
          </Link>
        </div>
      </div>
      <div className="text-gray-400 text-sm mt-5">
        <p>
          <Link href={"/"}>← হোম পেজে ফিরে যান</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
