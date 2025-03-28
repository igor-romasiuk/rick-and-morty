import Link from "next/link"

interface CharacterBreadcrumbsProps {
  characterId: number
}

export function CharacterBreadcrumbs({ characterId }: CharacterBreadcrumbsProps) {
  return (
    <div className="flex items-center mb-4">
      <Link href="/" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
        Home
      </Link>
      <span className="mx-2 text-gray-500">&gt;</span>
      <Link href="/characters" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
        Characters
      </Link>
      <span className="mx-2 text-gray-500">&gt;</span>
      <span className="text-gray-900 dark:text-white">{characterId}</span>
    </div>
  )
} 