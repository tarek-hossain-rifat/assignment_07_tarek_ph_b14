import React from 'react';
import CurrentDate from "./CurrentDate";
import Image from 'next/image';
import { Button } from '@heroui/react';
import Link from 'next/link';

const HeroSection = () => {
    return (
      <div className="max-w-7xl w-full mx-auto mt-4 mb-4 p-6">
        <div className="flex flex-row items-center justify-between bg-white -0 rounded-xl p-5 shadow-sm">
          <div className="flex-1">
            <CurrentDate></CurrentDate>
            <p className="">আজকের বাজারের দাম এক নজরে</p>
            <p className="">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <Link href={"/"}>
              <Button className="bg-green-700 text-white border-md">সব পণ্য দেখুন</Button>
            </Link>
          </div>
          <div className="flex-1 flex flex-row items-center justify-end">
            <Image
              src={"/bazar-hero.png"}
              alt="Image"
              width={50}
              height={50}
            ></Image>
          </div>
        </div>
      </div>
    );
};

export default HeroSection;