export default function HomeLoading() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
      <div className="absolute inset-0 bg-[radial-gradient(white,rgba(255,255,255,.2)_2px,transparent_40px)] bg-[length:50px_50px] opacity-10" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-12 flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 space-y-6">
          {/* Title skeleton */}
          <div className="h-16 bg-gray-700 rounded-lg w-3/4 animate-pulse" />
          
          {/* Text blocks skeleton */}
          <div className="space-y-4">
            <div className="h-6 bg-gray-700 rounded w-full animate-pulse" />
            <div className="h-6 bg-gray-700 rounded w-5/6 animate-pulse" />
            <div className="h-6 bg-gray-700 rounded w-4/5 animate-pulse" />
          </div>

          {/* Buttons skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="h-12 bg-gray-700 rounded-lg w-40 animate-pulse" />
            <div className="h-12 bg-gray-700 rounded-lg w-40 animate-pulse" />
          </div>
        </div>

        {/* Image skeleton */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative w-full aspect-square max-w-[600px] mx-auto">
            <div className="absolute inset-0 bg-gray-700 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
} 