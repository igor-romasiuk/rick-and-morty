"use client"

import Image from "next/image"
import Link from "next/link"
import { Zap, Map } from "lucide-react"
import { SciFiButton } from "@/components/SciFiButton"

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(80vh-80px)] flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 dark:to-black opacity-70"></div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8 grid md:grid-cols-2 gap-8 items-center relative z-10">
        <div className="relative">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-green-400/20 dark:bg-green-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-400/20 dark:bg-blue-400/10 rounded-full blur-3xl"></div>

          <h1 className="text-4xl md:text-6xl font-bold mb-3 heading-sci-fi">
            <span className="text-green-600 dark:text-green-400 font-bold tracking-wider">Rick and Morty</span>
            <br />
            <span className="text-green-500 dark:text-green-300 font-bold tracking-wider">Multiverse Explorer</span>
          </h1>

          <p className="text-green-600 dark:text-green-400 font-bold mb-3 text-glow">Wubba Lubba Dub Dub!</p>

          <p className="text-xl mb-4 text-gray-700 dark:text-white">
            This ain&apos;t your regular ol&apos; project, Morty! It&apos;s{" "}
            <span className="text-green-600 dark:text-green-400 font-bold">THE</span> ultimate Rick and Morty
            experience!
          </p>

          <p className="mb-4 text-gray-600 dark:text-gray-300">
            We&apos;re talking interdimensional travel, portal guns, and enough sci-fi shenanigans to make your head
            spin! Come on, Morty, let&apos;s go on an adventure!
          </p>

          <p className="mb-6 text-gray-600 dark:text-gray-300">
            You ready for that kinda excitement? Eh, who cares, you&apos;re getting it anyway. Just don&apos;t turn
            into a pickle while you&apos;re exploring, alright?!
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/characters">
              <SciFiButton variant="primary" glowing>
                <Zap className="h-4 w-4" />
                Portal to Characters
              </SciFiButton>
            </Link>

            <Link href="/locations">
              <SciFiButton variant="outline">
                <Map className="h-4 w-4" />
                Explore Dimensions
              </SciFiButton>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl animate-portal-pulse"></div>
          <div className="relative aspect-[4/3] w-full max-w-lg mx-auto">
            <div className="absolute inset-0 rounded-full bg-green-500/20 dark:bg-green-500/30 blur-xl animate-portal-pulse"></div>
            <div className="absolute inset-0 rounded-full border-4 border-green-400/30 dark:border-green-400/50 animate-spin-slow"></div>
            <div
              className="absolute inset-0 rounded-full border-4 border-dashed border-blue-400/30 dark:border-blue-400/50 animate-spin-slow"
              style={{ animationDirection: "reverse" }}
            ></div>
            <Image
              src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
              alt="Rick and Morty"
              width={600}
              height={450}
              className="relative z-10 rounded-lg object-cover portal-border"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
} 