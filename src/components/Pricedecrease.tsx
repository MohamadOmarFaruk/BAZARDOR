
"use client";

import { useEffect, useState } from "react";
import type { Product } from "../app/types/types";
import ProductCard from "./Card";

export default function Pricedecrease() {
  const [decreasingPrice, setDecreasingPrice] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Products
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data: Product[]) => {
        setDecreasingPrice(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter Decreased Products
  const decreasedProducts = decreasingPrice.filter(
    (product) => product.change.dir === "down"
  );

  return (
    <section className="cursor-pointer py-8">
      <div className="container mx-auto max-w-6xl px-4">

        {/* Section Heading */}
        <div className="mb-5 flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-lg font-bold text-emerald-500">
            ▼
          </span>

          <h2 className="text-xl font-black text-[#26352B]">
            আজ দাম কমেছে
          </h2>

          <span className="ml-2 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
            {decreasedProducts.length} টি পণ্য
          </span>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-green-700" />
          </div>
        ) : decreasedProducts.length === 0 ? (
          /* Empty State */
          <p className="py-8 text-center text-gray-500">
            বর্তমানে কোনো পণ্যের দাম কমেনি।
          </p>
        ) : (
          /* Decreased Products Grid */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {decreasedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
