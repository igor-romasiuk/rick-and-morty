import Link from 'next/link';
import { Episode } from '@/types/Episode';

interface EpisodesListProps {
  episodes: Episode[];
}

const EpisodesList: React.FC<EpisodesListProps> = ({ episodes }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fadeIn">
      {episodes.map((episode: Episode) => (
        <li
          key={episode.id}
          className="bg-gradient-to-t from-green-700 to-green-900 p-6 rounded-lg shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl hover:from-green-600 hover:to-green-800 hover:shadow-lg"
        >
          <Link href={`/episodes/${episode.id}`}>
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-white uppercase tracking-wide text-shadow-md transform transition-all hover:text-green-400">
                {episode.name}
              </h2>
              <p className="text-yellow-300 text-sm">Air Date: {episode.air_date}</p>
              <p className="text-yellow-300 text-sm">Episode: {episode.episode}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default EpisodesList;