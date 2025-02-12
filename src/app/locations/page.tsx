import { getPaginationRange } from "@/helpers/paginationUtils";
import Pagination from "@/components/Pagination";
import SearchAndFilterLocations from "@/components/SearchAndFilterLocations";
import Breadcrumbs from "@/components/Breadcrumbs";

interface LocationsPageProps {
  searchParams: {
    page?: string;
    query?: string;
    type?: string;
    dimension?: string;
  };
}

interface Location {
  type: string;
  dimension: string;
}

export default async function LocationsPage({
  searchParams,
}: LocationsPageProps) {
  const { 
    page = "1",
    query = "",
    type = "",
    dimension = ""
  } = searchParams;
  
  const currentPage = Number(page);

  async function fetchLocationsData() {
    const apiUrl = `https://rickandmortyapi.com/api/location/?name=${query}&type=${type}&dimension=${dimension}&page=${currentPage}`;
    const response = await fetch(apiUrl, { 
      next: { 
        revalidate: 3600
      } 
    });

    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }

    return response.json();
  }

  async function fetchLocationOptions() {
    const response = await fetch('https://rickandmortyapi.com/api/location/?page=1', { 
      next: { 
        revalidate: 3600 
      } 
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch location options');
    }
    
    return response.json();
  }

  const [data, allLocationsData] = await Promise.all([
    fetchLocationsData(),
    fetchLocationOptions()
  ]);

  const availableTypes = Array.from(new Set(allLocationsData.results.map((location: Location) => location.type)));
  const availableDimensions = Array.from(new Set(allLocationsData.results.map((location: Location) => location.dimension)));

  const totalPages = data.info ? Math.ceil(data.info.count / 20) : 1;
  const locations = data.results || [];
  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="flex flex-col md:flex-row">
        <main className="flex-1 p-6 space-y-10">
          <Breadcrumbs />
          <h1 className="text-4xl font-extrabold text-center text-green-400 mb-6">
            Rick & Morty Locations
          </h1>

          <SearchAndFilterLocations
            locations={locations}
            initialQuery={query}
            initialType={type}
            initialDimension={dimension}
            availableTypes={availableTypes as string[]}
            availableDimensions={availableDimensions as string[]}
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