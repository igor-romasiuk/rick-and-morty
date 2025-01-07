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
          {/* Search by name input */}
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search episodes..."
              className="w-full p-3 pl-10 rounded-lg border-2 border-green-600 focus:outline-none text-white bg-black placeholder-gray-500 transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl hover:border-green-400"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 transition-all duration-300 ease-in-out"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                d="M21 21l-6-6M10 4a6 6 0 1 0 6 6 6 6 0 0 0-6-6z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Filter by air date input */}
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              value={filterDate}
              onChange={handleFilterChange}
              placeholder="Search by air date..."
              className="w-full p-3 pl-10 rounded-lg border-2 border-green-600 focus:outline-none text-white bg-black placeholder-gray-500 transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl hover:border-green-400"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 transition-all duration-300 ease-in-out"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                d="M21 21l-6-6M10 4a6 6 0 1 0 6 6 6 6 0 0 0-6-6z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <EpisodesList episodes={filteredEpisodes} />
    </div>
  );
};

export default SearchAndFilter;
