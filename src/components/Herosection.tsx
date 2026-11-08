
"use client";

import Image from "next/image";
import Link from "next/link";
import PriceIncreased from "./PriceIncreased";
import Pricedecrease from "./Pricedecrease";
import ProductCard from "./Card";
import { Product } from "@/app/types/types";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const today = new Date();

  const date = today.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="w-full px-4 pt-5">
      {/* Hero Banner */}
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-br from-[#F1F6F1] via-white to-[#E8F5E9]">

        {/* Decorative Background */}
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />

        <div className="relative grid min-h-[300px] items-center gap-6 px-6 py-8 sm:px-10 md:grid-cols-[1.3fr_0.7fr] md:px-12">

          {/* Left Content */}
          <div className="z-10">

            {/* Date Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-100/70 px-4 py-2 text-xs font-semibold text-green-800">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-600" />
              {date}
            </div>

            {/* Heading */}
            <h1 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-[#1C2B21] sm:text-4xl lg:text-[46px]">
              আজকের বাজারের দাম
              <span className="mt-1 block text-green-700">
                জানুন এক নজরে
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারদরভিত্তিক
              বিস্তারিত তথ্য, প্রতিদিনের সর্বশেষ আপডেট এবং দামের পরিবর্তন এক
              জায়গায়।
            </p>

            {/* CTA Button */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="#allproducts"
                className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-800 hover:shadow-xl"
              >
                সব পণ্য দেখুন
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex justify-center">
            <Image
              src="/bazar-hero.png"
              alt="Bazar hero illustration"
              width={200}
              height={200}
              priority
            />
          </div>
        </div>
      </div>

      {/* Increased and Decreased Products */}
      <PriceIncreased />
      <Pricedecrease />

      {/* All Products Section */}
      <section
        id="allproducts"
        className="scroll-mt-24 cursor-pointer py-8"
      >
        <div className="container mx-auto max-w-6xl px-4">

          <div className="mb-5 items-center gap-2.5">
            <h2 className="text-xl font-semibold text-[#26352B]">
              সব পণ্য
            </h2>

            <span className="text-[14px]">
              মোট {products.length}টি পণ্য দেখানো হচ্ছে
            </span>
          </div>

          {/* Loading Spinner */}
          {loading ? (
            <div className="flex justify-center py-10">
              <span className="loading loading-spinner loading-lg text-green-700"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {products.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          )}

        </div>
      </section>
    </section>
  );
}
