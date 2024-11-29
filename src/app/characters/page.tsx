import Link from "next/link";

export default async function CharactersPage() {
  const response = await fetch('https://rickandmortyapi.com/api/character')
  const data = await response.json()
  const characters = data.results

  return (
    <>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
        {characters.map((character) => {
          return (
            <li key={character.id} className="bg-white p-4 rounded-lg shadow-lg">
              <Link href={`/characters/${character.id}`}>
                <img
                  src={character.image}
                  alt={`Image of ${character.name}`}
                  className="w-full h-64 object-cover rounded-t-lg mb-4"
                />
                <h2 className="text-xl font-semibold text-center text-gray-800">{character.name}</h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}