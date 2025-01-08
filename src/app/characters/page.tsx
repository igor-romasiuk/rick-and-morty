import { Character } from '@/types/Character';
import { getPaginationRange } from '@/helpers/paginationUtils';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import CharacterSearch from '@/components/CharacterSearch';
import CharacterFilter from '@/components/CharacterFilter';
import Breadcrumbs from '@/components/Breadcrumbs';

interface CharactersPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    query?: string;
    status?: string;
    species?: string;
    gender?: string;
  };
}

export default async function CharactersPage({
  searchParams,
}: CharactersPageProps) {
  const { page = '1', limit = '12', query = '', status = '', species = '', gender = '' } = await searchParams;
  const currentPage = Number(page);
  const pageLimit = Number(limit);

  const apiUrl = `https://rickandmortyapi.com/api/character/?name=${query}&status=${status}&species=${species}&gender=${gender}&page=${currentPage}&limit=${pageLimit}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  const totalPages = data.info ? Math.ceil(data.info.count / pageLimit) : 1;
  const characters = data.results?.slice(0, pageLimit) || [];
  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <div className="bg-black text-white min-h-screen">
      <main className="flex-1 p-4">
        <div className="container mx-auto px-4">
          <Breadcrumbs />
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-6">
          <CharacterSearch initialQuery={query} />
          <CharacterFilter />
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-fadeIn">
          {characters.map((character: Character) => (
            <li
              key={character.id}
              className="bg-gradient-to-t from-green-700 to-green-900 p-4 rounded-lg shadow-xl transform transition-transform hover:scale-105 hover:shadow-2xl hover:translate-z-10 hover:from-green-600 hover:to-green-800"
            >
              <Link href={`/characters/${character.id}`}>
                <div className="relative w-full h-80 mb-4 rounded-lg overflow-hidden">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold text-white uppercase tracking-wide text-shadow-md">
                    {character.name}
                  </h2>
                  <p className="text-yellow-200 text-sm mt-2">Status: {character.status}</p>
                  <p className="text-yellow-200 text-sm">Species: {character.species}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginationRange={paginationRange}
          />
        </div>
      </main>
    </div>
  );
}
