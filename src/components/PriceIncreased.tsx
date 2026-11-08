
"use client";

import { useEffect, useState } from "react";
import type { Product } from "../app/types/types";
import ProductCard from "./Card";

export default function PriceIncreased() {
  const [increasedPrice, setIncreasedPrice] = useState<Product[]>([]);
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
        setIncreasedPrice(data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const increasedProducts = increasedPrice.filter(
    (product) => product.change.dir === "up"
  );

  return (
    <section className="py-8 cursor-pointer">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-5 flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-lg font-bold text-red-500">
            ▲
          </span>

          <h2 className="text-xl font-black text-[#26352B]">আজ দাম বেড়েছে</h2>

          <span className="ml-2 inline-flex items-center rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600">
            {increasedProducts.length} টি পণ্য
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-green-700" />
          </div>
        ) : increasedProducts.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            বর্তমানে কোনো পণ্যের দাম বাড়েনি।
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {increasedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
