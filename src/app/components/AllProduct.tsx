import React from "react";
import type { Product } from "@/types";
import SingleProductCard from "./SingleProductCard";

type AllProductsType = {
  products: Product[];
};

const AllProduct = ({ products }: AllProductsType) => {
  return (
    <section className="max-w-7xl mx-auto p-6 scroll-mt-35" id="all-products">
      <h2 className="text-2xl font-bold mb-4">সব পণ্য</h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <SingleProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10 bg-gray-50 rounded-xl">
          কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
};

export default AllProduct;
