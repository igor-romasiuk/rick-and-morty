import { characterService } from "@/services/api"
import { CharacterDetails } from "./CharacterDetails"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Props {
  params: Promise<{ id: string }>
}

export default async function CharacterDetailPage({ params }: Props) {
  const { id } = await params

  try {
    const character = await characterService.getCharacter(id)
    const episodes = await characterService.getCharacterEpisodes(character.episode)

    return <CharacterDetails character={character} episodes={episodes} />
  } catch (error: unknown) {
    console.error("Failed to fetch character:", error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-black/60 border border-green-500/30 rounded-lg overflow-hidden p-6 md:p-8 text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">
            Character not found
          </h1>
          <p className="mb-6">
            The character you&apos;re looking for doesn&apos;t exist in this dimension.
          </p>
          <Link href="/characters">
            <Button
              variant="outline"
              className="border-green-500 text-green-400 hover:bg-green-500/20"
            >
              Back to Characters
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}

