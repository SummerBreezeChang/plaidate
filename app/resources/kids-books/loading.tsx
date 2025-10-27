export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Skeleton */}
          <aside className="w-64 flex-shrink-0">
            <div className="h-8 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
            <div className="space-y-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-100 rounded animate-pulse"></div>
              ))}
            </div>
          </aside>

          {/* Main Content Skeleton */}
          <main className="flex-1">
            <div className="mb-6">
              <div className="h-4 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-96 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>

            {/* Search Bar Skeleton */}
            <div className="mb-6">
              <div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>

            {/* Age Filters Skeleton */}
            <div className="mb-8">
              <div className="h-4 bg-gray-200 rounded w-24 mb-3 animate-pulse"></div>
              <div className="flex gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 w-24 bg-gray-100 rounded-full animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Books Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="aspect-[3/4] bg-gray-100 animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
