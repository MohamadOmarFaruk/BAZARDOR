
import Link from "next/link";
import { notFound } from "next/navigation";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
  markets: Market[];
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const formatPrice = (price: number) =>
  price.toLocaleString("bn-BD");

const unitNames: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  piece: "পিস",
  dozen: "ডজন",
};

export default async function ProductDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

  if (!API_URL) {
    throw new Error("API URL is not configured");
  }

  // First API: Find product using slug
  const productsResponse = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });

  if (!productsResponse.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await productsResponse.json();

  const selectedProduct = products.find(
    (item) => item.slug === slug
  );

  if (!selectedProduct) {
    notFound();
  }

  // Second API: Get single product details using ID
  const productResponse = await fetch(
    `${API_URL}/products/${selectedProduct.id}`,
    {
      cache: "no-store",
    }
  );

  if (!productResponse.ok) {
    throw new Error("Failed to fetch product details");
  }

  const product: Product = await productResponse.json();

  // Calculate market prices
  const markets = product.markets || [];

  const minPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : product.today;

  const maxPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : product.today;

  const averagePrice =
    markets.length > 0
      ? Math.round(
          markets.reduce(
            (total, market) =>
              total + (market.min + market.max) / 2,
            0
          ) / markets.length
        )
      : product.today;

  const unit = unitNames[product.unit] || product.unit;

  const isDown = product.change.dir === "down";
  const isUp = product.change.dir === "up";

  return (
    <main className="min-h-screen bg-[#F1F6F1] px-4 py-6">
      <div className="mx-auto max-w-6xl">

        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-600">
          <Link
            href="/"
            className="transition hover:text-green-700"
          >
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/category/${product.category}`}
            className="transition hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span>›</span>

          <span className="font-medium text-[#26352B]">
            {product.nameBn}
          </span>
        </nav>

        {/* Product Header */}
        <section className="mb-4 flex flex-col justify-between gap-5 rounded-2xl border border-[#E1E9E1] bg-white/80 p-5 sm:flex-row sm:items-center sm:p-6">

          <div className="flex items-center gap-4">

            {/* Product Image */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[#F1F6F1] text-4xl">
              {product.image || product.categoryIcon}
            </div>

            {/* Product Information */}
            <div>
              <h1 className="text-2xl font-extrabold text-[#26352B] sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {unit}
              </p>

              <p className="mt-2 text-sm text-gray-700">
                গতকালের তুলনায় আজকের দাম{" "}
                <span
                  className={`font-bold ${
                    isUp
                      ? "text-red-500"
                      : isDown
                      ? "text-emerald-600"
                      : "text-gray-600"
                  }`}
                >
                  {isUp
                    ? "বেড়েছে"
                    : isDown
                    ? "কমেছে"
                    : "অপরিবর্তিত"}
                </span>
                {" "}· {formatPrice(product.yesterday)} টাকা
              </p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="min-w-[130px] rounded-xl bg-[#F1F6F1] px-5 py-4 text-center sm:text-right">
            <p className="text-xs text-gray-500">
              আজকের দাম
            </p>

            <h2 className="text-3xl font-extrabold text-[#26352B]">
              {formatPrice(product.today)}
            </h2>

            <p className="text-xs text-gray-500">
              টাকা / {unit}
            </p>

            <p
              className={`mt-1 text-xs font-bold ${
                isUp
                  ? "text-red-500"
                  : isDown
                  ? "text-emerald-600"
                  : "text-gray-500"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
              {formatPrice(product.change.pct)}%
            </p>
          </div>
        </section>

        {/* Price Overview */}
        <section className="rounded-2xl border border-[#E1E9E1] bg-white/80 p-4 sm:p-5">

          <h2 className="mb-4 text-base font-bold text-[#26352B]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

            {/* Minimum Price */}
            <div className="rounded-xl border border-[#E1E9E1] bg-[#FAFCFA] p-4">
              <p className="text-xs text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <h3 className="mt-1 text-xl font-extrabold text-emerald-600">
                {formatPrice(minPrice)} টাকা
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            {/* Maximum Price */}
            <div className="rounded-xl border border-[#E1E9E1] bg-[#FAFCFA] p-4">
              <p className="text-xs text-gray-500">
                সর্বোচ্চ দাম
              </p>

              <h3 className="mt-1 text-xl font-extrabold text-red-500">
                {formatPrice(maxPrice)} টাকা
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            {/* Average Price */}
            <div className="rounded-xl border border-[#E1E9E1] bg-[#FAFCFA] p-4">
              <p className="text-xs text-gray-500">
                গড় দাম
              </p>

              <h3 className="mt-1 text-xl font-extrabold text-emerald-600">
                {formatPrice(averagePrice)} টাকা
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {unit}-এর গড় বাজারদর
              </p>
            </div>

          </div>

          {/* Market Price Table */}
          <h2 className="mb-3 text-base font-bold text-[#26352B]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-xl border border-[#E1E9E1]">
            <table className="w-full min-w-[650px] border-collapse text-sm">

              <thead>
                <tr className="bg-[#FAFCFA] text-gray-500">
                  <th className="px-4 py-3 text-left font-semibold">
                    বাজার
                  </th>

                  <th className="px-4 py-3 text-left font-semibold">
                    বিভাগ
                  </th>

                  <th className="px-4 py-3 text-right font-semibold">
                    সর্বনিম্ন
                  </th>

                  <th className="px-4 py-3 text-right font-semibold">
                    সর্বোচ্চ
                  </th>

                  <th className="px-4 py-3 text-right font-semibold">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => {
                  const average = Math.round(
                    (market.min + market.max) / 2
                  );

                  return (
                    <tr
                      key={`${market.market}-${index}`}
                      className="border-t border-[#E1E9E1] transition-colors odd:bg-white even:bg-[#F1F6F1] hover:bg-green-50"
                    >
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-[#26352B]">
                        {market.market}
                      </td>

                      <td className="px-4 py-3 text-gray-600">
                        {market.division}
                      </td>

                      <td className="px-4 py-3 text-right text-gray-700">
                        {formatPrice(market.min)} টাকা
                      </td>

                      <td className="px-4 py-3 text-right text-gray-700">
                        {formatPrice(market.max)} টাকা
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-right font-bold text-[#26352B]">
                        {formatPrice(average)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>

          {markets.length === 0 && (
            <p className="py-8 text-center text-sm text-gray-500">
              বর্তমানে কোনো বাজারের তথ্য পাওয়া যায়নি।
            </p>
          )}

        </section>
      </div>
    </main>
  );
}
