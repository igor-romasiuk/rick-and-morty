"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { useDebounce } from "../../hooks/use-debounce"

interface LocationFiltersProps {
  search: string
  type: string
  dimension: string
}

export function LocationFilters({
  search,
  type,
  dimension,
}: LocationFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(search)
  const debouncedSearch = useDebounce(searchValue, 500)

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", "1")
    if (debouncedSearch) {
      params.set("name", debouncedSearch)
    } else {
      params.delete("name")
    }
    router.push(`/locations?${params.toString()}`)
  }, [debouncedSearch, router, searchParams])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleFilter = (value: string, filterType: "type" | "dimension") => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all") {
      params.set(filterType, value)
    } else {
      params.delete(filterType)
    }
    params.set("page", "1")
    router.push(`/locations?${params.toString()}`)
  }

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search locations..."
            className="bg-white dark:bg-black/50 border-green-500/50 text-gray-800 dark:text-white placeholder:text-gray-400 focus:border-green-600 focus:ring-green-600/20"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>

        <div>
          <Select value={type} onValueChange={(value) => handleFilter(value, "type")}>
            <SelectTrigger className="bg-white dark:bg-black/50 border-green-500/50 text-gray-800 dark:text-white focus:border-green-600 focus:ring-green-600/20">
              <SelectValue placeholder="By type..." />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-black border-green-500/50">
              <SelectItem value="all" className="text-gray-800 dark:text-white">All</SelectItem>
              <SelectItem value="planet" className="text-gray-800 dark:text-white">Planet</SelectItem>
              <SelectItem value="space station" className="text-gray-800 dark:text-white">Space Station</SelectItem>
              <SelectItem value="microverse" className="text-gray-800 dark:text-white">Microverse</SelectItem>
              <SelectItem value="tv" className="text-gray-800 dark:text-white">TV</SelectItem>
              <SelectItem value="resort" className="text-gray-800 dark:text-white">Resort</SelectItem>
              <SelectItem value="fantasy town" className="text-gray-800 dark:text-white">Fantasy Town</SelectItem>
              <SelectItem value="dream" className="text-gray-800 dark:text-white">Dream</SelectItem>
              <SelectItem value="dimension" className="text-gray-800 dark:text-white">Dimension</SelectItem>
              <SelectItem value="menagerie" className="text-gray-800 dark:text-white">Menagerie</SelectItem>
              <SelectItem value="game" className="text-gray-800 dark:text-white">Game</SelectItem>
              <SelectItem value="customs" className="text-gray-800 dark:text-white">Customs</SelectItem>
              <SelectItem value="daycare" className="text-gray-800 dark:text-white">Daycare</SelectItem>
              <SelectItem value="dwarf planet" className="text-gray-800 dark:text-white">Dwarf Planet</SelectItem>
              <SelectItem value="miniverse" className="text-gray-800 dark:text-white">Miniverse</SelectItem>
              <SelectItem value="teenyverse" className="text-gray-800 dark:text-white">Teenyverse</SelectItem>
              <SelectItem value="box" className="text-gray-800 dark:text-white">Box</SelectItem>
              <SelectItem value="spacecraft" className="text-gray-800 dark:text-white">Spacecraft</SelectItem>
              <SelectItem value="artificial dream state" className="text-gray-800 dark:text-white">Artificial Dream State</SelectItem>
              <SelectItem value="unknown" className="text-gray-800 dark:text-white">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={dimension} onValueChange={(value) => handleFilter(value, "dimension")}>
            <SelectTrigger className="bg-white dark:bg-black/50 border-green-500/50 text-gray-800 dark:text-white focus:border-green-600 focus:ring-green-600/20">
              <SelectValue placeholder="By dimension..." />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-black border-green-500/50">
              <SelectItem value="all" className="text-gray-800 dark:text-white">All</SelectItem>
              <SelectItem value="Dimension C-137" className="text-gray-800 dark:text-white">Dimension C-137</SelectItem>
              <SelectItem value="Replacement Dimension" className="text-gray-800 dark:text-white">Replacement Dimension</SelectItem>
              <SelectItem value="Cronenberg Dimension" className="text-gray-800 dark:text-white">Cronenberg Dimension</SelectItem>
              <SelectItem value="Fantasy Dimension" className="text-gray-800 dark:text-white">Fantasy Dimension</SelectItem>
              <SelectItem value="Post-Apocalyptic Dimension" className="text-gray-800 dark:text-white">Post-Apocalyptic Dimension</SelectItem>
              <SelectItem value="Testicle Monster Dimension" className="text-gray-800 dark:text-white">Testicle Monster Dimension</SelectItem>
              <SelectItem value="Dimension 5-126" className="text-gray-800 dark:text-white">Dimension 5-126</SelectItem>
              <SelectItem value="Dimension K-83" className="text-gray-800 dark:text-white">Dimension K-83</SelectItem>
              <SelectItem value="Dimension J19ζ7" className="text-gray-800 dark:text-white">Dimension J19ζ7</SelectItem>
              <SelectItem value="Dimension D-99" className="text-gray-800 dark:text-white">Dimension D-99</SelectItem>
              <SelectItem value="Dimension D716" className="text-gray-800 dark:text-white">Dimension D716</SelectItem>
              <SelectItem value="Dimension D716-B" className="text-gray-800 dark:text-white">Dimension D716-B</SelectItem>
              <SelectItem value="Dimension D716-C" className="text-gray-800 dark:text-white">Dimension D716-C</SelectItem>
              <SelectItem value="Dimension K-22" className="text-gray-800 dark:text-white">Dimension K-22</SelectItem>
              <SelectItem value="Dimension unknown" className="text-gray-800 dark:text-white">Dimension unknown</SelectItem>
              <SelectItem value="unknown" className="text-gray-800 dark:text-white">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
} 