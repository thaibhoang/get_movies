const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const tmdbAPI = {
  getPopularMovies: async (page = 1) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch popular movies");
    }
    return response.json();
  },

  searchMovies: async (query: string, page = 1) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Failed to search movies");
    }
    return response.json();
  },

  getMovieDetails: async (movieId: number) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    return response.json();
  },
};
