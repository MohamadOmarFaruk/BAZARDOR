
"use client";

import Marquee from "react-fast-marquee";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  categoryIcon: string;
  today: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
}

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="border-b border-gray-200 bg-[#f8faf8] py-2">

      <Marquee
        speed={40}
        pauseOnHover={true}
        gradient={false}
        autoFill={true}
      >
        {products.map((item) => (
          <Link
            key={item.id}
            href={`/product/${item.slug}`}
            className="flex items-center gap-2 px-5 border-r border-gray-300 whitespace-nowrap"
          >
            {/* Product Name */}
            <span className="text-sm">
              {item.categoryIcon} {item.nameBn}
            </span>

            {/* Current Price */}
            <span className="text-sm font-medium">
              ৳{item.today} টাকা/কেজি
            </span>

            {/* Price Change */}
            {item.change.dir === "up" ? (
              <span className="text-red-500 text-xs font-bold">
                ▲ {item.change.pct}%
              </span>
            ) : item.change.dir === "down" ? (
              <span className="text-green-600 text-xs font-bold">
                ▼ {item.change.pct}%
              </span>
            ) : (
              <span className="text-gray-500 text-xs font-bold">
                — অপরিবর্তিত
              </span>
            )}
          </Link>
        ))}
      </Marquee>

    </div>
  );
}
