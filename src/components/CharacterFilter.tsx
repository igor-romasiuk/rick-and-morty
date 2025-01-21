'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';
import customStyles from '@/app/styles/StyleFiltering';

interface OptionType {
  label: string;
  value: string;
}

export default function CharacterFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  const [filters, setFilters] = useState<Record<string, string>>({
    status: '',
    species: '',
    gender: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setFilters({
        status: searchParams.get('status') || '',
        species: searchParams.get('species') || '',
        gender: searchParams.get('gender') || '',
      });
    }
  }, [mounted, searchParams]);

  const handleFilterChange = (key: string, selectedOption: OptionType | null) => {
    const value = selectedOption?.value || '';
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);

    const query = new URLSearchParams(searchParams.toString());
    
    if (value) {
      query.set(key, value);
    } else {
      query.delete(key);
    }

    router.push(`?${query.toString()}`);
  };

  const filterOptions = useMemo(() => [
    {
      label: 'Status',
      key: 'status',
      options: [
        { label: 'Filter by status...', value: '' },
        ...['Alive', 'Dead', 'Unknown'].map(option => ({
          label: option,
          value: option
        }))
      ],
    },
    {
      label: 'Species',
      key: 'species',
      options: [
        { label: 'Filter by species...', value: '' },
        ...['Human', 'Alien', 'Robot', 'Animal', 'Mythological Creature', 'Other'].map(option => ({
          label: option,
          value: option
        }))
      ],
    },
    {
      label: 'Gender',
      key: 'gender',
      options: [
        { label: 'Filter by gender...', value: '' },
        ...['Female', 'Male', 'Genderless', 'Unknown'].map(option => ({
          label: option,
          value: option
        }))
      ],
    },
  ], []);

  if (!mounted) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center w-full max-w-3xl">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full h-10 bg-gray-700 rounded animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center w-full max-w-3xl">
        {filterOptions.map(({ key, options }) => (
          <div key={key} className="w-full">
            <Select<OptionType>
              instanceId={`${key}-select`}
              value={filters[key] ? { label: filters[key], value: filters[key] } : null}
              onChange={(selectedOption) => handleFilterChange(key, selectedOption)}
              options={options}
              styles={customStyles}
              isClearable
              placeholder={`By ${key}...`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
