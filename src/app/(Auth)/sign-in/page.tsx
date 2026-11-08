"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIsSubmitting(true);

    try {
      const { error } = await signIn.email({
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি। তথ্য যাচাই করে আবার চেষ্টা করুন।");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setIsSubmitting(true);

    try {
      const { error } = await signIn.social({ provider, callbackURL: "/" });
      if (error) {
        toast.error(error.message || "সোশ্যাল সাইন ইন করা যায়নি।");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "সোশ্যাল সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f5f1] flex flex-col items-center justify-center px-4 py-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">সাইন ইন</h1>
        <p className="mt-2 text-sm text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে চুকুন।
        </p>
      </div>

      <div className="mt-8 w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-gray-800"
            >
              ইমেইল
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-gray-800"
            >
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              minLength={8}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>
            <button disabled={isSubmitting} type="submit" className="container mx-auto btn group relative overflow-hidden rounded-xl border-0 bg-green-900 px-6 font-semibold text-white shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-green-800 hover:shadow-[0_8px_25px_rgba(20,83,45,0.4)] active:translate-y-0 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? "অপেক্ষা করুন..." : "সাইন ইন"}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSocialSignIn("google")}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
          >
            <FcGoogle className="text-lg" />
            Google
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
            onClick={() => handleSocialSignIn("github")}
          >
            <FaGithub className="text-lg" />
            GitHub
          </button>
        </div>

        <p className="mt-5 text-center text-sm text-gray-700">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-green-600 hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <Link
        href={"/"}
        className="mt-6 text-sm text-gray-500 hover:text-gray-700"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
