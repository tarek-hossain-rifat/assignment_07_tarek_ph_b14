"use client";

import React, { useMemo } from "react";
import type { Product } from "@/types";
import SingleProductCard from "./SingleProductCard";

interface ProductSortProps {
  products: Product[];
  productCount: number;
  selectedSort: string;
}

const ProductSort = ({
  products,
  productCount,
  selectedSort,
}: ProductSortProps) => {
  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (selectedSort) {
      case "low-to-high":
        return sorted.sort((a, b) => Number(a.today) - Number(b.today));

      case "high-to-low":
        return sorted.sort((a, b) => Number(b.today) - Number(a.today));

      default:
        return sorted;
    }
  }, [products, selectedSort]);

  return (
    <>
      {/* Products Grid */}
      {productCount > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {sortedProducts.map((product) => (
            <SingleProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl mt-6">
          <p className="text-gray-500">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</p>
        </div>
      )}
    </>
  );
};

export default ProductSort;
