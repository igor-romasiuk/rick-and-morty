export default async function CharacterPage({
  params,
}: {
  params: { id: string };
}) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${params.id}`
  );

  if (!response.ok) {
    return <div className="text-center text-red-500 text-2xl mt-10">Character not found</div>;
  }

  const character = await response.json();
  const { name, image, status, species, gender, origin, location } = character;

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start p-8 bg-gray-100 rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
      {/* Image Section */}
      <img
        src={image}
        alt={`Image of ${name}`}
        className="w-72 h-72 object-cover rounded-lg shadow-md md:mr-8 mb-6 md:mb-0"
      />

      {/* Text Section */}
      <div className="flex flex-col space-y-4 text-gray-800">
        <h1 className="text-4xl font-bold mb-4">{name}</h1>
        <p className="text-2xl"><strong>Status:</strong> {status}</p>
        <p className="text-2xl"><strong>Species:</strong> {species}</p>
        <p className="text-2xl"><strong>Gender:</strong> {gender}</p>
        <p className="text-2xl"><strong>Origin:</strong> {origin.name}</p>
        <p className="text-2xl"><strong>Location:</strong> {location.name}</p>
      </div>
    </div>
  );
}
