"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn, signUp } from "@/lib/auth-client";

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
      const { error } = await signUp.email({ name, email, password });

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

  const handleSocialSignUp = async (provider: "google" | "github") => {
    setIsSubmitting(true);

    try {
      const { error } = await signIn.social({ provider, callbackURL: "/" });

      if (error) {
        toast.error(error.message || "সোশ্যাল সাইন আপ করা যায়নি।");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "সোশ্যাল সাইন আপ করা যায়নি। আবার চেষ্টা করুন।"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-base-200 flex flex-col items-center justify-center px-4 py-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-2 text-sm opacity-70">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="card bg-base-100 shadow-xl w-full max-w-sm mt-8">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">নাম</legend>
              <input
                name="name"
                type="text"
                className="input w-full"
                placeholder="যেমন: রহিম উদ্দিন"
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">ইমেইল</legend>
              <input
                name="email"
                type="email"
                className="input w-full"
                placeholder="you@example.com"
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">পাসওয়ার্ড</legend>
              <input
                name="password"
                type="password"
                className="input w-full"
                placeholder="কমপক্ষে ৮ অক্ষর"
                minLength={8}
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">পাসওয়ার্ড নিশ্চিত করুন</legend>
              <input
                name="confirmPassword"
                type="password"
                className="input w-full"
                placeholder="আবার লিখুন"
                minLength={8}
                required
              />
            </fieldset>

            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-green-800 p-4 text-white rounded-2xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          <div className="divider text-xs opacity-60">অথবা</div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSocialSignUp("google")}
              className="btn btn-outline"
            >
              <FcGoogle className="text-lg" />
              Google
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSocialSignUp("github")}
              className="btn btn-outline"
            >
              <FaGithub className="text-lg" />
              GitHub
            </button>
          </div>

          <p className="text-center text-sm mt-4">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/sign-in" className=" text-green-600 font-semibold ">
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </div>

      <Link href="/" className="mt-6 text-sm opacity-60 hover:opacity-100">
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
