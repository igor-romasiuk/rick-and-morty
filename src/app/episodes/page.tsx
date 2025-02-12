import { getPaginationRange } from '@/helpers/paginationUtils';
import Pagination from '@/components/Pagination';
import SearchAndFilter from '@/components/SearchAndFilter';
import Breadcrumbs from '@/components/Breadcrumbs';

interface EpisodesPageProps {
  searchParams: {
    page?: string;
    query?: string;
    air_date?: string;
  };
}

export default async function EpisodesPage({
  searchParams,
}: EpisodesPageProps) {
  const { page = '1', query = '', air_date = '' } = searchParams;
  const currentPage = Number(page);

  const apiUrl = `https://rickandmortyapi.com/api/episode/?name=${query}&air_date=${air_date}&page=${currentPage}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  const totalPages = data.info ? Math.ceil(data.info.count / 20) : 1;
  const episodes = data.results?.slice(0) || [];
  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="flex flex-col md:flex-row">
        <main className="flex-1 p-6 space-y-10">
          <Breadcrumbs />

          <h1 className="text-4xl font-extrabold text-center text-green-400 mb-6">
            Rick & Morty Episodes
          </h1>

          <SearchAndFilter
            episodes={episodes}
            initialQuery={query}
            initialAirDate={air_date}
          />

          <div className="mt-8 flex justify-center">
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