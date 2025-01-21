'use client';

import { useState, ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface CharacterSearchProps {
  initialQuery: string;
}

export default function CharacterSearch({ initialQuery }: CharacterSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const params = new URLSearchParams(searchParams.toString());
    params.set('query', value);
    params.set('page', '1');

    router.push(`/characters?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search characters..."
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
  );
}
