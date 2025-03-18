"use client"

export function ProfileSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8 p-6 bg-white/90 dark:bg-black/60 rounded-lg shadow-md">
        <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="flex-1">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
        </div>
        <div className="w-24 h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/90 dark:bg-black/60 p-4 rounded-lg shadow-md">
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>

      <div className="bg-white/90 dark:bg-black/60 p-6 rounded-lg shadow-md">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
      </div>
    </div>
  )
} 