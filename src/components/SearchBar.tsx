import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2.5 bg-skycred-card border border-skycred-card-border rounded-2xl p-1.5 mb-4 shadow-sm focus-within:border-skycred-gold/40 transition-colors"
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter a city name..."
        autoComplete="off"
        className="flex-1 bg-transparent border-none outline-none text-skycred-text text-[15px] px-3.5 py-2.5 font-sans placeholder:text-skycred-text-faint"
      />
      <button
        type="submit"
        disabled={isLoading || !city.trim()}
        className="bg-gradient-to-br from-skycred-gold to-[#d9a441] text-[#141008] border-none rounded-xl px-5 font-bold text-sm tracking-[0.3px] transition-all hover:opacity-90 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};
