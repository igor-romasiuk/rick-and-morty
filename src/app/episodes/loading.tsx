export default function EpisodesLoading() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumbs skeleton */}
        <div className="h-6 bg-gray-700 rounded-md w-48 animate-pulse" />

        {/* Search and filter skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="h-12 bg-gray-700 rounded-lg animate-pulse" />
          <div className="h-12 bg-gray-700 rounded-lg animate-pulse" />
        </div>

        {/* Episodes grid skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors animate-pulse"
            >
              {/* Episode title skeleton */}
              <div className="h-7 bg-gray-700 rounded w-3/4 mb-4" />
              
              {/* Episode info skeletons */}
              <div className="space-y-3">
                <div className="h-5 bg-gray-700 rounded w-1/2" />
                <div className="h-5 bg-gray-700 rounded w-2/3" />
              </div>
              
              {/* View details button skeleton */}
              <div className="h-10 bg-gray-700 rounded-lg w-full mt-6" />
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(5)].map((_, index) => (
            <div 
              key={index}
              className="w-10 h-10 bg-gray-700 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
} 