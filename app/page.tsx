import { HeroSection } from "@/components/home/HeroSection"
import { ProfileCTA } from "@/components/home/ProfileCTA"
import { FeaturedCharacters } from "@/components/home/FeaturedCharacters"
import { LatestEpisodes } from "@/components/home/LatestEpisodes"
import { FeaturedLocations } from "@/components/home/FeaturedLocations"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/options"
import { characterService } from "@/services/api/characters/character-service"
import { episodeService } from "@/services/api/episodes/episode-service"
import { locationService } from "@/services/api/locations/location-service"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const user = session?.user || null

  const [characters, episodes, locations] = await Promise.all([
    characterService.getCharacters({ page: 1 }),
    episodeService.getEpisodes({ page: 1 }),
    locationService.getLocations({ page: 1 })
  ])

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden">
      <HeroSection />
      <ProfileCTA user={user} />
      <FeaturedCharacters characters={characters.results} />
      <LatestEpisodes episodes={episodes.results} />
      <FeaturedLocations locations={locations.results} />
    </div>
  )
}

