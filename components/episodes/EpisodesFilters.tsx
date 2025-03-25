"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { episodeService } from "@/services/api"
import { useEffect, useState } from "react"
import { useDebounce } from "../../hooks/use-debounce"

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
  const [searchValue, setSearchValue] = useState(search)
  const [codeValue, setCodeValue] = useState(episodeCode)
  const debouncedSearch = useDebounce(searchValue, 500)
  const debouncedCode = useDebounce(codeValue, 500)
  const codeError = codeValue && !episodeService.validateEpisodeCode(codeValue) ? "Invalid format. Use SXXEXX (e.g., S01E01)" : null

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", "1")

    if (debouncedSearch) {
      params.set("name", debouncedSearch)
    } else {
      params.delete("name")
    }

    if (debouncedCode && episodeService.validateEpisodeCode(debouncedCode)) {
      params.set("episode", debouncedCode)
    } else {
      params.delete("episode")
    }

    router.push(`/episodes?${params.toString()}`)
  }, [debouncedSearch, debouncedCode, router, searchParams])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>, type: "name" | "episode") => {
    if (type === "name") {
      setSearchValue(e.target.value)
    } else {
      setCodeValue(e.target.value.toUpperCase())
    }
  }

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search episodes..."
          className="bg-white dark:bg-black/50 border-green-500/50 text-gray-800 dark:text-white placeholder:text-gray-400 focus:border-green-600 focus:ring-green-600/20"
          value={searchValue}
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
          value={codeValue}
          onChange={(e) => handleSearch(e, "episode")}
        />
        {codeError && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">{codeError}</p>
        )}
      </div>
    </div>
  )
} 