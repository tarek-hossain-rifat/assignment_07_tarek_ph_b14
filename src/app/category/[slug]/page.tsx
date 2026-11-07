
import React, { Suspense } from "react";
import { connection } from "next/server";
import type { Product } from "@/types";
import SingleProductCard from "../../components/SingleProductCard";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryProducts = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  // Wait for an incoming request before rendering
  await connection();

  const { slug } = await params;

  let products: Product[] = [];

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(slug)}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch category products");
    }

    const result = await res.json();

    products = Array.isArray(result)
      ? result
      : Array.isArray(result.data)
        ? result.data
        : [];
  } catch (error) {
    console.error("Category products fetch failed:", error);
  }

  const productCount = products.length;
  const categoryName = products[0]?.categoryNameBn || slug;

  return (
    <main className="max-w-7xl mx-auto p-6">
      {/* Category Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {categoryName}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            এই ক্যাটাগরির সকল পণ্য
          </p>
        </div>

        <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl text-sm font-medium">
          মোট {productCount.toLocaleString("bn-BD")} টি পণ্য
        </div>
      </div>

      {/* Products Grid */}
      {productCount > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <SingleProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <p className="text-gray-500">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      )}
    </main>
  );
};

// Loading Component
const CategoryLoading = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-64 bg-gray-100 rounded-xl animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

// Main Page
const CategoryPage = ({ params }: CategoryPageProps) => {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryProducts params={params} />
    </Suspense>
  );
};

export default CategoryPage;