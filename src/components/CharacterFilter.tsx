'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import customStyles from '@/app/styles/StyleFiltering';

export default function CharacterFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Record<string, string>>({
    status: '',
    species: '',
    gender: '',
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      setFilters({
        status: searchParams.get('status') || '',
        species: searchParams.get('species') || '',
        gender: searchParams.get('gender') || '',
      });
    }
  }, [isClient, searchParams]);

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

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {filterOptions.map(({ label, key, options }) => (
        <div key={key} className="flex flex-col">
          <Select
            id={key}
            value={{ label: filters[key] || label, value: filters[key] }}
            onChange={(selectedOption: any) => handleFilterChange(key, selectedOption.value)}
            options={options.map(option => ({ label: option, value: option === 'All' ? '' : option }))}
            styles={customStyles}
          />
        </div>
      ))}
    </div>
  );
}
