"use client";

import HeroSection from "./components/HeroSection";
import { useEffect, useState } from "react";
import type { Product } from "@/types";
import PricesIncreased from "./components/PricesIncreased";
import PricesDecreased from "./components/PricesDecreased";
import AllProduct from "./components/AllProduct";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products",
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await res.json();

        const productData: Product[] = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : [];

        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const increasedProducts = products
    .filter((product) => product.change.dir === "up")
    .map((product) => ({
      nameBn: product.nameBn,
      today: product.today,
      change: product.change,
      image: product.image,
      unit: product.unit
    }));

  const decreasedProducts = products
    .filter((product) => product.change.dir === "down")
    .map((product) => ({
      nameBn: product.nameBn,
      today: product.today,
      change: product.change,
      image: product.image,
      unit: product.unit,
    }));

  const allProduct = products.map((product) => ({
    nameBn: product.nameBn,
    today: product.today,
    change: product.change,
    image: product.image,
    unit: product.unit,
  }));

  return (
    <div>
      <HeroSection />
      <PricesIncreased products={increasedProducts}></PricesIncreased>
      <PricesDecreased products={decreasedProducts}></PricesDecreased>
      <AllProduct products={allProduct}></AllProduct>
    </div>
  );
}
