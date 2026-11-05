"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import Image from "next/image";
import CurrentDate from "./CurrentDate";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navbar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-row justify-between items-center h-full">
            <div className="flex flex-row gap-2 items-center my-2">
              <div className="">
                <Image
                  src={`/logo-icon.png`}
                  alt="Logo"
                  width={40}
                  height={40}
                  className="p-3 bg-green-600 rounded-xl"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="font-bold text-xl">বাজার দর</h2>
                <CurrentDate />
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <Link href="/sign-in">
                <Button className="bg-gray-100 text-black rounded-xl">
                  সাইন ইন
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-green-600 rounded-xl">সাইন আপ</Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-row gap-2 my-3">
            {categories.map((category) => (
              <Link href={"/"} key={category.id}>
                <div className="flex flex-row gap-1 items-center p-2 border rounded-xl pointer-coarse:">
                  <p>{category.icon}</p>
                  <p>{category.nameBn}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
