"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { useDebounce } from "../../hooks/use-debounce"
import { CharacterFiltersProps } from "@/types/characters"

export function CharacterFilters({
  search,
  status,
  species,
  gender,
}: CharacterFiltersProps) {
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
    router.push(`/characters?${params.toString()}`)
  }, [debouncedSearch, router, searchParams])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleFilter = (value: string, type: "status" | "species" | "gender") => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all") {
      params.set(type, value)
    } else {
      params.delete(type)
    }
    params.set("page", "1")
    router.push(`/characters?${params.toString()}`)
  }

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search characters..."
            className="bg-white dark:bg-black/50 border-green-500/50 text-gray-800 dark:text-white placeholder:text-gray-400 focus:border-green-600 focus:ring-green-600/20"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>

        <div>
          <Select value={status} onValueChange={(value: string) => handleFilter(value, "status")}>
            <SelectTrigger className="bg-white dark:bg-black/50 border-green-500/50 text-gray-800 dark:text-white focus:border-green-600 focus:ring-green-600/20">
              <SelectValue placeholder="By status..." />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-black border-green-500/50">
              <SelectItem value="all" className="text-gray-800 dark:text-white">All</SelectItem>
              <SelectItem value="alive" className="text-gray-800 dark:text-white">Alive</SelectItem>
              <SelectItem value="dead" className="text-gray-800 dark:text-white">Dead</SelectItem>
              <SelectItem value="unknown" className="text-gray-800 dark:text-white">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={species} onValueChange={(value: string) => handleFilter(value, "species")}>
            <SelectTrigger className="bg-white dark:bg-black/50 border-green-500/50 text-gray-800 dark:text-white focus:border-green-600 focus:ring-green-600/20">
              <SelectValue placeholder="By species..." />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-black border-green-500/50">
              <SelectItem value="all" className="text-gray-800 dark:text-white">All</SelectItem>
              <SelectItem value="human" className="text-gray-800 dark:text-white">Human</SelectItem>
              <SelectItem value="alien" className="text-gray-800 dark:text-white">Alien</SelectItem>
              <SelectItem value="humanoid" className="text-gray-800 dark:text-white">Humanoid</SelectItem>
              <SelectItem value="poopybutthole" className="text-gray-800 dark:text-white">Poopybutthole</SelectItem>
              <SelectItem value="mythological" className="text-gray-800 dark:text-white">Mythological</SelectItem>
              <SelectItem value="robot" className="text-gray-800 dark:text-white">Robot</SelectItem>
              <SelectItem value="animal" className="text-gray-800 dark:text-white">Animal</SelectItem>
              <SelectItem value="disease" className="text-gray-800 dark:text-white">Disease</SelectItem>
              <SelectItem value="cronenberg" className="text-gray-800 dark:text-white">Cronenberg</SelectItem>
              <SelectItem value="unknown" className="text-gray-800 dark:text-white">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={gender} onValueChange={(value: string) => handleFilter(value, "gender")}>
            <SelectTrigger className="bg-white dark:bg-black/50 border-green-500/50 text-gray-800 dark:text-white focus:border-green-600 focus:ring-green-600/20">
              <SelectValue placeholder="By gender..." />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-black border-green-500/50">
              <SelectItem value="all" className="text-gray-800 dark:text-white">All</SelectItem>
              <SelectItem value="male" className="text-gray-800 dark:text-white">Male</SelectItem>
              <SelectItem value="female" className="text-gray-800 dark:text-white">Female</SelectItem>
              <SelectItem value="genderless" className="text-gray-800 dark:text-white">Genderless</SelectItem>
              <SelectItem value="unknown" className="text-gray-800 dark:text-white">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
} 