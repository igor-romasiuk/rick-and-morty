import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import Image from 'next/image';
import { Character } from "@/types/Character";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return Array.from({ length: 20 }, (_, i) => ({
    id: String(i + 1),
  }))
}

export default async function LocationPage({ params }: PageProps) {
  const { id } = params;

  const response = await fetch(
    `https://rickandmortyapi.com/api/location/${id}`
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
    <div className="bg-black text-white min-h-screen">
      <div className="w-full max-w-screen-xl px-6 py-4">
        <Breadcrumbs />
      </div>

      <div className="w-full max-w-screen-xl px-6 py-6 mx-auto bg-black rounded-lg shadow-xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-white uppercase tracking-wide text-shadow-md mb-4">
            {name}
          </h1>
          <p className="text-xl text-yellow-200">Type: {type}</p>
          <p className="text-xl text-yellow-200">Dimension: {dimension}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Residents in this location:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {residentDetails.map((resident: Character) => (
              <div
                key={resident.id}
                className="bg-gradient-to-t from-green-700 to-green-900 p-4 rounded-lg shadow-xl transition-all hover:scale-105 hover:shadow-2xl hover:from-green-600 hover:to-green-800"
              >
                <Link href={`/characters/${resident.id}`}>
                  <div className="relative h-64 overflow-hidden rounded-t-lg">
                    <Image
                      src={resident.image}
                      alt={resident.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 hover:scale-105"
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
