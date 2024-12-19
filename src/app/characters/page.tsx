import { Character } from '@/types/Character';
import { getPaginationRange } from '@/helpers/paginationUtils';
import Pagination from '@/components/Pagination';
import { CharactersPerPage } from '@/components/ui/select';
import Link from 'next/link';
import CharacterSearch from '@/components/CharacterSearch';
import CharacterFilter from '@/components/CharacterFilter';
import Sidebar from "@/components/Sidebar";

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
  const { page = '1', limit = '4', query = '', status = '', species = '', gender = '' } = await searchParams;
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
      <div className="flex flex-col md:flex-row">
        <Sidebar>
          <CharacterFilter />
        </Sidebar>

        <main className="flex-1 p-4">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-10 mb-6">
            <CharacterSearch initialQuery={query} />
            <CharactersPerPage selectedLimit={limit} />
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fadeIn">
            {characters.map((character: Character) => (
              <li
                key={character.id}
                className="bg-gradient-to-t from-green-700 to-green-900 p-4 rounded-lg shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl hover:rotate-2 hover:from-green-600 hover:to-green-800"
              >
                <Link href={`/characters/${character.id}`}>
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-64 object-cover rounded-t-lg mb-4 border-4 border-yellow-300 transition-transform duration-300 hover:border-green-500 hover:scale-105"
                  />
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-white uppercase tracking-wide text-shadow-md">
                      {character.name}
                    </h2>
                    <p className="text-yellow-200">Status: {character.status}</p>
                    <p className="text-yellow-200">Species: {character.species}</p>
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
    </div>
  );
}
