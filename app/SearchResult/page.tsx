"use client";

import MovieBox from "../MovieBox/page";
import { MovieType } from "../type";

type SearchResultProps = {
  movies: MovieType[];
  loading: boolean;
  error: string | null;
};
const SearchResult = ({ movies, loading, error }: SearchResultProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-xl">No movies found</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,240px)] gap-4 justify-center">
      {movies.map((movie) => (
        <MovieBox
          key={movie.id}
          id={movie.id}
          title={movie.title}
          posterPath={movie.poster_path}
          releaseDate={movie.release_date}
          voteAverage={movie.vote_average}
        />
      ))}
    </div>
  );
};

export default SearchResult;

// grid grid-cols-[repeat(auto-fit,240px)] gap-4 justify-center
