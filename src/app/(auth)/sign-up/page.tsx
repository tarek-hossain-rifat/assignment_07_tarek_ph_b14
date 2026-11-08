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
  toast,
} from "@heroui/react";

import { Eye, EyeSlash } from "@gravity-ui/icons";
import React, { useEffect, useRef, useState, Suspense } from "react";
import { signUp, signIn, useSession } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// Reusable toast with 4-second duration and close button
const showToast = (
  message: string,
  variant: "success" | "warning" | "danger",
) => {
  let toastId = "";

  toastId = toast(message, {
    variant,
    timeout: 3000,
    actionProps: {
      children: "বন্ধ করুন",
      onPress: () => toast.close(toastId),
    },
  });

  return toastId;
};

const SignUpForm = () => {
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const { isPending } = useSession();

  const googleSuccessHandled = useRef(false);

  const requestedCallbackURL = searchParams.get("callbackURL");

  // Allow only internal URLs
  const callbackURL =
    requestedCallbackURL?.startsWith("/") &&
    !requestedCallbackURL.startsWith("//")
      ? requestedCallbackURL
      : "/";

  // Show Google sign-up success toast after OAuth redirect
  useEffect(() => {
    if (
      searchParams.get("googleSignUp") === "success" &&
      !googleSuccessHandled.current
    ) {
      googleSuccessHandled.current = true;

      showToast("Google sign-up successful!", "success");

      // Redirect after toast duration
      setTimeout(() => {
        router.replace(callbackURL);
        router.refresh();
      }, 3000);
    }
  }, [searchParams, router, callbackURL]);

  // Email and Password Sign Up
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    // Confirm password validation
    if (data.password !== data.confirmPassword) {
      showToast("Passwords do not match!", "warning");
      return;
    }

    try {
      const { data: resData, error } = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL,
      });

      if (error) {
        console.error("Sign up error:", error);

        showToast(
          error.message || "Sign up failed. Please try again.",
          "danger",
        );

        return;
      }

      if (resData) {
        showToast("Account created successfully!", "success");

        // Keep toast visible for 4 seconds before navigation
        setTimeout(() => {
          router.replace(callbackURL);
          router.refresh();
        }, 3000);

        return;
      }

      showToast("Unable to create your account. Please try again.", "danger");
    } catch (error) {
      console.error("Sign up error:", error);

      showToast("Something went wrong. Please try again.", "danger");
    }
  };

  // Google Sign Up
  const googleSignUp = async () => {
    try {
      if (isPending) return;

      // Redirect to sign-up page after successful Google authentication
      const googleCallbackURL = new URL("/sign-up", window.location.origin);

      googleCallbackURL.searchParams.set("googleSignUp", "success");
      googleCallbackURL.searchParams.set("callbackURL", callbackURL);

      const { error } = await signIn.social({
        provider: "google",
        callbackURL: googleCallbackURL.toString(),
      });

      if (error) {
        console.error("Google sign up error:", error);

        showToast(
          error.message || "Google sign up failed. Please try again.",
          "danger",
        );
      }
    } catch (error) {
      console.error("Google sign up error:", error);

      showToast("Google sign up failed. Please try again.", "danger");
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-between">
        <h2 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h2>

        <p className="text-sm text-gray-600 mt-2">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="card bg-white mt-4">
        <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
          {/* Name */}
          <TextField isRequired name="name" type="text">
            <Label>নাম</Label>
            <Input placeholder="যেমন: রহিম উদ্দিন" />
            <FieldError />
          </TextField>

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

          {/* Confirm Password */}
          <TextField
            isRequired
            minLength={8}
            name="confirmPassword"
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
            <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>

            <InputGroup>
              <InputGroup.Input
                name="confirmPassword"
                className="w-full max-w-90"
                type={isVisible ? "text" : "password"}
                placeholder="আবার লিখুন"
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
              অ্যাকাউন্ট তৈরি করুন
            </Button>
          </div>
        </Form>

        {/* Divider */}
        <div className="w-full flex flex-row items-center justify-between px-5">
          <div className="flex-1 h-px bg-gray-300" />
          <p className="flex-1 text-center text-sm">অথবা</p>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google Sign Up */}
        <div className="w-full flex flex-row items-center justify-center">
          <Button
            isDisabled={isPending}
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

        {/* Sign In Link */}
        <div className="flex flex-row text-sm gap-1 items-center justify-center mt-4 mb-2">
          <p>অ্যাকাউন্ট আছে?</p>

          <Link
            href={{
              pathname: "/sign-in",
              query: requestedCallbackURL ? { callbackURL } : {},
            }}
          >
            <span className="text-green-600">সাইন ইন করুন</span>
          </Link>
        </div>
      </div>

      {/* Home Link */}
      <div className="text-gray-400 text-sm mt-3">
        <p>
          <Link href="/">← হোম পেজে ফিরে যান</Link>
        </p>
      </div>
    </div>
  );
};

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto mt-7 flex justify-center">
          <p className="text-gray-500">লোড হচ্ছে...</p>
        </div>
      }
    >
      <SignUpForm />
    </Suspense>
  );
}
