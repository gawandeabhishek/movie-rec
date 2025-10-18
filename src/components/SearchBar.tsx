"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <div className="relative flex items-center">
      <div
        className={`flex items-center bg-black/75 border border-gray-600 rounded-sm overflow-hidden transition-all duration-300 ${
          isExpanded ? "w-[300px]" : "w-[40px]"
        }`}
      >
        <button
          onClick={() => {
            if (isExpanded && searchQuery.trim()) {
              handleSearch();
            }
            setIsExpanded(!isExpanded);
          }}
          className="p-2 text-gray-200 hover:text-white transition-colors"
          aria-label={isExpanded ? "Search" : "Open search"}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isExpanded ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            )}
          </svg>
        </button>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
              setIsExpanded(false);
            }
          }}
          className={`${
            isExpanded ? "w-full px-4" : "w-0"
          } py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none transition-all duration-300`}
        />
      </div>
    </div>
  );
}
