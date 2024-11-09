"use client";

import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-4 justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies..."
          className="border-2 rounded-md p-2"
        />
        <button
          type="submit"
          className="rounded-md p-2 bg-slate-600 text-white hover:bg-slate-500 transition duration-150 ease-in-out"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
