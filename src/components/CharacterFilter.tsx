'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function CharacterFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Record<string, string>>({
    status: searchParams.get('status') || '',
    species: searchParams.get('species') || '',
    gender: searchParams.get('gender') || '',
  });

  const handleFilterChange = (key: string, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);

    const query = new URLSearchParams();

    Object.entries(updatedFilters).forEach(([filterKey, filterValue]) => {
      if (filterValue) {
        query.set(filterKey, filterValue);
      }
    });

    const currentParams = new URLSearchParams(searchParams.toString());
    for (const [key, value] of currentParams.entries()) {
      if (!updatedFilters[key]) {
        query.set(key, value);
      }
    }

    if (!value) {
      query.delete(key);
    }

    router.push(`?${query.toString()}`);
  };

  const filterOptions = [
    { label: 'Status', key: 'status', options: ['All', 'Alive', 'Dead', 'Unknown'] },
    { label: 'Species', key: 'species', options: ['All', 'Human', 'Alien', 'Robot', 'Animal', 'Mythological Creature', 'Other'] },
    { label: 'Gender', key: 'gender', options: ['All', 'Female', 'Male', 'Genderless', 'Unknown'] },
  ];

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {filterOptions.map(({ label, key, options }) => (
        <div key={key} className="flex flex-col">
          <label htmlFor={key} className="text-white text-sm font-semibold">
            {label}
          </label>
          <select
            id={key}
            value={filters[key]}
            onChange={(e) => handleFilterChange(key, e.target.value)}
            className="p-2 rounded-lg bg-gray-800 text-white text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {options.map((option) => (
              <option
                key={option}
                value={option === 'All' ? '' : option}
                className="bg-gray-800 text-white hover:bg-gray-700 focus:bg-green-500 focus:text-white"
              >
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
