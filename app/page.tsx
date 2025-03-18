import { HeroSection } from "@/components/home/HeroSection"
import { ProfileCTA } from "@/components/home/ProfileCTA"
import { FeaturedCharacters } from "@/components/home/FeaturedCharacters"
import { LatestEpisodes } from "@/components/home/LatestEpisodes"
import { FeaturedLocations } from "@/components/home/FeaturedLocations"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/options"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const user = session?.user || null

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden">
      <HeroSection />
      <ProfileCTA user={user} />
      <FeaturedCharacters />
      <LatestEpisodes />
      <FeaturedLocations />
    </div>
  )
}

