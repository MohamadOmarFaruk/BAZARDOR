"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient, signIn } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড মিলছে না।");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name,
        email: email,
        password: password,
        image: "", // optional, this form has no image field
        callbackURL: "/sign-in", // optional, URL to redirect to after sign up
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const OnHandleGoogleSignUp = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/sign-in",
    });
  };

  const OnHandleGitHubSignUp = async () => {
    await signIn.social({
      provider: "github",
      callbackURL: "/sign-in",
    });
  };

  return (
    <main className="min-h-screen bg-[#f0f5f1] flex flex-col items-center justify-center px-4 py-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-2 text-sm text-gray-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="mt-8 w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-gray-800"
            >
              নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

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

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-sm font-medium text-gray-800"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="আবার লিখুন"
              minLength={8}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="container mx-auto btn group relative overflow-hidden rounded-xl border-0 bg-green-900 px-6 font-semibold text-white shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-green-800 hover:shadow-[0_8px_25px_rgba(20,83,45,0.4)] active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isSubmitting ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
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
            onClick={OnHandleGoogleSignUp}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FcGoogle className="text-lg" />
            Google
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={OnHandleGitHubSignUp}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaGithub className="text-lg" />
            GitHub
          </button>
        </div>

        <p className="mt-5 text-center text-sm text-gray-700">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/sign-in" className="font-medium text-green-600 hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <Link href="/" className="mt-6 text-sm text-gray-500 hover:text-gray-700">
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}