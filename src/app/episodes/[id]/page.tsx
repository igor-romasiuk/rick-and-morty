import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import Image from 'next/image';
import { Character } from "@/types/Character";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return Array.from({ length: 20 }, (_, i) => ({
    id: String(i + 1),
  }))
}

export default async function EpisodePage({ params }: PageProps) {
  const { id } = params;

  const response = await fetch(
    `https://rickandmortyapi.com/api/episode/${id}`
  );

  if (!response.ok) {
    return (
      <div className="text-center text-red-500 text-2xl mt-10">
        Episode not found
      </div>
    );
  }

  const episode = await response.json();
  const { name, air_date, episode: episodeCode, characters } = episode;

  const characterDetails = await Promise.all(
    characters.map(async (characterUrl: string) => {
      const characterResponse = await fetch(characterUrl);
      return await characterResponse.json();
    })
  );

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="w-full max-w-screen-xl px-6 py-4">
        <Breadcrumbs />
      </div>

      <div className="w-full max-w-screen-xl px-6 py-6 mx-auto bg-black rounded-lg shadow-xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-white uppercase tracking-wide text-shadow-md mb-4">
            {name}
          </h1>
          <p className="text-xl text-yellow-200">Air Date: {air_date}</p>
          <p className="text-xl text-yellow-200">Episode Code: {episodeCode}</p>
        </div>
      </div>

      <div className="w-full max-w-screen-xl px-6 py-6 mx-auto">
        <h2 className="text-2xl font-bold text-white mb-4">Characters in this episode:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {characterDetails.map((character: Character) => (
            <div
              key={character.id}
              className="bg-gradient-to-t from-green-700 to-green-900 p-4 rounded-lg shadow-xl transition-all hover:scale-105 hover:shadow-2xl hover:from-green-600 hover:to-green-800"
            >
              <Link href={`/characters/${character.id}`}>
                <div className="relative h-64 overflow-hidden rounded-t-lg">
                  <Image
                    src={character.image}
                    alt={character.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white uppercase tracking-wide text-shadow-md mb-2">
                    {character.name}
                  </h3>
                  <p className="text-yellow-200">Status: {character.status}</p>
                  <p className="text-yellow-200">Species: {character.species}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
