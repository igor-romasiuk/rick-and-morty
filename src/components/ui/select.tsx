'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface CharactersPerPageProps {
  selectedLimit: string;
}

export const CharactersPerPage = ({ selectedLimit }: CharactersPerPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLimitChange = (value: string) => {
    const query = searchParams.get('query') || '';
    const page = '1';
    router.push(`/characters?page=${page}&limit=${value}&query=${query}`);
  };

  return (
    <div className="text-center">
      <span className="text-lg text-green-400">Characters per page:</span>
      <select
        value={selectedLimit}
        onChange={(e) => handleLimitChange(e.target.value)}
        className="ml-2 p-2 bg-gray-800 text-white rounded shadow-lg border border-green-400"
      >
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="12">12</option>
        <option value="16">16</option>
      </select>
    </div>
  );
};
