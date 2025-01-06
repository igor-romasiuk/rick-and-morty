'use client'

import React, { useState, useEffect } from 'react';
import LocationsList from './LocationsList';
import { Location } from '@/types/Location';

interface SearchAndFilterLocationsProps {
  locations: Location[];
  initialQuery: string;
  initialType: string;
  initialDimension: string;
}

const SearchAndFilterLocations: React.FC<SearchAndFilterLocationsProps> = ({
  locations,
  initialQuery,
  initialType,
  initialDimension,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filterType, setFilterType] = useState(initialType);
  const [filterDimension, setFilterDimension] = useState(initialDimension);
  const [filteredLocations, setFilteredLocations] = useState(locations);

  const types = Array.from(new Set(locations.map(location => location.type)));
  const dimensions = Array.from(new Set(locations.map(location => location.dimension)));

  useEffect(() => {
    setFilteredLocations(
      locations.filter((location) => {
        const matchesSearchQuery = location.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilterType = location.type.toLowerCase().includes(filterType.toLowerCase());
        const matchesFilterDimension = location.dimension.toLowerCase().includes(filterDimension.toLowerCase());
        return matchesSearchQuery && matchesFilterType && matchesFilterDimension;
      })
    );
  }, [searchQuery, filterType, filterDimension, locations]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  const handleFilterDimensionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterDimension(e.target.value);
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
            placeholder="Search locations..."
          />
          
          <select
            value={filterType}
            onChange={handleFilterTypeChange}
            className="px-4 py-2 rounded-lg border bg-gray-800 text-white w-full sm:w-auto"
          >
            <option value="">Filter by type...</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          
          <select
            value={filterDimension}
            onChange={handleFilterDimensionChange}
            className="px-4 py-2 rounded-lg border bg-gray-800 text-white w-full sm:w-auto"
          >
            <option value="">Filter by dimension...</option>
            {dimensions.map((dimension) => (
              <option key={dimension} value={dimension}>
                {dimension}
              </option>
            ))}
          </select>
        </div>
      </div>
      <LocationsList locations={filteredLocations} />
    </div>
  );
};

export default SearchAndFilterLocations;