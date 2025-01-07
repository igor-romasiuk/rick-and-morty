'use client';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import LocationsList from './LocationsList';
import { Location } from '@/types/Location';
import { useRouter, useSearchParams } from 'next/navigation';
import customStyles from '@/app/styles/StyleFiltering';

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filterType, setFilterType] = useState(initialType);
  const [filterDimension, setFilterDimension] = useState(initialDimension);
  const [filteredLocations, setFilteredLocations] = useState(locations);

  const types = Array.from(new Set(locations.map(location => location.type)));
  const dimensions = Array.from(new Set(locations.map(location => location.dimension)));

  useEffect(() => {
    setSearchQuery(searchParams.get('query') || initialQuery);
    setFilterType(searchParams.get('type') || initialType);
    setFilterDimension(searchParams.get('dimension') || initialDimension);
  }, [searchParams, initialQuery, initialType, initialDimension]);

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

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (searchQuery) queryParams.set('query', searchQuery);
    if (filterType) queryParams.set('type', filterType);
    if (filterDimension) queryParams.set('dimension', filterDimension);

    router.push(`?${queryParams.toString()}`, { scroll: false });
  }, [searchQuery, filterType, filterDimension, router]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterTypeChange = (selectedOption: any) => {
    setFilterType(selectedOption.value);
  };

  const handleFilterDimensionChange = (selectedOption: any) => {
    setFilterDimension(selectedOption.value);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-3 pl-10 rounded-lg border-2 border-green-600 focus:outline-none text-white bg-black placeholder-gray-500 transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl hover:border-green-400"
              placeholder="Search locations..."
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

          <Select
            value={{ label: filterType || 'Filter by type...', value: filterType }}
            onChange={handleFilterTypeChange}
            options={[{ label: 'Filter by type...', value: '' }, ...types.map((type) => ({ label: type, value: type }))]}
            styles={customStyles}
          />

          <Select
            value={{ label: filterDimension || 'Filter by dimension...', value: filterDimension }}
            onChange={handleFilterDimensionChange}
            options={[{ label: 'Filter by dimension...', value: '' }, ...dimensions.map((dimension) => ({ label: dimension, value: dimension }))]}
            styles={customStyles}
          />
        </div>
      </div>
      <LocationsList locations={filteredLocations} />
    </div>
  );
};

export default SearchAndFilterLocations;
