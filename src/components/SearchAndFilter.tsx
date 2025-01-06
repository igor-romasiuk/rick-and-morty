'use client'

import React, { useState, useEffect } from 'react';
import EpisodesList from './EpisodesList';
import { Episode } from '@/types/Episode';

interface SearchAndFilterProps {
  episodes: Episode[];
  initialQuery: string;
  initialAirDate: string;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  episodes,
  initialQuery,
  initialAirDate,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filterDate, setFilterDate] = useState(initialAirDate);
  const [filteredEpisodes, setFilteredEpisodes] = useState(episodes);

  useEffect(() => {
    setFilteredEpisodes(
      episodes.filter((episode) => {
        const matchesSearchQuery = episode.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilterDate = episode.air_date.toLowerCase().includes(filterDate.toLowerCase());
        return matchesSearchQuery && matchesFilterDate;
      })
    );
  }, [searchQuery, filterDate, episodes]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDate(e.target.value);
  };

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
                    <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="px-4 py-2 rounded-lg border bg-gray-800 text-white w-full sm:w-auto"
                    placeholder="Search episodes..."
                    />

                    <input
                    type="text"
                    value={filterDate}
                    onChange={handleFilterChange}
                    className="px-4 py-2 rounded-lg border bg-gray-800 text-white w-full sm:w-auto"
                    placeholder="Filter by air date..."
                    />
                </div>
            </div>
            <EpisodesList episodes={filteredEpisodes} />
        </div>
    );
};

export default SearchAndFilter;