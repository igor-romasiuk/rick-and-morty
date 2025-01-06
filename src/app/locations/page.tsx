// pages/locations/index.tsx
import { getPaginationRange } from "@/helpers/paginationUtils";
import Pagination from "@/components/Pagination";
import SearchAndFilterLocations from "@/components/SearchAndFilterLocations";

interface LocationsPageProps {
  searchParams: {
    page?: string;
    query?: string;
    type?: string;
    dimension?: string;
  };
}

export default async function LocationsPage({
  searchParams,
}: LocationsPageProps) {
  const { page = "1", query = "", type = "", dimension = "" } = await searchParams;
  const currentPage = Number(page);

  const apiUrl = `https://rickandmortyapi.com/api/location/?name=${query}&type=${type}&dimension=${dimension}&page=${currentPage}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  const totalPages = data.info ? Math.ceil(data.info.count / 20) : 1;
  const locations = data.results?.slice(0) || [];
  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="flex flex-col md:flex-row">
        <main className="flex-1 p-6 space-y-10">
          <h1 className="text-4xl font-extrabold text-center text-green-400 mb-6">
            Rick & Morty Locations
          </h1>

          <SearchAndFilterLocations
            locations={locations}
            initialQuery={query}
            initialType={type}
            initialDimension={dimension}
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