export function CharactersGridSkeleton() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="bg-gray-50 dark:bg-black/40 border border-green-500/30 rounded-lg p-4">
          <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
          <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
          <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded mb-1" />
          <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>
      ))}
    </>
  )
}

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-black min-h-screen">
      <div className="flex items-center mb-4">
        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
        <span className="mx-2 text-gray-400">&gt;</span>
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
      </div>

      <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded mx-auto mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 dark:bg-gray-800 rounded" />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <CharactersGridSkeleton />
      </div>
    </div>
  )
} 