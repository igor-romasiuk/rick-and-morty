import { Character } from '@/types/Character';
import { getPaginationRange } from '@/helpers/paginationUtils';
import Pagination from '@/components/Pagination';
import { SelectClient } from '@/components/ui/select'; // Імпортуємо SelectClient
import Link from 'next/link';

interface CharactersPageProps {
  searchParams: { page?: string, limit?: string };
}

export default async function CharactersPage({
  searchParams,
}: CharactersPageProps) {

  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const limit = Number(params.limit) || 4;

  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${currentPage}`
  );
  const data = await response.json();

  const characters = data.results.slice(0, limit);
  const totalPages = Math.ceil(data.info.count / limit);

  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="flex justify-end p-4">
        <SelectClient value={limit.toString()} />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 animate-fadeIn">
        {characters.map((character: Character) => (
          <li
            key={character.id}
            className="bg-gradient-to-t from-green-500 to-green-700 p-4 rounded-lg shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-green-800 hover:rotate-2"
          >
            <Link href={`/characters/${character.id}`}>
              <img
                src={character.image}
                alt={`Image of ${character.name}`}
                className="w-full h-64 object-cover rounded-t-lg mb-4 border-4 border-yellow-300 transition-all hover:border-green-500 hover:scale-105"
              />
              <h2 className="text-xl font-semibold text-center text-white uppercase tracking-wide text-shadow-md animate-slideIn">
                {character.name}
              </h2>
            </Link>
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginationRange={paginationRange}
      />
    </div>
  );
}
