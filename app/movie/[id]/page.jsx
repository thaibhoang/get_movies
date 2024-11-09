"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { tmdbAPI } from "@/app/services/tmdb";

export default function MovieDetails({ params }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await tmdbAPI.getMovieDetails(params.id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-8 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          ← Back to Movies
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8">
          <div className="relative h-[450px] rounded-lg overflow-hidden">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

            <div className="flex items-center gap-4 mb-4 text-gray-600">
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span>⭐ {movie.vote_average.toFixed(1)}</span>
              <span>{movie.runtime} min</span>
            </div>

            <div className="flex gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-lg mb-6">{movie.overview}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="font-semibold mb-2">Status</h2>
                <p>{movie.status}</p>
              </div>
              <div>
                <h2 className="font-semibold mb-2">Budget</h2>
                <p>${movie.budget.toLocaleString()}</p>
              </div>
              <div>
                <h2 className="font-semibold mb-2">Revenue</h2>
                <p>${movie.revenue.toLocaleString()}</p>
              </div>
              <div>
                <h2 className="font-semibold mb-2">Original Language</h2>
                <p>{movie.original_language.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
