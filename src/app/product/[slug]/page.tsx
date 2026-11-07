import React, { Suspense } from "react";
import { Product } from "@/types";
import ProductDetails from "@/app/components/ProductDetails"

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const DetailsComponents = async ({ params }: ProductPageProps) => {
  const { slug } = await params;

  let product: Product | null = null;

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products/${encodeURIComponent(slug)}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch product details");
    }

    const result = await res.json();

    product = result;
  } catch (error) {
    console.error("Product details fetch failed:", error);
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center">
        <h2 className="text-xl font-semibold">Product not found!</h2>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-6">
      <ProductDetails product={product} />
    </main>
  );
};

const ProductPage = ({ params }: ProductPageProps) => {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto p-6">
          <div className="h-80 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      }
    >
      <DetailsComponents params={params} />
    </Suspense>
  );
};

export default ProductPage;


