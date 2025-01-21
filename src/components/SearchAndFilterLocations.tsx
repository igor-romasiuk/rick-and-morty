'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  availableTypes: string[];
  availableDimensions: string[];
}

const SearchAndFilterLocations: React.FC<SearchAndFilterLocationsProps> = ({
  locations,
  initialQuery,
  initialType,
  initialDimension,
  availableTypes,
  availableDimensions,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filterType, setFilterType] = useState(initialType);
  const [filterDimension, setFilterDimension] = useState(initialDimension);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    updateURL({ query: value });
  };

  const handleFilterTypeChange = (selectedOption: { label: string; value: string } | null) => {
    const value = selectedOption?.value || '';
    setFilterType(value);
    updateURL({ type: value });
  };

  const handleFilterDimensionChange = (selectedOption: { label: string; value: string } | null) => {
    const value = selectedOption?.value || '';
    setFilterDimension(value);
    updateURL({ dimension: value });
  };

  const updateURL = (updates: { [key: string]: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.set('page', '1');
    router.push(`/locations?${params.toString()}`);
  };

  const typeOptions = useMemo(() => [
    { label: 'Filter by type...', value: '' },
    ...availableTypes.map((type) => ({ label: type, value: type }))
  ], [availableTypes]);

  const dimensionOptions = useMemo(() => [
    { label: 'Filter by dimension...', value: '' },
    ...availableDimensions.map((dimension) => ({ label: dimension, value: dimension }))
  ], [availableDimensions]);

  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center w-full max-w-3xl">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search locations..."
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

          <Select
            instanceId="type-select"
            value={filterType ? { label: filterType, value: filterType } : null}
            onChange={handleFilterTypeChange}
            options={typeOptions}
            styles={customStyles}
            isClearable
            placeholder="By type..."
          />

          <Select
            instanceId="dimension-select"
            value={filterDimension ? { label: filterDimension, value: filterDimension } : null}
            onChange={handleFilterDimensionChange}
            options={dimensionOptions}
            styles={customStyles}
            isClearable
            placeholder="By dimension..."
          />
        </div>
      </div>
      
      <LocationsList locations={locations} />
    </div>
  );
};

export default SearchAndFilterLocations;
