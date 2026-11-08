
export default function HomeLoading() {
  return (
    <main className="min-h-screen bg-[#F1F6F1] px-4 py-8">
      <div className="mx-auto max-w-6xl">

        {/* Hero Skeleton */}
        <div className="skeleton mb-8 h-64 w-full rounded-2xl" />

        {/* Section Heading */}
        <div className="skeleton mb-5 h-7 w-48" />

        {/* Product Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-green-100 bg-white p-4"
            >
              <div className="skeleton mb-4 h-36 w-full rounded-xl" />
              <div className="skeleton mb-3 h-5 w-3/4" />
              <div className="skeleton mb-3 h-4 w-1/2" />
              <div className="skeleton h-10 w-full rounded-lg" />
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
