"use client";

import React, { useState } from "react";
import type { Product } from "@/types";
import ProductSort from "./ProductSort";

interface CategoryContentProps {
  products: Product[];
  productCount: number;
  categoryName: string;
}

const CategoryContent = ({
  products,
  productCount,
  categoryName,
}: CategoryContentProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("all");

  const sortOptions = [
    { label: "ডিফল্ট", value: "all" },
    { label: "দামঃ কম থেকে বেশি", value: "low-to-high" },
    { label: "দামঃ বেশি থেকে কম", value: "high-to-low" },
  ];

  const handleSort = (value: string) => {
    setSelectedSort(value);
    setIsDropdownOpen(false);
  };

  return (
    <main className="max-w-7xl mx-auto p-6">
      {/* Category Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>

          <p className="text-sm text-gray-500 mt-1">
            মোট {productCount.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 bg-emerald-100 text-emerald-700 px-4 py-2.5 rounded-xl text-sm font-medium border border-emerald-200 hover:bg-emerald-200 transition-colors cursor-pointer"
          >
            <span>সাজান:</span>

            <span>
              {
                sortOptions.find((option) => option.value === selectedSort)
                  ?.label
              }
            </span>

            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
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
                d="m19 9-7 7-7-7"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-100 p-3 z-50">
              <p className="text-xs font-semibold text-gray-400 px-3 py-2">
                সাজানোর অপশন
              </p>

              <div className="space-y-1">
                {sortOptions.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => handleSort(option.value)}
                    className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      selectedSort === option.value
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {option.label}

                    {selectedSort === option.value && (
                      <svg
                        className="w-4 h-4 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m5 12 4 4L19 6"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Sorting and Grid */}
      <ProductSort
        products={products}
        productCount={productCount}
        selectedSort={selectedSort}
      />
    </main>
  );
};

export default CategoryContent;
