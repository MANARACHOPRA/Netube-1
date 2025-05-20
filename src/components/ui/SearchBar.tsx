import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface SearchBarProps {
  onSubmit: (query: string) => void;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when the search bar appears
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Add event listener for Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative flex items-center animate-fade-in"
    >
      <input
        ref={inputRef}
        type="search"
        placeholder="Search titles, people..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-dark-lightest text-white pl-4 pr-10 py-2 rounded-full w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 text-gray-400 hover:text-white"
        aria-label="Close search"
      >
        <X size={16} />
      </button>
    </form>
  );
};

export default SearchBar;