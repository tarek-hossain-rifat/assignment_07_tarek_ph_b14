import React from "react";
import type { Product } from "@/types";
import SingleProductCard from "./SingleProductCard";

type AllProductsType = {
  products: Pick<Product, "nameBn" | "today" | "change" | "image">[];
};

const AllProduct = ({ products }: AllProductsType) => {
  return (
    <section className="max-w-7xl mx-auto p-6 scroll-mt-35" id="all-products">
      <h2 className="text-2xl font-bold mb-3">সব পণ্য</h2>
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map((product) => (
            <SingleProductCard key={product.nameBn} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProduct;
