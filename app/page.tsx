"use client";

import { useEffect, useState } from "react";
import SearchBar from "./SearchBar/page";
import SearchResult from "./SearchResult/page";
import { MovieType } from "./type";
import { tmdbAPI } from "./services/tmdb";

export default function Home() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      const data = await tmdbAPI.getPopularMovies();
      setMovies(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      setLoading(true);
      if (!searchTerm.trim()) {
        // If search is empty, show popular movies
        await fetchPopularMovies();
        return;
      }

      const data = await tmdbAPI.searchMovies(searchTerm);
      setMovies(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col content-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <SearchBar onSearch={handleSearch} />
      <SearchResult movies={movies} loading={loading} error={error} />
    </div>
  );
}
