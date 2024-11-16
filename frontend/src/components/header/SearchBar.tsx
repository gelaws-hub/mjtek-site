'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search01Icon } from "../icons/Search01Icon";

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}
    className='w-full'>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="ml-1 absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search01Icon />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-2 ps-12 text-sm text-gray-900 border border-s-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-900 truncate"
          placeholder="Cari apa saja di MJ Teknologi Semarang..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
      </div>
    </form>
  );
}
