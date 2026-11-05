import React from "react";
import CurrentDate from "./CurrentDate";
import Image from "next/image";
import { Button } from "@heroui/react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="max-w-7xl w-full mx-auto mt-3 mb-4 p-6">
      <div className="flex flex-row items-center justify-between bg-white -0 rounded-xl p-5 shadow-sm">
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-row items-center">
            <div className="flex flex-col items-center justify-center bg-green-500/10 p-3 border-0 rounded-3xl text-green-600">
              <CurrentDate></CurrentDate>
            </div>
          </div>

          <p className="p-2 pb-5 text-3xl font-bold">
            আজকের বাজারের দাম এক নজরে
          </p>
          <p className="p-2 pb-4 text-gray-500">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <Link href={"/"}>
            <Button className="bg-green-700 text-white border-md border-0 rounded-xl shadow-sm shadow-green-300/5">
              সব পণ্য দেখুন
            </Button>
          </Link>
        </div>
        <div className="flex-1 flex flex-row items-center justify-end">
          <Image
            src="/bazar-hero.png"
            alt="Image"
            width={150}
            height={150}
            className="w-60 h-60 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
