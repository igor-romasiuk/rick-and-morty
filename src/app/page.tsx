'use client'

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
      <div className="absolute inset-0 bg-[radial-gradient(white,rgba(255,255,255,.2)_2px,transparent_40px)] bg-[length:50px_50px] opacity-10" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-12 flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-4xl sm:text-6xl font-mono font-bold text-green-500 mb-6 animate__animated animate__fadeIn">
            Rick and Morty Adventure
          </h1>
          
          <div className="font-mono space-y-4">
            <p className="text-lg text-gray-300 leading-relaxed">
              <span className="text-green-500">Wubba Lubba Dub Dub!</span> This ain&apos;t your regular ol&apos; project, 
              Morty! It&apos;s <span className="text-green-500">THE</span> ultimate Rick and Morty experience!
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              We&apos;re talking interdimensional travel, portal guns, and enough 
              sci-fi shenanigans to make your head spin! Come on, Morty, 
              let&apos;s go on an adventure!
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              You ready for that kinda excitement? Eh, who cares, 
              you&apos;re getting it anyway. Just don&apos;t turn into a pickle 
              while you&apos;re exploring, alright?!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              href="/characters"
              className="group relative px-8 py-3 text-lg font-mono font-bold text-white bg-green-500 rounded-lg 
                         hover:bg-green-600 transition-all duration-300 hover:scale-105"
            >
              Portal to Characters
              <div className="absolute inset-0 group-hover:opacity-30 rounded-lg" />
            </Link>

            <Link 
              href="/locations"
              className="px-8 py-3 text-lg font-mono font-bold text-green-500 border-2 border-green-500 
                         rounded-lg hover:bg-green-500/10 transition-all duration-300"
            >
              Explore Dimensions
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-1/2 relative">
          <div className="relative w-full aspect-square max-w-[600px] mx-auto">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl animate-[pulse_3s_ease-in-out_infinite]" />
            <div className="absolute inset-0 bg-green-400/10 rounded-full blur-2xl animate-[pulse_2s_ease-in-out_infinite]" />
            
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="w-full h-full animate-[spin_20s_linear_infinite] opacity-50 bg-gradient-to-r from-green-500/20 to-transparent" />
            </div>
            
            <Image 
              src="/home.png" 
              alt="Rick and Morty Portal"
              className="relative z-10 w-full h-full object-contain 
                       animate__animated animate__fadeIn animate__delay-1s
                       hover:scale-105 transition-transform duration-500
                       drop-shadow-[0_0_30px_rgba(34,197,94,0.3)]"
              width={600}
              height={600}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
