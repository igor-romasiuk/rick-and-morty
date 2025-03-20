import { Suspense } from "react"
import Link from "next/link"
import { characterService } from "@/services/api"
import { Pagination } from "@/components/pagination"
import { CharacterFilters } from "@/components/characters/CharacterFilters"
import { CharacterCard } from "@/components/characters/character-card"
import { CharactersGridSkeleton } from "./loading"

interface SearchParams {
  page?: string
  status?: string
  species?: string
  gender?: string
  name?: string
}

interface ApiParams {
  page: number
  status?: string
  species?: string
  gender?: string
  name?: string
}
interface Props {
  searchParams: Promise<SearchParams>
}

export default async function CharactersPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const status = params.status || ""
  const species = params.species || ""
  const gender = params.gender || ""
  const name = params.name || ""

  const apiParams: ApiParams = { page }
  if (status && status !== "all") apiParams.status = status
  if (species && species !== "all") apiParams.species = species
  if (gender && gender !== "all") apiParams.gender = gender
  if (name) apiParams.name = name

  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-black min-h-screen">
      <div className="flex items-center mb-4">
        <Link href="/" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
          Home
        </Link>
        <span className="mx-2 text-gray-400">&gt;</span>
        <span className="text-gray-600 dark:text-white">Characters</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">Characters</h1>

      <CharacterFilters
        status={status}
        species={species}
        gender={gender}
        search={name}
      />

      <Suspense fallback={<CharactersGridSkeleton />}>
        <CharactersList params={apiParams} />
      </Suspense>
    </div>
  )
}

async function CharactersList({ params }: { params: ApiParams }) {
  try {
    const { results: characters, info } = await characterService.getCharacters(params)

    if (!characters.length) {
      return (
        <div className="col-span-full text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">No characters found</p>
          <Link 
            href="/characters"
            className="inline-flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-500/20 rounded-md"
          >
            Clear Filters
          </Link>
        </div>
      )
    }

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {characters.map((character, index) => (
            <CharacterCard
              key={character.id}
              id={character.id}
              name={character.name}
              status={character.status}
              species={character.species}
              image={character.image}
              index={index}
            />
          ))}
        </div>

        <Pagination
          currentPage={params.page}
          totalPages={info.pages}
          baseUrl="/characters"
          query={{
            ...(params.status && { status: params.status }),
            ...(params.species && { species: params.species }),
            ...(params.gender && { gender: params.gender }),
            ...(params.name && { name: params.name })
          }}
        />
      </>
    )
  } catch (error: unknown) {
    console.error("Failed to fetch characters:", error)
    return (
      <div className="text-center py-8">
        <p className="text-red-600 dark:text-red-400 mb-4">Failed to fetch characters</p>
        <Link 
          href="/characters"
          className="inline-flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-500/20 rounded-md"
        >
          Try Again
        </Link>
      </div>
    )
  }
}

