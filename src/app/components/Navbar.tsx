"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, toast } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CurrentDate from "./CurrentDate";
import { useSession, signOut } from "@/lib/auth-client";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

// Reusable toast helper
const showToast = (
  message: string,
  variant: "success" | "warning" | "danger",
) => {
  let toastId = "";

  toastId = toast(message, {
    variant,
    timeout: 4000,
    actionProps: {
      children: "বন্ধ করুন",
      onPress: () => toast.close(toastId),
    },
  });

  return toastId;
};

const Navbar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const router = useRouter();

  // Get logged-in user from Better Auth
  const { data: session, isPending } = useSession();

  const user = session?.user;

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/categories",
        );

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const result: Category[] = await res.json();
        setCategories(result);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Sign out
  const handleSignOut = async () => {
    try {
      await signOut();

      setIsDropdownOpen(false);

      showToast("আপনি সফলভাবে সাইন আউট করেছেন।", "success");

      setTimeout(() => {
        router.replace("/");
        router.refresh();
      }, 4000);
    } catch (error) {
      console.error("Sign out failed:", error);
      showToast("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।", "danger");
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Header Row */}
        <div className="flex flex-row justify-between items-center py-3">
          {/* Brand Logo & Date */}
          <div className="flex flex-row gap-3 items-center">
            <Link href="/" className="flex flex-row gap-3 items-center">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center p-2">
                <Image
                  src="/logo-icon.png"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="object-contain filter invert brightness-0"
                />
              </div>

              <div className="flex flex-col">
                <h1 className="font-bold text-xl leading-tight text-gray-900">
                  বাজার দর
                </h1>
                <CurrentDate />
              </div>
            </Link>
          </div>

          {/* Authentication Section */}
          {isPending ? (
            <div className="text-sm text-gray-400">Loading...</div>
          ) : user ? (
            <div className="relative">
              {/* User Profile Button */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
                aria-expanded={isDropdownOpen}
                aria-label="User profile menu"
              >
                {/* User Avatar */}
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-emerald-100 flex items-center justify-center">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      className="w-full h-full object-cover"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <span className="text-emerald-700 font-bold">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  )}
                </div>

                <span className="font-medium text-gray-800 text-sm">
                  {user.name?.split(" ")[0] || "User"}
                </span>

                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Card */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 z-50">
                  <div className="mb-4">
                    <p className="font-semibold text-gray-900 text-base">
                      {user.name}
                    </p>

                    <p className="text-sm text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    {/* Profile Link */}
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 text-sm font-medium py-1.5 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      আমার প্রোফাইল
                    </Link>

                    {/* Sign Out Button */}
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium py-1.5 w-full text-left transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      সাইন আউট
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Sign In & Sign Up Buttons */
            <div className="flex flex-row gap-2">
              <Link href="/sign-in">
                <Button className="bg-gray-100 text-black rounded-xl">
                  সাইন ইন
                </Button>
              </Link>

              <Link href="/sign-up">
                <Button className="bg-green-600 text-white rounded-xl">
                  সাইন আপ
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Categories Bar */}
        <div className="flex flex-row items-center gap-6 overflow-x-auto py-3 no-scrollbar">
          {loading ? (
            <p className="text-sm text-gray-400">Loading categories...</p>
          ) : (
            categories.map((category) => (
              <Link
                href={`/category/${category.slug}`}
                key={category.id}
                className="flex flex-row gap-1.5 items-center text-sm font-medium text-gray-700 hover:text-emerald-600 whitespace-nowrap transition-colors"
              >
                <span>{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
