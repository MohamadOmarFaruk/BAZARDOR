"use client";

import Link from "next/link";
import {
  FiHome,
  FiArrowLeft,
  FiShoppingBag,
} from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="flex min-h-[85vh] items-center justify-center bg-[#F1F6F1] px-4">
      <div className="w-full max-w-xl text-center">

        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="text-9xl font-black text-green-800">
            4
          </span>

          <div className="rounded-3xl border border-green-200 bg-white p-6 shadow-lg">
            <FiShoppingBag className="h-20 w-20 text-green-700" />
          </div>

          <span className="text-9xl font-black text-green-800">
            4
          </span>
        </div>

        <span className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-500">
          ERROR 404 · PAGE NOT FOUND
        </span>

        <h1 className="mt-6 text-3xl font-extrabold text-[#26352B]">
          ওহ! পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-4 text-sm leading-7 text-gray-500">
          আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
          ঠিকানাটি পরীক্ষা করুন অথবা হোম পেজে ফিরে যান।
        </p>

        <Link
          href="/"
          className="btn mt-8 rounded-xl border-0 bg-green-700 px-8 text-white hover:bg-green-800"
        >
          <FiHome size={18} />
          হোম পেজে ফিরে যান
        </Link>

        <button
          onClick={() => window.history.back()}
          className="btn btn-ghost mt-3 block w-full text-gray-600"
        >
          <FiArrowLeft size={17} />
          আগের পৃষ্ঠায় ফিরুন
        </button>

      </div>
    </main>
  );
}
