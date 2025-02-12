export default function EpisodeDetailLoading() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumbs skeleton */}
        <div className="h-6 bg-gray-700 rounded-md w-48 animate-pulse" />

        {/* Episode info skeleton */}
        <div className="space-y-6">
          <div className="h-8 bg-gray-700 rounded w-3/4 animate-pulse" />
          <div className="space-y-4">
            <div className="h-6 bg-gray-700 rounded w-1/3 animate-pulse" />
            <div className="h-6 bg-gray-700 rounded w-1/4 animate-pulse" />
          </div>
        </div>

        {/* Characters grid skeleton */}
        <div className="mt-8">
          <div className="h-6 bg-gray-700 rounded w-48 mb-6 animate-pulse" />
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div 
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden animate-pulse"
              >
                {/* Character image skeleton */}
                <div className="aspect-square bg-gray-700" />
                {/* Character info skeleton */}
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-700 rounded w-1/2" />
                  <div className="h-4 bg-gray-700 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 