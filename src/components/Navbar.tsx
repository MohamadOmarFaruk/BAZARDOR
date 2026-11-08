"use client";

import { useSession, signOut } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = useSession();

  // Fetch categories
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/categories`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);

  // Sign out
  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  // Bangla date
  const today = new Date();

  const date = today.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

  return (
    <section className="sticky top-0 z-50 bg-white">
      {/* First Navbar */}
      <section className="border-b border-gray-100">
        <section className="container mx-auto flex justify-between items-center py-2">
          {/* Logo and Date */}
          <section className="flex gap-2 items-center">
            <Link href={"/"} className="cursor-pointer flex gap-2">
              <Image
                src="/Stack_logo.png"
                width={40}
                height={40}
                alt="Bazardor logo"
              />

              <section>
                <p className="font-semibold text-[15px]">বাজার দর</p>

                <p className="text-[12px]">{date}</p>
              </section>
            </Link>
          </section>

          {/* Authentication */}
          <section>
            {session?.user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="avatar avatar-placeholder cursor-pointer"
                >
                  <div className="bg-green-600 text-white w-10 rounded-full">
                    <span className="text-lg font-semibold">
                      {session.user.name?.trim().charAt(0).toUpperCase() ||
                        session.user.email?.charAt(0).toUpperCase() ||
                        "U"}
                    </span>
                  </div>
                </div>

                <ul
                  tabIndex={-1}
                  className="dropdown-content menu bg-base-100 rounded-box z-10 w-56 p-2 shadow-sm mt-2"
                >
                  <li className="menu-title whitespace-nowrap">
                    <span className="text-[15px] text-black">
                      {session.user.name}
                    </span>
                    <span className="text-[12px]">{session.user.email}</span>
                  </li>

                  <li>
                    <Link href="/profile" className="text-[14px]">
                      👤 আমার প্রোফাইল
                    </Link>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="text-red-500 text-[14px]"
                    >
                      ↩ সাইন আউট
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/sign-in">
                  <button className="btn btn-ghost font-medium">সাইন ইন</button>
                </Link>

                <Link href="/sign-up">
                  <button className="btn group relative overflow-hidden rounded-xl border-0 bg-green-900 px-6 font-semibold text-white shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-green-800 hover:shadow-[0_8px_25px_rgba(20,83,45,0.4)] active:translate-y-0 active:scale-95">
                    <span className="relative z-10 flex items-center gap-2">
                      সাইন আপ
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </button>
                </Link>
              </div>
            )}
          </section>
        </section>
      </section>

      {/* Second Navbar */}
      <section className="border-b border-gray-100">
        <section className="container mx-auto flex justify-start gap-6 py-3 overflow-x-auto">
          {categories.map((navbar) => {
            const isActive = pathname === `/category/${navbar.slug}`;

            return (
              <Link
                key={navbar.id}
                href={`/category/${navbar.slug}`}
                className={`whitespace-nowrap px-4 py-1 font-semibold rounded-lg transition-colors ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "text-black hover:bg-green-50"
                }`}
              >
                <span>{navbar.icon}</span> {navbar.nameBn}
              </Link>
            );
          })}
        </section>
      </section>
    </section>
  );
}
