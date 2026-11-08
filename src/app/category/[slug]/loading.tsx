
export default function CategoryLoading() {
  return (
    <main className="min-h-screen bg-[#F1F6F1] px-4 py-8">
      <div className="mx-auto max-w-6xl">

        {/* Category Header */}
        <div className="mb-5 flex items-center gap-4 rounded-2xl border border-green-100 bg-white p-5">
          <div className="skeleton h-14 w-14 rounded-xl" />

          <div className="flex-1">
            <div className="skeleton mb-3 h-6 w-40" />
            <div className="skeleton h-4 w-52" />
          </div>
        </div>

        {/* Sorting Skeleton */}
        <div className="mb-5 flex justify-end">
          <div className="skeleton h-10 w-36 rounded-lg" />
        </div>

        {/* Products Skeleton */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-green-100 bg-white p-4"
            >
              <div className="skeleton mb-4 h-32 w-full rounded-xl" />
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
