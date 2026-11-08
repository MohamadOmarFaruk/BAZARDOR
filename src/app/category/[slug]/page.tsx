
import Sorting from "@/components/Sorting";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // First API: Category details
  const categoryResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/categories/${slug}`,
    { cache: "no-store" }
  );

  if (!categoryResponse.ok) {
    throw new Error("Failed to fetch category");
  }

  const category = await categoryResponse.json();

  // Second API: Category products
  const productsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/products?category=${slug}`,
    { cache: "no-store" }
  );

  if (!productsResponse.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await productsResponse.json();

  return (
    <main className="min-h-screen bg-[#F1F6F1] px-4 py-6">
      <div className="mx-auto max-w-6xl">

        {/* Category Header */}
        <section className="mb-4 flex items-center gap-4 rounded-2xl border border-[#E1E9E1] bg-white/80 px-5 py-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F1F6F1] text-3xl">
            {category.icon}
          </div>

          <div>
            <h1 className="text-xl font-bold text-[#26352B]">
              {category.nameBn}
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        {/* Sorting and Products */}
        <section className="rounded-2xl border border-[#E1E9E1] bg-white/80 p-3">
          <Sorting product={products} />
        </section>

      </div>
    </main>
  );
}
