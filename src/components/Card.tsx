import type { Product } from "../app/types/types";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const getChangeBadge = (dir: Product["change"]["dir"], pct: number) => {
  const percentage = Math.abs(pct).toLocaleString("bn-BD");

  if (dir === "up") {
    return {
      className:
        "border border-red-200 bg-red-50 text-red-600 shadow-sm shadow-red-100/60",
      label: `▲ ${percentage}%`,
    };
  }

  if (dir === "down") {
    return {
      className:
        "border border-emerald-200 bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-100/60",
      label: `▼ ${percentage}%`,
    };
  }

  return {
    className: "border border-slate-200 bg-slate-100 text-slate-500",
    label: "— ০%",
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const price = product.today.toLocaleString("bn-BD");
  const badge = getChangeBadge(product.change.dir, product.change.pct);
  const icon = product.image || product.categoryIcon || "🛒";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex h-full min-h-[148px] flex-col justify-between rounded-[18px] border border-[#dfe6df] bg-[#f7faf8] p-4 shadow-[0_1px_0_rgba(15,23,42,0.02)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e3e8e3] bg-white text-2xl shadow-sm">
          <span aria-hidden="true">{icon}</span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-gray-800">
            {product.nameBn}
          </h3>
          <p className="mt-1 text-[11px] text-gray-400">প্রতি {product.unit}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium text-gray-500">আজকের দাম</p>
          <p className="mt-1 text-lg font-extrabold tracking-tight text-gray-800">
            ৳{price}
            <span className="ml-1 text-[11px] font-semibold text-gray-500">টাকা</span>
          </p>
        </div>

        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>
    </Link>
  );
}
