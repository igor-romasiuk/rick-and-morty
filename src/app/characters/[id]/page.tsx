import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import Image from 'next/image';

export async function generateStaticParams() {
  return Array.from({ length: 20 }, (_, i) => ({
    id: String(i + 1),
  }))
}

export default async function CharacterPage(params: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params.params;
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );

  if (!response.ok) {
    return (
      <div className="text-center text-red-500 text-2xl mt-10">
        Character not found
      </div>
    );
  }

  const character = await response.json();
  const { name, image, status, species, gender, origin, location, episode } = character;

  const episodeLocations = await Promise.all(
    episode.map(async (url: string) => {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return {
          id: data.id,
          name: data.name,
        };
      }
      return { id: null, name: "Unknown location" };
    })
  );

  return (
    <div className="min-h-screen bg-black text-white px-6 flex flex-col">
      <div className="py-4 px-4">
        <Breadcrumbs />
      </div>

      <div className="flex justify-center flex-1">
        <div className="flex flex-col md:flex-row bg-gray-800 rounded-3xl shadow-2xl p-10 md:p-16 w-full max-w-screen-lg">
          <div className="flex justify-center items-center">
            <Image
              src={image}
              alt={`Image of ${name}`}
              width={300}
              height={300}
              className="border-8 border-green-400"
              priority
            />
          </div>

          <div className="flex flex-col justify-center md:ml-12 mt-8 md:mt-0 text-center md:text-left space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-green-400">{name}</h1>
            <p className="text-xl md:text-2xl text-gray-300">
              <span className="font-semibold text-green-400">Status:</span> {status}
            </p>
            <p className="text-xl md:text-2xl text-gray-300">
              <span className="font-semibold text-green-400">Species:</span> {species}
            </p>
            <p className="text-xl md:text-2xl text-gray-300">
              <span className="font-semibold text-green-400">Gender:</span> {gender}
            </p>
            <p className="text-xl md:text-2xl text-gray-300">
              <span className="font-semibold text-green-400">Last known location:</span> {location.name}
            </p>
            <p className="text-xl md:text-2xl text-gray-300">
              <span className="font-semibold text-green-400">First seen in:</span> {origin.name}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-400 mb-6">
          Locations Visited
        </h2>
        <div className="bg-gray-800 rounded-3xl shadow-lg p-6 md:p-10">
          <ul className="space-y-4 text-center">
            {episodeLocations.map((loc) =>
              loc.id ? (
                <li key={loc.id} className="group">
                  <Link
                    href={`/locations/${loc.id}`}
                    className="block text-lg md:text-xl text-gray-300 bg-gray-700 rounded-lg py-3 px-5 hover:bg-green-500 hover:text-black transition-colors"
                  >
                    {loc.name}
                  </Link>
                </li>
              ) : (
                <li
                  key={loc.name}
                  className="text-lg md:text-xl text-gray-300 bg-gray-700 rounded-lg py-3 px-5"
                >
                  {loc.name}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
