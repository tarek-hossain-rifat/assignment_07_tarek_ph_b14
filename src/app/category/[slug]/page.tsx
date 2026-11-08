import React, { Suspense } from "react";
import { connection } from "next/server";
import type { Product } from "@/types";
import CategoryContent from "../../components/CategoryContent";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryProducts = async ({ params }: CategoryPageProps) => {
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
    <CategoryContent
      products={products}
      productCount={productCount}
      categoryName={categoryName}
    />
  );
};

// Loading Component
const CategoryLoading = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />

      <div className="flex justify-end mb-6">
        <div className="h-10 w-40 bg-gray-200 rounded-xl animate-pulse" />
      </div>

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
