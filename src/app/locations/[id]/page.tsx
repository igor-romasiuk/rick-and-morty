import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

export default async function LocationPage(props: { params: { id: string } }) {
  const params = await props.params;

  const response = await fetch(
    `https://rickandmortyapi.com/api/location/${params.id}`
  );

  if (!response.ok) {
    return (
      <div className="text-center text-red-500 text-2xl mt-10">
        Location not found
      </div>
    );
  }

  const location = await response.json();
  const { name, type, dimension, residents } = location;

  const residentDetails = await Promise.all(
    residents.map(async (residentUrl: string) => {
      const residentResponse = await fetch(residentUrl);
      return await residentResponse.json();
    })
  );

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="bg-gradient-to-t from-black to-gray-900 p-6 rounded-lg shadow-xl w-full max-w-screen-md">
        <Breadcrumbs />
        <h1 className="text-3xl font-extrabold text-center text-white uppercase tracking-wide text-shadow-md mb-4">
          {name}
        </h1>
        <p className="text-xl text-yellow-200 text-center">Type: {type}</p>
        <p className="text-xl text-yellow-200 text-center">Dimension: {dimension}</p>
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-white">Residents in this location:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-6">
            {residentDetails.map((resident: any) => (
              <div
                key={resident.id}
                className="bg-gradient-to-t from-green-700 to-green-900 p-4 rounded-lg shadow-xl transition-all hover:scale-105 hover:shadow-2xl hover:from-green-600 hover:to-green-800"
              >
                <Link href={`/characters/${resident.id}`}>
                  <div className="overflow-hidden rounded-t-lg">
                    <img
                      src={resident.image}
                      alt={resident.name}
                      className="w-full h-64 object-cover mb-4 border-4 border-yellow-300 transition-transform duration-300 hover:border-green-500 hover:scale-105"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wide text-shadow-md mb-2">
                      {resident.name}
                    </h3>
                    <p className="text-yellow-200">Status: {resident.status}</p>
                    <p className="text-yellow-200">Species: {resident.species}</p>
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