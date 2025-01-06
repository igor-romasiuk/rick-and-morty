import Link from 'next/link';
import { Location } from '@/types/Location';

interface LocationsListProps {
  locations: Location[];
}

const LocationsList: React.FC<LocationsListProps> = ({ locations }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fadeIn">
      {locations.map((location: Location) => (
        <li
          key={location.id}
          className="bg-gradient-to-t from-green-700 to-green-900 p-6 rounded-lg shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl hover:from-green-600 hover:to-green-800 hover:shadow-lg"
        >
          <Link href={`/locations/${location.id}`}>
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-white uppercase tracking-wide text-shadow-md transform transition-all hover:text-green-400">
                {location.name}
              </h2>
              <p className="text-yellow-300 text-sm">Type: {location.type}</p>
              <p className="text-yellow-300 text-sm">Dimension: {location.dimension}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LocationsList;