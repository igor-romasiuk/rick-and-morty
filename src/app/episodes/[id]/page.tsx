import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

export default async function EpisodePage(props: { params: { id: string } }) {
  const params = await props.params;

  const response = await fetch(
    `https://rickandmortyapi.com/api/episode/${params.id}`
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
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="bg-gradient-to-t from-black to-gray-900 p-6 rounded-lg shadow-xl w-full max-w-screen-md">
        <Breadcrumbs />

        <h1 className="text-3xl font-extrabold text-center text-white uppercase tracking-wide text-shadow-md mb-4">
          {name}
        </h1>
        <p className="text-xl text-yellow-200 text-center">Air Date: {air_date}</p>
        <p className="text-xl text-yellow-200 text-center">Episode Code: {episodeCode}</p>
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-white">Characters in this episode:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-6">
            {characterDetails.map((character: any) => (
              <div
                key={character.id}
                className="bg-gradient-to-t from-green-700 to-green-900 p-4 rounded-lg shadow-xl transition-all hover:scale-105 hover:shadow-2xl hover:from-green-600 hover:to-green-800"
              >
                <Link href={`/characters/${character.id}`}>
                  <div className="overflow-hidden rounded-t-lg">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-64 object-cover mb-4 border-4 border-yellow-300 transition-transform duration-300 hover:border-green-500 hover:scale-105"
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
    </div>
  );
}