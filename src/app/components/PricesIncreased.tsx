import React from "react";
import type { Product } from "@/types";
import SingleProductCard from "./SingleProductCard";

type PricesIncreasedProps = {
  products: Pick<Product, "nameBn" | "today" | "change" | "image">[];
};

const PricesIncreased = ({ products }: PricesIncreasedProps) => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-3">
        <span className="text-red-600">▲</span>আজ দাম বেড়েছে
      </h2>
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map((product) => (
            <SingleProductCard key={product.nameBn} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricesIncreased;
