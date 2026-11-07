import React from "react";
import type { Product } from "@/types";
import Image from "next/image";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const isDown = product.change.dir === "down";
  const unitInBangla: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    litre: "লিটার",
    piece: "টি",
    dozen: "ডজন",
  };

  const priceUpOrDown = product.today - product.yesterday;
  const priceUpOrDownDec = () => {
    if (priceUpOrDown > 0) {
      return (
        <span>
          গতকালের তুলনায় আজ দাম <span className="font-bold">বেড়েছে</span> ·{" "}
          {priceUpOrDown.toLocaleString("bn-BD")} টাকা
        </span>
      );
    } else if (priceUpOrDown < 0) {
      return (
        <span>
          গতকালের তুলনায় আজ দাম <span className="font-bold">কমেছে</span> ·{" "}
          {Math.abs(priceUpOrDown).toLocaleString("bn-BD")} টাকা
        </span>
      );
    } else {
      return <span>আজ দাম অপরিবর্তিত</span>;
    }
  };

  const highestPrice = Math.max(...product.markets.map((market) => market.max));
  const lowestPrice = Math.min(...product.markets.map((market) => market.min));
  const avgPrice = Math.ceil((highestPrice+lowestPrice)/2)

  return (
    <section className="w-full flex flex-col justify-between items-center">
      <div className="w-full flex flex-row items-center justify-between bg-white border border-gray-100 rounded-2xl p-6">
        <div className="flex-1 flex flex-row items-center">
          <div className="p-6 bg-green-400/10 rounded-2xl">{product.image}</div>
          <div className="pl-4">
            <p className="text-2xl font-bold mb-1">{product.nameBn}</p>
            <p className="text-sm text-gray-400">
              প্রতি {unitInBangla[product.unit] || product.unit} ‧{" "}
              {product.categoryNameBn}
            </p>
            <p className="text-sm mt-1 text-gray-700">{priceUpOrDownDec()}</p>
          </div>
        </div>
        <div className="flex-1 flex flex-row items-center justify-end">
          <div className="rounded-2xl bg-green-400/10 p-4 flex flex-col gap-1 items-center justify-between">
            <p className="text-sm text-gray-400">আজকের দাম</p>
            <p className="text-2xl font-bold">
              {product.today.toLocaleString("bn-bd")}
            </p>
            <p className="text-sm text-gray-400">
              টাকা / {unitInBangla[product.unit] || product.unit}
            </p>

            <div className={`${isDown ? " text-green-600" : " text-red-600"}`}>
              <p>
                <span>{isDown ? "▼" : "▲"}</span>
                {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white border border-gray-100 rounded-2xl p-6 mt-5 flex flex-col">
        <div className="w-full flex flex-col justify-between">
          <p className="text-xl font-semibold">দামের সারসংক্ষেপ</p>
          <div className="w-full flex flex-row items-center justify-between gap-4 mt-4">
            <div className="flex-1 border border-gray-200 rounded-2xl px-7 py-4">
              <p className="text-sm text-gray-700">সর্বনিম্ন দাম</p>
              <p className="text-sm text-green-700">
                <span className="text-xl font-bold mr-1">
                  {lowestPrice.toLocaleString("bn-bd")}
                </span>
                টাকা
              </p>
              <p className="text-sm text-gray-700">সবচেয়ে কম দামের বাজার</p>
            </div>
            <div className="flex-1 border border-gray-200 rounded-2xl px-7 py-4">
              <p className="text-sm text-gray-700">সর্বাধিক দাম</p>
              <p className="text-sm text-red-600/80">
                <span className="text-xl font-bold mr-1">
                  {highestPrice.toLocaleString("bn-bd")}
                </span>
                টাকা
              </p>
              <p className="text-sm text-gray-700">সবচেয়ে বেশি দামের বাজার</p>
            </div>
            <div className="flex-1 border border-gray-200 rounded-2xl px-7 py-4">
              <p className="text-sm text-gray-700">গড় দাম</p>
              <p className="text-sm text-green-700">
                <span className="text-xl font-bold mr-1">
                  {avgPrice.toLocaleString("bn-bd")}
                </span>
                টাকা
              </p>
              <p className="text-sm text-gray-700">
                প্রতি {unitInBangla[product.unit] || product.unit}-এর হিসাবে
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between">
          <p className="text-xl font-semibold">বাজারভিত্তিক আজকের দাম</p>
          <div className="mt-4 w-full border border-gray-200 rounded-2xl p-6 overflow-hidden bg-[#f8faf8]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e5ebe6] text-[#77817a]">
                    <th className="px-4 py-3 font-semibold">বাজার</th>
                    <th className="px-4 py-3 font-semibold">বিভাগ</th>
                    <th className="px-4 py-3 text-right font-semibold">
                      সর্বনিম্ন
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      সর্বোচ্চ
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">গড়</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    product.markets.map((item, index) => {
                      const average = (item.min + item.max) / 2;

                      return (
                        <tr
                          key={index}
                          className="order-b border-[#dce3dc] last:border-0 even:bg-[#f0f4f0] hover:bg-[#e9f0e9] transition-colors"
                        >
                          <td className="px-4 py-3.5 font-medium text-[#26352b]">
                            {item.market}
                          </td>
                          <td className="px-4 py-3.5 text-[#46534a]">
                            {item.division}
                          </td>
                          <td className="px-4 py-3.5 text-right text-[#26352b]">
                            {item.min}
                          </td>
                          <td className="px-4 py-3.5 text-right text-[#26352b]">
                            {item.max}
                          </td>
                          <td className="px-4 py-3.5 text-right font-bold text-[#26352b]">
                            {average % 1 === 0 ? average : average.toFixed(2)}{" "}
                            টাকা
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
