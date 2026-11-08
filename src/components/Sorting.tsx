
"use client";

import { useState } from "react";
import ProductCard from "./Card";
import { Product } from "@/app/types/types";

interface SortingProps {
  product: Product[];
}

export default function Sorting({ product }: SortingProps) {
  const [sortby, setsortby] = useState("ডিফল্ট");

  // Copy products before sorting
  const sortedProducts = [...product];

  // Sorting functionality
  if (sortby === "দাম: কম – বেশি") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sortby === "দাম: বেশি – কম") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <section className="w-full">

      {/* Sorting Bar */}
      <div className=" cursor-pointer mb-3 flex items-center justify-end gap-2 rounded-xl border border-[#E1E9E1] bg-white/80 px-4 py-3">

        <label
          htmlFor="sorting"
          className="text-xs font-medium text-gray-500"
        >
          সাজান
        </label>

        <select
          id="sorting"
          value={sortby}
          onChange={(e) => setsortby(e.target.value)}
          className="select  select-sm h-9 min-h-9 rounded-lg border border-gray-200 bg-transparent text-xs text-[#26352B] outline-none focus:border-green-600"
        >
          <option value="ডিফল্ট">ডিফল্ট</option>
          <option value="দাম: কম – বেশি">
            দাম: কম – বেশি
          </option>
          <option value="দাম: বেশি – কম">
            দাম: বেশি – কম
          </option>
        </select>
      </div>
      {/* Product Count */}
      <div className="mb-20">
        <p className="text-xs font-medium text-gray-500">
          মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>


      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className=" cursor-pointer rounded-xl border border-[#E1E9E1] bg-white p-10 text-center">
          <p className="text-sm font-medium text-gray-500">
            কোনো পণ্য পাওয়া যায়নি!
          </p>
        </div>
      ) : (
        <div className=" cursor-pointer grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}

    </section>
  );
}
