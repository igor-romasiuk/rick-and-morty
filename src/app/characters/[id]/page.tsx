import Breadcrumbs from "@/components/Breadcrumbs";

export default async function CharacterPage(props: { params: { id: string } }) {
  const params = await props.params;

  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${params.id}`
  );

  if (!response.ok) {
    return (
      <div className="text-center text-red-500 text-2xl mt-10">
        Character not found
      </div>
    );
  }

  const character = await response.json();
  const { name, image, status, species, origin, location } = character;

  return (
    <div className="min-h-screen bg-black text-white px-6 flex flex-col">
      <div className="py-4 px-4">
        <Breadcrumbs />
      </div>

      <div className="flex items-center justify-center flex-1">
        <div className="flex flex-col md:flex-row items-center bg-gray-700 rounded-3xl shadow-2xl p-12 md:p-20 w-full max-w-screen-xl">
          <div className="relative group">
            <img
              src={image}
              alt={`Image of ${name}`}
              className="w-60 h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rounded-full border-8 border-gray-600 shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-6"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300 ease-in-out"></div>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-8 md:ml-16 mt-8 md:mt-0">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-center md:text-left">
              {name}
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl text-green-400 font-semibold">
              {status} - {species}
            </p>
            <div className="space-y-4 text-center md:text-left text-lg md:text-xl lg:text-2xl">
              <p>
                <span className="font-semibold text-gray-300">Last known location:</span>{" "}
                {location.name}
              </p>
              <p>
                <span className="font-semibold text-gray-300">First seen in:</span>{" "}
                {origin.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}