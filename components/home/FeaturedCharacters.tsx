"use client"

import Image from "next/image"
import Link from "next/link"
import { SciFiButton } from "@/components/common/SciFiButton"
import { Carousel } from "@/components/ui/Carousel"
import { Character } from "@/types/api"

interface FeaturedCharactersProps {
  characters: Character[]
}

export function FeaturedCharacters({ characters }: FeaturedCharactersProps) {
  return (
    <section className="section-light py-16 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-sci-fi text-gray-900 dark:text-white">Featured Characters</h2>
          <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
            Meet some of the most iconic characters from across the multiverse. Each with their own unique story and
            dimension.
          </p>
        </div>

        <div className="characters-carousel-wrapper">
          <Carousel 
            maxItems={20} 
            scrollSpeed={0.08}
            slidesToShow={5}
            centerMode={true}
          >
            {characters.map((character: Character) => (
              <div key={character.id} className="px-2 py-1">
                <Link href={`/characters/${character.id}`} className="block h-full">
                  <div className="card group h-[260px] character-card">
                    <div className="aspect-square relative overflow-hidden rounded-lg w-full h-full">
                      <Image
                        src={character.image}
                        alt={character.name}
                        width={300}
                        height={300}
                        loading={character.id === 1 ? "eager" : "lazy"}
                        priority={character.id === 1}
                        className="object-cover w-full h-full transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                        <div className="text-white font-bold text-sm sm:text-lg truncate">{character.name}</div>
                        <div className="text-white/70 text-xs sm:text-sm mt-1">{character.species}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Carousel>
        </div>

        <div className="text-center mt-12">
          <Link href="/characters">
            <SciFiButton variant="outline" className="hover:scale-105 transition-transform duration-200 hover:brightness-110">
              View All Characters
            </SciFiButton>
          </Link>
        </div>
      </div>
    </section>
  )
} 