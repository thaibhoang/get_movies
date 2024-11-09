"use client";

import { useEffect, useState } from "react";
import SearchBar from "./SearchBar/page";
import SearchResult from "./SearchResult/page";
import { tmdbAPI } from "./services/tmdb";
import Pagination from "./Pagination/page";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = async (page: number, search = searchTerm) => {
    try {
      setLoading(true);
      const data = search
        ? await tmdbAPI.searchMovies(search, page)
        : await tmdbAPI.getPopularMovies(page);

      setMovies(data.results);
      setTotalPages(Math.min(data.total_pages, 500)); // TMDB limits to 500 pages
      setCurrentPage(page);
      setSearchTerm(search);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(1);
  }, []);

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    await fetchMovies(1, term);
  };

  const handlePageChange = (page: number) => {
    fetchMovies(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col content-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <SearchBar onSearch={handleSearch} />
      <SearchResult movies={movies} loading={loading} error={error} />
      {!loading && !error && movies.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
