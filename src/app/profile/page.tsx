
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const user = session?.user;

  // Set current user's name
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  // Update Profile
  const handleUpdate = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম লিখুন");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch (error) {
      console.error(error);
      toast.error("কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/sign-in");
    } catch (error) {
      console.error(error);
      toast.error("সাইন আউট করা যায়নি");
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F1F6F1]">
        <span className="loading loading-spinner loading-lg text-green-700" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F1F6F1] px-4">
        <div className="rounded-2xl border border-[#E1E9E1] bg-white p-8 text-center">
          <h2 className="text-xl font-bold text-[#26352B]">
            আপনি লগইন করেননি
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            প্রোফাইল দেখতে প্রথমে লগইন করুন।
          </p>
          <button
            onClick={() => router.push("/sign-in")}
            className="btn mt-5 rounded-xl border-0 bg-green-700 px-8 text-white hover:bg-green-800"
          >
            লগইন করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F1F6F1] px-4 py-8">
      <div className="mx-auto max-w-4xl">

        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-[#26352B] sm:text-3xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Information Card */}
        <section className="mb-6 rounded-2xl border border-[#E1E9E1] bg-white/80 p-5 sm:p-6">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">

            {/* User Details */}
            <div className="flex w-full items-center gap-4">
              <div className="avatar">
                <div className="h-16 w-16 overflow-hidden rounded-2xl bg-[#F1F6F1]">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "Profile"}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-green-700">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold text-[#26352B] sm:text-xl">
                  {user.name}
                </h2>

                <p className="truncate text-sm text-gray-500 sm:text-base">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="btn btn-outline btn-error w-full rounded-xl sm:w-auto"
            >
              <span>↪</span>
              সাইন আউট
            </button>

          </div>
        </section>

        {/* Update Profile Card */}
        <section className="rounded-2xl border border-[#E1E9E1] bg-white/80 p-5 sm:p-6">

          <h2 className="mb-8 text-base font-bold text-[#26352B]">
            তথ্য
          </h2>

          <form
            onSubmit={handleUpdate}
            className="space-y-4 px-1 sm:px-5"
          >

            {/* Name Input */}
            <div className="form-control w-full">
              <label className="label" htmlFor="name">
                <span className="label-text text-sm font-medium text-[#26352B]">
                  নাম
                </span>
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="input input-bordered h-12 w-full rounded-xl border-[#E1E9E1] bg-transparent text-[#26352B] outline-none focus:border-green-600 focus:outline-none"
              />
            </div>

            {/* Update Button */}
            <button
              type="submit"
              disabled={loading || name.trim() === user.name}
              className="btn h-12 min-h-12 w-full rounded-xl border-0 bg-green-700 text-sm font-bold text-white shadow-md shadow-green-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800 disabled:bg-gray-300"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  আপডেট হচ্ছে...
                </>
              ) : (
                "আপডেট"
              )}
            </button>

          </form>
        </section>

      </div>
    </main>
  );
}
