"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { episodeService } from "@/services/api"

interface EpisodesFiltersProps {
  search: string
  episodeCode: string
}

export function EpisodesFilters({
  search,
  episodeCode,
}: EpisodesFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const codeError = episodeCode && !episodeService.validateEpisodeCode(episodeCode) ? "Invalid format. Use SXXEXX (e.g., S01E01)" : null

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>, type: "name" | "episode") => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", "1")

    if (type === "name") {
      if (e.target.value) {
        params.set("name", e.target.value)
      } else {
        params.delete("name")
      }
    } else {
      const code = e.target.value.toUpperCase()
      if (code) {
        if (episodeService.validateEpisodeCode(code)) {
          params.set("episode", code)
        }
      } else {
        params.delete("episode")
      }
    }

    router.push(`/episodes?${params.toString()}`)
  }

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search episodes..."
          className="bg-white dark:bg-black/50 border-green-500/50 text-gray-800 dark:text-white placeholder:text-gray-400 focus:border-green-600 focus:ring-green-600/20"
          value={search}
          onChange={(e) => handleSearch(e, "name")}
        />
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Search by episode code (e.g. S01E01)"
          className={`bg-white dark:bg-black/50 border-green-500/50 text-gray-800 dark:text-white placeholder:text-gray-400 focus:border-green-600 focus:ring-green-600/20 ${
            codeError ? "border-red-500" : ""
          }`}
          value={episodeCode}
          onChange={(e) => handleSearch(e, "episode")}
        />
        {codeError && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">{codeError}</p>
        )}
      </div>
    </div>
  )
} 