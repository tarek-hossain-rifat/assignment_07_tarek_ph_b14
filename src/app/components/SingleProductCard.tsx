import React from "react";
import type { Product } from "@/types";
import Link from "next/link";

interface SingleProductCardProps {
  product: Pick<
    Product,
    "slug" | "nameBn" | "today" | "change" | "image" | "unit"
  >;
}

const SingleProductCard = ({ product }: SingleProductCardProps) => {
  const isDown = product.change.dir === "down";

  const unitInBangla: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    litre: "লিটার",
    piece: "টি",
    dozen: "ডজন",
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="p-4 w-full bg-white rounded-xl shadow-md flex flex-col gap-1">
        <div className="flex flex-row items-center gap-2">
          <div className="p-3 bg-gray-400/18 border-0 rounded-xl">
            <span>{product.image}</span>
          </div>

          <div>
            <p className="font-bold">{product.nameBn}</p>
            <p className="font-light text-sm">
              প্রতি {unitInBangla[product.unit] || product.unit}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between pt-3">
          <div>
            <p className="text-gray-500 text-sm">আজকের দাম</p>
            <p>
              <span className="font-bold text-xl">
                {product.today.toLocaleString("bn-BD")}
              </span>
              <span className="pl-1 text-sm text-gray-500">টাকা</span>
            </p>
          </div>

          <div className="flex flex-col justify-end items-end">
            <div
              className={`w-20 p-1 flex flex-row items-center justify-center border-0 rounded-2xl text-sm ${
                isDown
                  ? "bg-green-300/20 text-green-600"
                  : "bg-red-300/20 text-red-600"
              }`}
            >
              <p>
                <span>{isDown ? "▼" : "▲"}</span>
                {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleProductCard;
