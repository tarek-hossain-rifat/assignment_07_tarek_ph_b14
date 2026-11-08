import React from "react";
import type { Product } from "@/types";
import SingleProductCard from "./SingleProductCard";

type PricesIncreasedProps = {
  products: Product[];
};

const PricesIncreased = ({ products }: PricesIncreasedProps) => {
  const increasedProducts = products.filter(
    (product) => product.change.dir === "up",
  );

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        <span className="text-red-600">▲</span> আজ দাম বেড়েছে
      </h2>

      {increasedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {increasedProducts.map((product) => (
            <SingleProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10 bg-gray-50 rounded-xl">
          আজ কোনো পণ্যের দাম বাড়েনি।
        </p>
      )}
    </section>
  );
};

export default PricesIncreased;
