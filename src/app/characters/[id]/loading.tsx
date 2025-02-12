export default function CharacterDetailLoading() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumbs skeleton */}
        <div className="h-6 bg-gray-700 rounded-md w-48 animate-pulse" />

        <div className="flex flex-col md:flex-row gap-8">
          {/* Image skeleton */}
          <div className="w-full md:w-1/3">
            <div className="aspect-square bg-gray-700 rounded-lg animate-pulse" />
          </div>

          {/* Content skeleton */}
          <div className="w-full md:w-2/3 space-y-6">
            <div className="h-8 bg-gray-700 rounded w-3/4 animate-pulse" />
            <div className="space-y-4">
              <div className="h-6 bg-gray-700 rounded w-1/2 animate-pulse" />
              <div className="h-6 bg-gray-700 rounded w-2/3 animate-pulse" />
              <div className="h-6 bg-gray-700 rounded w-1/3 animate-pulse" />
            </div>

            {/* Episodes list skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <div 
                  key={index}
                  className="h-16 bg-gray-700 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 